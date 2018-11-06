// Load environment configuration
require('dotenv').config();

// Configure express
const app = require('./app');

// Start server 🔥
app.listen(process.env.PORT, () => {
  console.log('💸 server listening on %s', process.env.PORT);
});
