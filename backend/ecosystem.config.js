// PM2 ecosystem config — production process manager
// Usage: pm2 start ecosystem.config.js --env production

module.exports = {
  apps: [
    {
      name: "pktech-backend",
      script: "src/server.js",
      instances: "max",          // cluster mode — one per CPU core
      exec_mode: "cluster",
      watch: false,
      max_memory_restart: "512M",

      // Environment variables per stage
      env: {
        NODE_ENV: "development",
        PORT: 5000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 5000,
      },

      // Logging
      out_file:   "src/logs/pm2-out.log",
      error_file: "src/logs/pm2-error.log",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss",

      // Graceful reload
      wait_ready: true,
      listen_timeout: 10000,
      kill_timeout: 5000,
    },
  ],
};
