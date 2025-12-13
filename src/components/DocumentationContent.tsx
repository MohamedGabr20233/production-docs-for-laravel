import { AlertTriangle, Terminal, Globe, Database, Package, Github, Settings, Shield, CheckCircle, Server, Info } from "lucide-react";
import { Section } from "./Section";
import { CodeBlock } from "./CodeBlock";
import { useAppSelector } from "@/store";
import { selectPhpVersion } from "@/store/phpVersionSlice";
import {
  phpInstallCommands,
  phpFpmStatusCheck,
  phpFpmEnableStart,
  nginxConfig,
  versionNotes,
  laravelCompatibility,
} from "@/data/documentationData";

export function DocumentationContent() {
  const phpVersion = useAppSelector(selectPhpVersion);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Version Info Banner */}
      <div className="mb-8 p-4 bg-primary/5 rounded-xl border border-primary/20">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-foreground mb-1">
              PHP {phpVersion} Documentation
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Compatible with: {laravelCompatibility[phpVersion]}
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              {versionNotes[phpVersion].map((note, i) => (
                <li key={i}>• {note}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <Section id="notes" title="Important Notes" icon={AlertTriangle} variant="warning">
        <div className="space-y-4">
          <p className="text-foreground">
            <strong>Before you start, keep these in mind:</strong>
          </p>
          <ol className="list-decimal list-inside space-y-3 text-foreground">
            <li>
              To save a file after opening it with nano, press <code className="px-2 py-1 bg-muted rounded text-sm">Ctrl + X</code> then <code className="px-2 py-1 bg-muted rounded text-sm">Y</code>{" "}
              to apply changes
            </li>
            <li>Before installing SSL certificates, all HTTP links will show security warnings</li>
            <li>
              <strong>Recommended:</strong> Don't create your database directly in MySQL. Use Laravel migrations instead for clean separation of concerns
            </li>
          </ol>
          <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p className="font-semibold text-primary mb-2">Why use migrations?</p>
            <ul className="list-disc list-inside text-foreground space-y-1">
              <li>Laravel migrations can create the DB</li>
              <li>No hard-coding schema now</li>
              <li>Clean separation of concerns</li>
              <li>Easy to rotate credentials later</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Server Login */}
      <Section id="login" title="1. Server Login & Update" icon={Terminal}>
        <p className="text-foreground mb-4">First, connect to your server via SSH:</p>
        <CodeBlock code={`ssh YOUR_SERVER_NAME@YOUR_SERVER_IP`} />
        <p className="text-muted-foreground mb-4">
          Example: <code>ssh superbaba@YOUR_SERVER_IP</code>
        </p>
        <p className="text-foreground mb-4">Update the Linux server:</p>
        <CodeBlock code={`sudo apt update && sudo apt upgrade -y`} />
      </Section>

      {/* Install Nginx */}
      <Section id="nginx" title="2. Install Nginx" icon={Globe}>
        <p className="text-foreground mb-4">Install Nginx web server:</p>
        <CodeBlock code={`sudo apt install nginx -y`} />
        <p className="text-foreground mb-4">Start and enable Nginx:</p>
        <CodeBlock code={`sudo systemctl enable nginx\nsudo systemctl start nginx`} />
        <p className="text-foreground mb-4">Verify Nginx is running:</p>
        <CodeBlock code={`systemctl status nginx`} />
        <p className="text-muted-foreground mb-4">
          You should see: <code>Active: active (running)</code>
        </p>
        <p className="text-foreground">
          Open <code>http://YOUR_SERVER_IP</code> in browser - you should see "Welcome to nginx"
        </p>
      </Section>

      {/* PHP Installation - Dynamic based on version */}
      <Section id="php" title={`3. PHP ${phpVersion} Installation`} icon={Server}>
        <p className="text-foreground mb-4">Add PHP repository and update:</p>
        <CodeBlock code={`sudo apt install software-properties-common -y\nsudo add-apt-repository ppa:ondrej/php -y\nsudo apt update`} />
        <p className="text-foreground mb-4">Install PHP {phpVersion} with required extensions:</p>
        <CodeBlock code={phpInstallCommands[phpVersion]} />
        <p className="text-foreground mb-4">Verify PHP installation:</p>
        <CodeBlock code={`php -v`} />
        <p className="text-foreground mb-4">Ensure PHP-FPM is running:</p>
        <CodeBlock code={phpFpmStatusCheck[phpVersion]} />
        <p className="text-muted-foreground">
          If not running: <code>{phpFpmEnableStart[phpVersion]}</code>
        </p>
      </Section>

      {/* MySQL */}
      <Section id="mysql" title="4. MySQL Setup" icon={Database}>
        <p className="text-foreground mb-4">Install MySQL server:</p>
        <CodeBlock code={`sudo apt install mysql-server -y`} />
        <p className="text-foreground mb-4">Create MySQL user (replace with your credentials):</p>
        <CodeBlock
          code={`sudo mysql\n\nCREATE USER 'UserNameForDB'@'localhost' IDENTIFIED BY 'STRONG_PASSWORD';\n\nGRANT CREATE, ALTER, DROP, INDEX, REFERENCES, SELECT, INSERT, UPDATE, DELETE\nON *.* TO 'UserNameForDB'@'localhost';\n\nFLUSH PRIVILEGES;\nEXIT;`}
          language="sql"
        />
      </Section>

      {/* Composer */}
      <Section id="composer" title="5. Install Composer" icon={Package}>
        <p className="text-foreground mb-4">Install Composer globally:</p>
        <CodeBlock code={`cd ~\ncurl -sS https://getcomposer.org/installer | php\nsudo mv composer.phar /usr/local/bin/composer`} />
        <p className="text-foreground mb-4">Verify installation:</p>
        <CodeBlock code={`composer --version`} />
      </Section>

      {/* GitHub Connection */}
      <Section id="github" title="6. GitHub Connection" icon={Github}>
        <p className="text-foreground mb-4">
          <strong>Step 1:</strong> Generate SSH key on server:
        </p>
        <CodeBlock code={`ssh-keygen -t ed25519 -C "your-server-name"`} />
        <p className="text-muted-foreground mb-4">Press Enter for default file location and passphrase.</p>

        <p className="text-foreground mb-4">
          <strong>Step 2:</strong> Copy the public key:
        </p>
        <CodeBlock code={`cat ~/.ssh/id_ed25519.pub`} />

        <p className="text-foreground mb-4">
          <strong>Step 3:</strong> Add key to GitHub:
        </p>
        <ul className="list-disc list-inside text-foreground space-y-2 mb-4">
          <li>Go to your GitHub repository → Settings → Deploy keys</li>
          <li>Click "Add deploy key", paste your key</li>
          <li>Check "Allow write access" if needed</li>
        </ul>

        <p className="text-foreground mb-4">
          <strong>Step 4:</strong> Test connection:
        </p>
        <CodeBlock code={`ssh -T git@github.com`} />
        <p className="text-muted-foreground">Expected: "Hi USERNAME! You've successfully authenticated..."</p>
      </Section>

      {/* Laravel Setup */}
      <Section id="laravel" title="7. Laravel Project Setup" icon={Settings}>
        <p className="text-foreground mb-4">Clone your repository:</p>
        <CodeBlock code={`sudo mkdir -p /var/www\nsudo chown $USER:$USER /var/www\ncd /var/www\ngit clone git@github.com:ORG/REPO.git app\ncd app`} />

        <p className="text-foreground mb-4">Install dependencies:</p>
        <CodeBlock code={`composer install --no-dev --optimize-autoloader`} />

        <p className="text-foreground mb-4">Setup environment:</p>
        <CodeBlock code={`cp .env.example .env\nnano .env`} />

        <p className="text-foreground mb-4">Configure your .env file:</p>
        <CodeBlock
          code={`APP_NAME=YourApp\nAPP_ENV=production\nAPP_KEY=\nAPP_DEBUG=false\nAPP_URL=https://yourdomain.com\n\nDB_CONNECTION=mysql\nDB_HOST=127.0.0.1\nDB_PORT=3306\nDB_DATABASE=your_db\nDB_USERNAME=your_db_user\nDB_PASSWORD=your_password`}
          language="env"
        />

        <p className="text-foreground mb-4">Generate app key and fix permissions:</p>
        <CodeBlock code={`php artisan key:generate\n\nsudo chown -R www-data:www-data storage bootstrap/cache\nsudo chmod -R 775 storage bootstrap/cache`} />
      </Section>

      {/* Domain & DNS - Dynamic Nginx config */}
      <Section id="domain" title="8. Nginx & Domain Configuration" icon={Globe}>
        <p className="text-foreground mb-4">Create Nginx site configuration:</p>
        <CodeBlock code={`sudo nano /etc/nginx/sites-available/app`} />

        <p className="text-foreground mb-4">Add this configuration (note the PHP {phpVersion} FPM socket):</p>
        <CodeBlock code={nginxConfig[phpVersion]} language="nginx" />

        <p className="text-foreground mb-4">Enable the site:</p>
        <CodeBlock code={`sudo ln -s /etc/nginx/sites-available/app /etc/nginx/sites-enabled/\nsudo nginx -t\nsudo systemctl reload nginx`} />

        <p className="text-foreground mb-4">
          <strong>DNS Setup:</strong> Add these records in your domain provider:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Host</th>
                <th className="px-4 py-2 text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-2">A Record</td>
                <td className="px-4 py-2">@</td>
                <td className="px-4 py-2">YOUR_SERVER_IP</td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-2">A Record</td>
                <td className="px-4 py-2">www</td>
                <td className="px-4 py-2">YOUR_SERVER_IP</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* SSL */}
      <Section id="ssl" title="9. SSL Certificates (Let's Encrypt)" icon={Shield}>
        <p className="text-foreground mb-4">Install Certbot:</p>
        <CodeBlock code={`sudo apt install certbot python3-certbot-nginx -y`} />

        <p className="text-foreground mb-4">Generate SSL certificate:</p>
        <CodeBlock code={`sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com`} />

        <p className="text-muted-foreground mb-4">Follow the prompts: enter your email, accept terms.</p>

        <p className="text-foreground mb-4">Create HTTP to HTTPS redirect:</p>
        <CodeBlock code={`sudo nano /etc/nginx/sites-available/yourDomain`} />
        <CodeBlock
          code={`server {
    listen 80;
    server_name yourDomain.com www.yourDomain.com;
    return 301 https://$host$request_uri;
}`}
          language="nginx"
        />
      </Section>

      {/* Final Steps */}
      <Section id="final" title="10. Final Steps" icon={CheckCircle}>
        <p className="text-foreground mb-4">Run migrations and optimize:</p>
        <CodeBlock
          code={`php artisan migrate --force\nphp artisan storage:link\nphp artisan passport:keys  # if using Passport\nphp artisan passport:client --personal  # if using Passport\nphp artisan optimize`}
        />

        <p className="text-foreground mb-4">If optimization fails, fix permissions:</p>
        <CodeBlock
          code={`mkdir -p storage/logs bootstrap/cache\nsudo chown -R www-data:www-data storage bootstrap/cache\nsudo find storage bootstrap/cache -type d -exec chmod 775 {} \\;\nsudo find storage bootstrap/cache -type f -exec chmod 664 {} \\;`}
        />

        <p className="text-foreground mb-4">Add your user to www-data group:</p>
        <CodeBlock code={`sudo usermod -aG www-data YOUR_SSH_USER\nnewgrp www-data`} />

        <p className="text-foreground mb-4">Clear and re-optimize:</p>
        <CodeBlock code={`php artisan config:clear\nphp artisan cache:clear\nphp artisan view:clear\nphp artisan optimize`} />

        <p className="text-foreground mb-4">
          <strong>Final Verification:</strong>
        </p>
        <CodeBlock code={`sudo ss -tulnp | grep nginx`} />
        <p className="text-muted-foreground mb-4">Expected: Ports 80 and 443 should be listening.</p>

        <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/30">
          <p className="font-semibold text-green-600 dark:text-green-400 mb-2">Congratulations!</p>
          <p className="text-foreground">
            Your Laravel application with PHP {phpVersion} should now be live at <code className="px-2 py-1 bg-muted rounded">https://yourdomain.com</code>
          </p>
        </div>
      </Section>
    </div>
  );
}
