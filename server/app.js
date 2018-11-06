const express = require('express');
const cors = require('cors');
const router = require('./routes');
const errorHandlers = require('./handlers/errorHandlers');

// Initialize new Express application
const app = express();

// Add CORS for all routes 👮‍
app.use(cors());

// Add routing 🛣
app.use(router);

// If none of the routes apply return a 404
app.use(errorHandlers.notFound);

// Show comprehensive error message in development
if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}
// Otherwise hide the stack trace
app.use(errorHandlers.productionErrors);

module.exports = app;
