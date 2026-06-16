const cloudinary  = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name:  process.env.CLOUDINARY_CLOUD_NAME,
  api_key:     process.env.CLOUDINARY_API_KEY,
  api_secret:  process.env.CLOUDINARY_API_SECRET,
});

// Helper — create a Cloudinary-backed multer storage for a given folder
function makeStorage(folder, allowPDF = false) {
  return new CloudinaryStorage({
    cloudinary,
    params: {
      folder:          `nimsa-se/${folder}`,
      allowed_formats: allowPDF
        ? ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf']
        : ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      resource_type:   'auto',
      transformation:  [{ quality: 'auto', fetch_format: 'auto' }],
    },
  });
}

// File filter
const fileFilter = (req, file, cb) => {
  const imageTypes = /jpeg|jpg|png|gif|webp/i;
  const ext  = file.originalname.split('.').pop().toLowerCase();
  const mime = file.mimetype;

  if (imageTypes.test(ext) && imageTypes.test(mime)) return cb(null, true);
  if ((ext === 'pdf' || mime === 'application/pdf') && file.fieldname === 'pdfFile') return cb(null, true);
  cb(new Error('Only image files (jpg, png, webp) or PDF files are allowed'));
};

const limits      = { fileSize: 12 * 1024 * 1024 }; // 12MB for images (phone photos are large)
const limitsLarge = { fileSize: 25 * 1024 * 1024 }; // 25MB for PDFs/bulletins

// ── Memory-based upload: buffers the file in RAM instead of streaming straight
//    to Cloudinary during the middleware. This lets the ROUTE control the
//    Cloudinary upload inside its own try/catch — so failures are caught,
//    logged, and the rest of the form (text fields) still saves.
const memoryUpload = multer({ storage: multer.memoryStorage(), fileFilter, limits });

// Upload a buffered file (from memoryUpload) to Cloudinary. Returns the secure URL.
// Throws a real error (with .http_code / .message) on failure, so the caller can
// log it and show a precise message.
function uploadBufferToCloudinary(file, folder) {
  return new Promise((resolve, reject) => {
    if (!file || !file.buffer) return reject(new Error('No file buffer to upload'));
    const stream = cloudinary.uploader.upload_stream(
      {
        folder:         `nimsa-se/${folder}`,
        resource_type:  'auto',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      },
      (err, result) => {
        if (err) return reject(err);
        if (!result || !result.secure_url) return reject(new Error('Cloudinary returned no URL'));
        resolve(result.secure_url);
      }
    );
    stream.end(file.buffer);
  });
}

module.exports = {
  cloudinary, // export so admin routes can delete files
  memoryUpload,
  uploadBufferToCloudinary,

  uploadExec:     multer({ storage: makeStorage('executives'),       fileFilter, limits }),
  uploadEvent:    multer({ storage: makeStorage('events'),           fileFilter, limits }),
  uploadBulletin: multer({ storage: makeStorage('bulletins', true),  fileFilter, limits: limitsLarge }),
  uploadNews:     multer({ storage: makeStorage('news'),             fileFilter, limits }),
  uploadGallery:  multer({ storage: makeStorage('gallery'),          fileFilter, limits }),
  uploadSite:     multer({ storage: makeStorage('site'),             fileFilter, limits }),
  uploadAck:      multer({ storage: makeStorage('acknowledgement'),  fileFilter, limits }),
};
