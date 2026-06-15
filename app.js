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
  console.error('💥 Error:', err.message);

  // Turn common upload errors into a friendly, specific message
  let message = 'Something went wrong. Please try again.';
  if (err.code === 'LIMIT_FILE_SIZE') {
    message = 'That file is too large. Please choose an image under 12MB (try a smaller photo).';
  } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    message = 'Unexpected file field. Please try uploading again.';
  } else if (/Only image files/i.test(err.message || '')) {
    message = err.message;
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
