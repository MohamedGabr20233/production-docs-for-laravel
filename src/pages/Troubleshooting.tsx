import { Helmet } from "react-helmet-async";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Section } from "@/components/Section";
import { CodeBlock } from "@/components/CodeBlock";
import { SocialLinks } from "@/components/SocialLinks";
import { Wrench, Info } from "lucide-react";
import { useAppSelector } from "@/store";
import { selectPhpVersion } from "@/store/phpVersionSlice";
import { phpFpmRestart } from "@/data/documentationData";

const Troubleshooting = () => {
  const phpVersion = useAppSelector(selectPhpVersion);

  return (
    <ThemeProvider>
      <Helmet>
        <title>Troubleshooting | Laravel Server Deployment Guide</title>
        <meta
          name="description"
          content="Common errors and fixes for Laravel production server deployment. Permission denied errors, storage issues, and more."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            {/* Page Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-3 bg-yellow-500/10 rounded-2xl mb-4">
                <Wrench className="h-8 w-8 text-yellow-500" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Troubleshooting
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Common errors you might encounter during Laravel production deployment and how to fix them.
              </p>
            </div>

            {/* Version Info */}
            <div className="mb-8 p-4 bg-primary/5 rounded-xl border border-primary/20">
              <div className="flex items-center gap-3">
                <Info className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Showing troubleshooting for <span className="font-semibold text-foreground">PHP {phpVersion}</span>.
                  Commands are version-specific.
                </p>
              </div>
            </div>

            {/* Permission Denied Error */}
            <Section id="permission-denied" title="Permission Denied Error (Laravel Log)" icon={Wrench} variant="warning">
              <div className="space-y-6">
                <div>
                  <p className="text-muted-foreground mb-4">
                    If you see this error: <code className="px-2 py-1 bg-muted rounded text-sm">"storage/logs/laravel.log" could not be opened: Permission denied</code>
                  </p>
                </div>

                <div>
                  <p className="text-foreground mb-2">
                    <strong>Step 1:</strong> Navigate to your Laravel app directory:
                  </p>
                  <CodeBlock code={`cd /var/www/YOUR_APP`} />
                </div>

                <div>
                  <p className="text-foreground mb-2">
                    <strong>Step 2:</strong> Fix ownership (most important):
                  </p>
                  <CodeBlock code={`sudo chown -R www-data:www-data storage bootstrap/cache`} />
                </div>

                <div>
                  <p className="text-foreground mb-2">
                    <strong>Step 3:</strong> Fix permissions:
                  </p>
                  <CodeBlock code={`sudo chmod -R 775 storage bootstrap/cache`} />
                </div>

                <div>
                  <p className="text-foreground mb-2">
                    <strong>Step 4:</strong> Recreate the log file:
                  </p>
                  <CodeBlock code={`sudo rm -f storage/logs/laravel.log\nsudo touch storage/logs/laravel.log\nsudo chown www-data:www-data storage/logs/laravel.log\nsudo chmod 664 storage/logs/laravel.log`} />
                </div>

                <div>
                  <p className="text-foreground mb-2">
                    <strong>Step 5:</strong> Clear Laravel caches:
                  </p>
                  <CodeBlock code={`php artisan optimize:clear`} />
                </div>

                <div>
                  <p className="text-foreground mb-2">
                    <strong>Step 6:</strong> Restart PHP-FPM (PHP {phpVersion}):
                  </p>
                  <CodeBlock code={phpFpmRestart[phpVersion]} />
                </div>

                <div>
                  <p className="text-foreground mb-2">
                    <strong>Step 7:</strong> Verify permissions are correct:
                  </p>
                  <CodeBlock code={`ls -ld storage storage/logs bootstrap/cache`} />
                  <p className="text-muted-foreground mt-2">
                    You should see <code className="px-2 py-1 bg-muted rounded text-sm">www-data www-data</code> as owner for all directories.
                  </p>
                </div>

                <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                  <p className="font-semibold text-green-600 dark:text-green-400 mb-2">Expected Output</p>
                  <CodeBlock code={`drwxrwxr-x  www-data www-data storage\ndrwxrwxr-x  www-data www-data storage/logs\ndrwxrwxr-x  www-data www-data bootstrap/cache`} />
                </div>
              </div>
            </Section>

            {/* Storage Directory Not Found */}
            <Section id="storage-not-found" title="Storage Directory Not Found" icon={Wrench} variant="warning">
              <div className="space-y-6">
                <div>
                  <p className="text-muted-foreground mb-4">
                    If you see: <code className="px-2 py-1 bg-muted rounded text-sm">chown: cannot access 'storage': No such file or directory</code>
                  </p>
                </div>

                <div>
                  <p className="text-foreground mb-2">
                    Make sure you're in the correct directory:
                  </p>
                  <CodeBlock code={`cd /var/www/YOUR_APP\npwd`} />
                  <p className="text-muted-foreground mt-2">
                    The output should show <code className="px-2 py-1 bg-muted rounded text-sm">/var/www/YOUR_APP</code>
                  </p>
                </div>

                <div>
                  <p className="text-foreground mb-2">
                    List directories to verify structure:
                  </p>
                  <CodeBlock code={`ls -la`} />
                  <p className="text-muted-foreground mt-2">
                    You should see <code className="px-2 py-1 bg-muted rounded text-sm">storage</code> and <code className="px-2 py-1 bg-muted rounded text-sm">bootstrap</code> directories.
                  </p>
                </div>

                <div>
                  <p className="text-foreground mb-2">
                    If directories are missing, create them:
                  </p>
                  <CodeBlock code={`mkdir -p storage/logs storage/framework/sessions storage/framework/views storage/framework/cache\nmkdir -p bootstrap/cache`} />
                </div>
              </div>
            </Section>

            {/* PHP-FPM Not Running */}
            <Section id="php-fpm-error" title={`PHP ${phpVersion} FPM Not Running`} icon={Wrench} variant="warning">
              <div className="space-y-6">
                <div>
                  <p className="text-muted-foreground mb-4">
                    If you see: <code className="px-2 py-1 bg-muted rounded text-sm">502 Bad Gateway</code> or <code className="px-2 py-1 bg-muted rounded text-sm">connect() to unix:/run/php/php{phpVersion}-fpm.sock failed</code>
                  </p>
                </div>

                <div>
                  <p className="text-foreground mb-2">
                    Check PHP-FPM status:
                  </p>
                  <CodeBlock code={`systemctl status php${phpVersion}-fpm`} />
                </div>

                <div>
                  <p className="text-foreground mb-2">
                    If not running, start it:
                  </p>
                  <CodeBlock code={`sudo systemctl start php${phpVersion}-fpm\nsudo systemctl enable php${phpVersion}-fpm`} />
                </div>

                <div>
                  <p className="text-foreground mb-2">
                    Check if PHP-FPM socket exists:
                  </p>
                  <CodeBlock code={`ls -la /run/php/php${phpVersion}-fpm.sock`} />
                </div>

                <div>
                  <p className="text-foreground mb-2">
                    Verify Nginx is configured for PHP {phpVersion}:
                  </p>
                  <CodeBlock code={`grep -r "php${phpVersion}-fpm" /etc/nginx/sites-enabled/`} />
                  <p className="text-muted-foreground mt-2">
                    Make sure your Nginx config points to <code className="px-2 py-1 bg-muted rounded text-sm">unix:/run/php/php{phpVersion}-fpm.sock</code>
                  </p>
                </div>
              </div>
            </Section>

            {/* Check Web Server User */}
            <Section id="check-web-server" title="Identify Your Web Server User" icon={Wrench}>
              <div className="space-y-6">
                <div>
                  <p className="text-foreground mb-4">
                    Before fixing permissions, verify which user your web server runs as:
                  </p>
                </div>

                <div>
                  <p className="text-foreground mb-2">
                    For Nginx:
                  </p>
                  <CodeBlock code={`ps aux | grep nginx`} />
                </div>

                <div>
                  <p className="text-foreground mb-2">
                    For Apache:
                  </p>
                  <CodeBlock code={`ps aux | grep apache`} />
                </div>

                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-foreground">
                    On Ubuntu/Debian, the web server typically runs as <code className="px-2 py-1 bg-muted rounded text-sm">www-data</code>.
                    On CentOS/RHEL, it might be <code className="px-2 py-1 bg-muted rounded text-sm">nginx</code> or <code className="px-2 py-1 bg-muted rounded text-sm">apache</code>.
                  </p>
                </div>
              </div>
            </Section>
          </div>
        </main>
        <SocialLinks />
      </div>
    </ThemeProvider>
  );
};

export default Troubleshooting;
