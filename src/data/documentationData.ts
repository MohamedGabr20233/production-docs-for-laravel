import { PhpVersion } from "@/store/phpVersionSlice";

// PHP Installation commands per version
export const phpInstallCommands: Record<PhpVersion, string> = {
  "8.3": `sudo apt install -y \\
  php8.3 \\
  php8.3-fpm \\
  php8.3-cli \\
  php8.3-mysql \\
  php8.3-xml \\
  php8.3-curl \\
  php8.3-mbstring \\
  php8.3-zip \\
  php8.3-gd \\
  php8.3-bcmath \\
  php8.3-intl`,
  "8.2": `sudo apt install -y \\
  php8.2 \\
  php8.2-fpm \\
  php8.2-cli \\
  php8.2-mysql \\
  php8.2-xml \\
  php8.2-curl \\
  php8.2-mbstring \\
  php8.2-zip \\
  php8.2-gd \\
  php8.2-bcmath \\
  php8.2-intl`,
};

// PHP version check command
export const phpVersionCheck: Record<PhpVersion, string> = {
  "8.3": "php -v",
  "8.2": "php -v",
};

// PHP-FPM status check
export const phpFpmStatusCheck: Record<PhpVersion, string> = {
  "8.3": "systemctl status php8.3-fpm",
  "8.2": "systemctl status php8.2-fpm",
};

// PHP-FPM enable and start
export const phpFpmEnableStart: Record<PhpVersion, string> = {
  "8.3": "sudo systemctl enable php8.3-fpm && sudo systemctl start php8.3-fpm",
  "8.2": "sudo systemctl enable php8.2-fpm && sudo systemctl start php8.2-fpm",
};

// Nginx PHP-FPM socket path
export const nginxPhpFpmSocket: Record<PhpVersion, string> = {
  "8.3": "unix:/run/php/php8.3-fpm.sock",
  "8.2": "unix:/run/php/php8.2-fpm.sock",
};

// Full Nginx config
export const nginxConfig: Record<PhpVersion, string> = {
  "8.3": `server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/app/public;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \\.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
    }
}`,
  "8.2": `server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/app/public;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \\.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.2-fpm.sock;
    }
}`,
};

// PHP-FPM restart command
export const phpFpmRestart: Record<PhpVersion, string> = {
  "8.3": "sudo systemctl restart php8.3-fpm",
  "8.2": "sudo systemctl restart php8.2-fpm",
};

// Clear and rebuild caches with PHP-FPM restart
export const cacheRebuildCommands: Record<PhpVersion, string> = {
  "8.3": `sudo systemctl restart php8.3-fpm
sudo systemctl reload nginx`,
  "8.2": `sudo systemctl restart php8.2-fpm
sudo systemctl reload nginx`,
};

// Quick reference table data
export const quickReferenceCommands: Record<PhpVersion, { command: string; description: string }[]> = {
  "8.3": [
    { command: "php artisan optimize:clear", description: "Clear all Laravel caches" },
    { command: "php artisan optimize", description: "Cache config, routes, and views" },
    { command: "php artisan migrate --force", description: "Run migrations in production" },
    { command: "php artisan db:seed --force", description: "Run seeders in production" },
    { command: "sudo systemctl restart php8.3-fpm", description: "Restart PHP-FPM" },
    { command: "sudo systemctl reload nginx", description: "Reload Nginx config" },
    { command: "php artisan storage:link", description: "Create storage symlink" },
    { command: "php artisan queue:restart", description: "Restart queue workers" },
  ],
  "8.2": [
    { command: "php artisan optimize:clear", description: "Clear all Laravel caches" },
    { command: "php artisan optimize", description: "Cache config, routes, and views" },
    { command: "php artisan migrate --force", description: "Run migrations in production" },
    { command: "php artisan db:seed --force", description: "Run seeders in production" },
    { command: "sudo systemctl restart php8.2-fpm", description: "Restart PHP-FPM" },
    { command: "sudo systemctl reload nginx", description: "Reload Nginx config" },
    { command: "php artisan storage:link", description: "Create storage symlink" },
    { command: "php artisan queue:restart", description: "Restart queue workers" },
  ],
};

// Version-specific notes
export const versionNotes: Record<PhpVersion, string[]> = {
  "8.3": [
    "PHP 8.3 is the latest stable version with improved performance",
    "Includes new features like typed class constants and json_validate()",
    "Recommended for new Laravel 10+ projects",
  ],
  "8.2": [
    "PHP 8.2 is a stable LTS-friendly version",
    "Good choice for compatibility with older Laravel versions (9.x, 10.x)",
    "Includes readonly classes and DNF types",
  ],
};

// Laravel version compatibility
export const laravelCompatibility: Record<PhpVersion, string> = {
  "8.3": "Laravel 10.x, 11.x",
  "8.2": "Laravel 9.x, 10.x, 11.x",
};
