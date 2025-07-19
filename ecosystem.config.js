module.exports = {
  apps: [{
    name: 'scienceslabs-api',
    script: './server/index.cjs',
    instances: process.env.NODE_ENV === 'production' ? 'max' : 1,
    exec_mode: process.env.NODE_ENV === 'production' ? 'cluster' : 'fork',
    env: {
      NODE_ENV: 'development',
      PORT: 3001
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_file: './logs/pm2-combined.log',
    time: true,
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=1024',
    watch: process.env.NODE_ENV === 'development',
    ignore_watch: ['node_modules', 'logs', 'uploads', '.git'],
    restart_delay: 4000,
    max_restarts: 10,
    min_uptime: '10s'
  }],

  deploy: {
    production: {
      user: 'scienceslabs',
      host: 'votre-serveur.com',
      ref: 'origin/main',
      repo: 'git@github.com:votre-organisation/scienceslabs-ecommerce.git',
      path: '/home/scienceslabs/scienceslabs-ecommerce',
      'pre-deploy-local': '',
      'post-deploy': 'npm install --production && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};