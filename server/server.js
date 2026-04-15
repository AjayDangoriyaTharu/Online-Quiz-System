require('dotenv').config();
const connectDB = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`[server] running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });

  // Graceful shutdown
  const shutdown = (signal) => {
    console.log(`[server] ${signal} received — shutting down gracefully`);
    server.close(() => {
      console.log('[server] HTTP server closed');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT',  () => shutdown('SIGINT'));

  process.on('unhandledRejection', (err) => {
    console.error('[server] unhandledRejection:', err.message);
    server.close(() => process.exit(1));
  });
};

startServer();
