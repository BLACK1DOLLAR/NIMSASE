const express      = require('express');
const router       = express.Router();
const Executive    = require('../models/Executive');
const Event        = require('../models/Event');
const Bulletin     = require('../models/Bulletin');
const News         = require('../models/News');
const Institution  = require('../models/Institution');
const Settings     = require('../models/Settings');
const Collaborator = require('../models/Collaborator');
const Gallery      = require('../models/Gallery');

async function getSettings() {
  let s = await Settings.findOne();
  if (!s) s = await Settings.create({});
  return s;
}

// Read-only JSON endpoints powering the React public site. All admin/auth
// mutation routes stay on the existing EJS+session stack — these only serve data.

router.get('/settings', async (req, res, next) => {
  try { res.json(await getSettings()); } catch (e) { next(e); }
});

router.get('/home', async (req, res, next) => {
  try {
    const [settings, upcomingEvents, latestBulletin, featuredExecs, latestNews, institutionsCount] = await Promise.all([
      getSettings(),
      Event.find({ status: 'upcoming' }).sort({ date: 1 }).limit(3),
      Bulletin.findOne({ featured: true }),
      Executive.find().sort({ order: 1 }).limit(3),
      News.find().sort({ createdAt: -1 }).limit(3),
      Institution.countDocuments(),
    ]);
    res.json({ settings, upcomingEvents, latestBulletin, featuredExecs, latestNews, institutionsCount });
  } catch (e) { next(e); }
});

router.get('/about', async (req, res, next) => {
  try {
    const [settings, institutions] = await Promise.all([getSettings(), Institution.find().sort({ order: 1 })]);
    res.json({ settings, institutions });
  } catch (e) { next(e); }
});

router.get('/leadership', async (req, res, next) => {
  try {
    const [settings, executives, institutions] = await Promise.all([
      getSettings(),
      Executive.find().sort({ order: 1, createdAt: 1 }),
      Institution.find().sort({ order: 1 }),
    ]);
    res.json({ settings, executives, institutions });
  } catch (e) { next(e); }
});

router.get('/events', async (req, res, next) => {
  try {
    const [settings, events] = await Promise.all([getSettings(), Event.find().sort({ date: -1 })]);
    res.json({ settings, events });
  } catch (e) { next(e); }
});

router.get('/bulletin', async (req, res, next) => {
  try {
    const [settings, bulletins] = await Promise.all([getSettings(), Bulletin.find().sort({ createdAt: -1 })]);
    const featured = bulletins.find(b => b.featured) || bulletins[0] || null;
    const archive = bulletins.filter(b => !featured || String(b._id) !== String(featured._id));
    res.json({ settings, featured, archive });
  } catch (e) { next(e); }
});

router.get('/resources', async (req, res, next) => {
  try { res.json({ settings: await getSettings() }); } catch (e) { next(e); }
});

router.get('/gallery', async (req, res, next) => {
  try {
    const [settings, photos] = await Promise.all([getSettings(), Gallery.find().sort({ createdAt: -1 })]);
    res.json({ settings, photos });
  } catch (e) { next(e); }
});

router.get('/news', async (req, res, next) => {
  try {
    const [settings, allNews] = await Promise.all([getSettings(), News.find().sort({ createdAt: -1 })]);
    const featured = allNews.find(n => n.featured) || allNews[0] || null;
    const rest = allNews.filter(n => !featured || String(n._id) !== String(featured._id));
    res.json({ settings, featured, rest });
  } catch (e) { next(e); }
});

router.get('/campaigns', async (req, res, next) => {
  try { res.json({ settings: await getSettings() }); } catch (e) { next(e); }
});

router.get('/join', async (req, res, next) => {
  try {
    const [settings, institutions] = await Promise.all([getSettings(), Institution.find().sort({ order: 1 })]);
    res.json({ settings, institutions });
  } catch (e) { next(e); }
});

router.get('/contact', async (req, res, next) => {
  try { res.json({ settings: await getSettings() }); } catch (e) { next(e); }
});

router.get('/acknowledgement', async (req, res, next) => {
  try {
    const [settings, collaborators] = await Promise.all([
      getSettings(),
      Collaborator.find().sort({ order: 1, createdAt: 1 }),
    ]);
    res.json({ settings, collaborators });
  } catch (e) { next(e); }
});

// Current session (used by the React nav/footer to know if a user is logged in)
router.get('/session', (req, res) => {
  res.json({
    user: req.session?.user || null,
    isAdmin: req.session?.user?.role === 'admin',
  });
});

module.exports = router;
