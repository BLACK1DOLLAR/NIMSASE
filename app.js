require('dotenv').config();

const express      = require('express');
const session      = require('express-session');
const MongoStore   = require('connect-mongo');
const flash        = require('connect-flash');
const methodOverride = require('method-override');
const mongoose     = require('mongoose');
const path         = require('path');

const app = express();

// ── MongoDB connection ──
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

// ── Cloudinary config check (helps diagnose upload failures in logs) ──
(function checkCloudinary() {
  const name = process.env.CLOUDINARY_CLOUD_NAME;
  const key  = process.env.CLOUDINARY_API_KEY;
  const sec  = process.env.CLOUDINARY_API_SECRET;
  const missing = [];
  if (!name) missing.push('CLOUDINARY_CLOUD_NAME');
  if (!key)  missing.push('CLOUDINARY_API_KEY');
  if (!sec)  missing.push('CLOUDINARY_API_SECRET');
  if (missing.length) {
    console.error('⚠️  Cloudinary NOT configured — missing env vars:', missing.join(', '));
    console.error('    Image uploads will fail until these are set on the host.');
  } else {
    console.log(`☁️  Cloudinary configured (cloud: ${name}, key: ${key.length} digits, secret: ${sec.length} chars)`);
    // Live verify the credentials actually work (configure explicitly so this runs before routes load)
    const cld = require('cloudinary').v2;
    cld.config({ cloud_name: name, api_key: key, api_secret: sec });
    cld.api.ping()
      .then(() => console.log('☁️  Cloudinary credentials verified ✅'))
      .catch(e => console.error('⚠️  Cloudinary credentials REJECTED:', e.message, '(http', e.error?.http_code, ') — check API key/secret on the host'));
  }
})();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Session — stored in MongoDB (survives restarts & redeploys)
app.use(session({
  secret: process.env.SESSION_SECRET || 'nimsa-se-secret-2026',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 60 * 60 * 24,        // 24 hours in seconds
    autoRemove: 'native'
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 }  // 24 hours in ms
}));

// Flash messages
app.use(flash());

// Global template variables
app.use((req, res, next) => {
  res.locals.user      = req.session.user || null;
  res.locals.isAdmin   = req.session.user?.role === 'admin';
  res.locals.success   = req.flash('success');
  res.locals.error     = req.flash('error');
  res.locals.currentPath = req.path;
  next();
});

// Routes
app.use('/',      require('./routes/index'));
app.use('/auth',  require('./routes/auth'));
app.use('/admin', require('./routes/admin'));

// 404
app.use((req, res) => {
  res.status(404).render('404', { title: '404 — Page Not Found' });
});

// ── Global error handler — catches errors from ALL routes & middleware
//    (including multer/Cloudinary upload failures, which run before route try/catch)
app.use((err, req, res, next) => {
  // Log full detail to the server console (shows up in Render logs)
  console.error('💥 Error on', req.method, req.originalUrl);
  console.error('   message :', err.message);
  if (err.http_code || err.error?.http_code) console.error('   http_code:', err.http_code || err.error?.http_code);
  if (err.name) console.error('   name    :', err.name);
  if (err.stack) console.error(err.stack);

  // Turn common upload errors into a friendly, specific message
  const raw = (err.message || '') + ' ' + (err.error?.message || '');
  let message = 'Something went wrong. Please try again.';
  if (err.code === 'LIMIT_FILE_SIZE') {
    message = 'That file is too large. Please choose an image under 12MB (try a smaller photo).';
  } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    message = 'Unexpected file field. Please try uploading again.';
  } else if (/Only image files/i.test(raw)) {
    message = err.message;
  } else if (/api_key|api_secret|cloud_name|Invalid Signature|Must supply|401|disabled account|Unknown API/i.test(raw)) {
    message = 'Image upload service is not configured correctly on the server. Please check the Cloudinary settings (CLOUDINARY_API_KEY / API_SECRET / CLOUD_NAME).';
  } else if (/ENOTFOUND|ETIMEDOUT|ECONNRESET|EAI_AGAIN|getaddrinfo|network|socket hang up/i.test(raw)) {
    message = 'Could not reach the image upload service (network issue). Please try again in a moment.';
  }

  // For admin actions, flash the message and send the user back where they came from
  if (req.session && req.session.user && req.method === 'POST') {
    req.flash('error', message);
    const back = req.get('Referer')
      || (req.originalUrl.startsWith('/admin/acknowledgement') ? '/admin/acknowledgement' : '/admin');
    return res.redirect(back);
  }

  // Otherwise render a friendly 500 page (fall back to plain text if the view fails)
  res.status(500);
  res.render('500', { title: 'Something went wrong', message }, (renderErr, html) => {
    if (renderErr) return res.send(message);
    res.send(html);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🏥 NiMSA SE Website running at http://localhost:${PORT}`);
});
