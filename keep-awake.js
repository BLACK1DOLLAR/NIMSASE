const https = require('https');
const http = require('http');

// Get URL from arguments or environment variable
const url = process.argv[2] || process.env.SITE_URL;

if (!url) {
  console.error('❌ Error: Please provide the website URL.');
  console.log('Usage: node keep-awake.js <your-render-url>');
  console.log('Example: node keep-awake.js https://nimsa-se.onrender.com');
  process.exit(1);
}

const pingUrl = url.replace(/\/$/, '') + '/health';
const INTERVAL = 14 * 60 * 1000; // 14 minutes (Render sleeps after 15 min of inactivity)

console.log(`🚀 Starting keep-awake pinger for: ${pingUrl}`);
console.log(`⏰ Will ping every 14 minutes.`);

function ping() {
  const client = pingUrl.startsWith('https') ? https : http;
  const startTime = Date.now();

  client.get(pingUrl, (res) => {
    const duration = Date.now() - startTime;
    console.log(`[${new Date().toLocaleTimeString()}] 🔄 Pinged ${pingUrl} - Status: ${res.statusCode} (${duration}ms)`);
  }).on('error', (err) => {
    console.error(`[${new Date().toLocaleTimeString()}] ❌ Ping failed:`, err.message);
  });
}

// Ping immediately on start
ping();

// Schedule periodic pings
setInterval(ping, INTERVAL);
