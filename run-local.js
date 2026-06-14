// Local launcher: forces Node's DNS resolver to public servers so the
// MongoDB Atlas "mongodb+srv://" SRV lookup works even when the local
// network's DNS server refuses SRV queries. Then boots the real app.
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
console.log('🔧 DNS resolver forced to:', dns.getServers().join(', '));
require('./app.js');
