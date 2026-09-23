// SSR/build-time data loader — used ONLY during `vite-react-ssg build`, when no Express
// server is running yet to answer HTTP requests. Talks to MongoDB directly via the same
// Mongoose models the Express API uses, so prerendered pages ship with real content.
let connectPromise;

async function models() {
  const mongoose = (await import('mongoose')).default;
  if (mongoose.connection.readyState === 0) {
    if (!connectPromise) connectPromise = mongoose.connect(process.env.MONGODB_URI);
    await connectPromise;
  }
  // Resolve via process.cwd() (always the `web/` package root when `npm run build` runs),
  // NOT a relative path from this file's own location — Vite bundles this module into a
  // temp directory at a different depth than the source, which silently breaks any
  // hardcoded "../../../" traversal baked into a dynamic import() string.
  const path = (await import('node:path')).default;
  const { pathToFileURL } = await import('node:url');
  const modelsDir = path.resolve(process.cwd(), '..', 'models');
  const load = (name) => import(/* @vite-ignore */ pathToFileURL(path.join(modelsDir, name)).href);
  const [Executive, Event, Bulletin, News, Institution, Settings, Collaborator, Gallery] = await Promise.all([
    load('Executive.js'), load('Event.js'), load('Bulletin.js'), load('News.js'),
    load('Institution.js'), load('Settings.js'), load('Collaborator.js'), load('Gallery.js'),
  ]);
  return {
    Executive: Executive.default, Event: Event.default, Bulletin: Bulletin.default, News: News.default,
    Institution: Institution.default, Settings: Settings.default, Collaborator: Collaborator.default, Gallery: Gallery.default,
  };
}

async function getSettings(M) {
  let s = await M.Settings.findOne();
  if (!s) s = {};
  return JSON.parse(JSON.stringify(s));
}

const j = (v) => JSON.parse(JSON.stringify(v));

const LOADERS = {
  '/session': async () => ({ user: null, isAdmin: false }),
  '/settings': async () => getSettings(await models()),
  '/home': async () => {
    const M = await models();
    const [settings, upcomingEvents, latestBulletin, featuredExecs, latestNews, institutionsCount] = await Promise.all([
      getSettings(M),
      M.Event.find({ status: 'upcoming' }).sort({ date: 1 }).limit(3),
      M.Bulletin.findOne({ featured: true }),
      M.Executive.find().sort({ order: 1 }).limit(3),
      M.News.find().sort({ createdAt: -1 }).limit(3),
      M.Institution.countDocuments(),
    ]);
    return j({ settings, upcomingEvents, latestBulletin, featuredExecs, latestNews, institutionsCount });
  },
  '/about': async () => {
    const M = await models();
    const [settings, institutions] = await Promise.all([getSettings(M), M.Institution.find().sort({ order: 1 })]);
    return j({ settings, institutions });
  },
  '/leadership': async () => {
    const M = await models();
    const [settings, executives, institutions] = await Promise.all([
      getSettings(M), M.Executive.find().sort({ order: 1, createdAt: 1 }), M.Institution.find().sort({ order: 1 }),
    ]);
    return j({ settings, executives, institutions });
  },
  '/events': async () => {
    const M = await models();
    const [settings, events] = await Promise.all([getSettings(M), M.Event.find().sort({ date: -1 })]);
    return j({ settings, events });
  },
  '/bulletin': async () => {
    const M = await models();
    const [settings, bulletins] = await Promise.all([getSettings(M), M.Bulletin.find().sort({ createdAt: -1 })]);
    const featured = bulletins.find(b => b.featured) || bulletins[0] || null;
    const archive = bulletins.filter(b => !featured || String(b._id) !== String(featured._id));
    return j({ settings, featured, archive });
  },
  '/resources': async () => ({ settings: await getSettings(await models()) }),
  '/gallery': async () => {
    const M = await models();
    const [settings, photos] = await Promise.all([getSettings(M), M.Gallery.find().sort({ createdAt: -1 })]);
    return j({ settings, photos });
  },
  '/news': async () => {
    const M = await models();
    const [settings, allNews] = await Promise.all([getSettings(M), M.News.find().sort({ createdAt: -1 })]);
    const featured = allNews.find(n => n.featured) || allNews[0] || null;
    const rest = allNews.filter(n => !featured || String(n._id) !== String(featured._id));
    return j({ settings, featured, rest });
  },
  '/campaigns': async () => ({ settings: await getSettings(await models()) }),
  '/join': async () => {
    const M = await models();
    const [settings, institutions] = await Promise.all([getSettings(M), M.Institution.find().sort({ order: 1 })]);
    return j({ settings, institutions });
  },
  '/contact': async () => ({ settings: await getSettings(await models()) }),
  '/acknowledgement': async () => {
    const M = await models();
    const [settings, collaborators] = await Promise.all([getSettings(M), M.Collaborator.find().sort({ order: 1, createdAt: 1 })]);
    return j({ settings, collaborators });
  },
};

export async function loadServerData(path) {
  const loader = LOADERS[path];
  if (!loader) return null;
  try {
    return await loader();
  } catch (e) {
    console.warn('[serverData] failed for', path, e.message);
    return null;
  }
}
