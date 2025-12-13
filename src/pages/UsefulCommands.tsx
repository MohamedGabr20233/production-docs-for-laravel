import { Helmet } from "react-helmet-async";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Section } from "@/components/Section";
import { CodeBlock } from "@/components/CodeBlock";
import { SocialLinks } from "@/components/SocialLinks";
import { RefreshCw, Database, Trash2, CheckCircle, Info } from "lucide-react";
import { useAppSelector } from "@/store";
import { selectPhpVersion } from "@/store/phpVersionSlice";
import { cacheRebuildCommands, quickReferenceCommands } from "@/data/documentationData";

const UsefulCommands = () => {
  const phpVersion = useAppSelector(selectPhpVersion);

  return (
    <ThemeProvider>
      <Helmet>
        <title>Useful Commands | Laravel Server Deployment Guide</title>
        <meta
          name="description"
          content="Essential Laravel production commands for database management, cache clearing, and deployment verification."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            {/* Page Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4">
                <RefreshCw className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Useful Commands
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Quick reference for common Laravel production server commands.
              </p>
            </div>

            {/* Version Info */}
            <div className="mb-8 p-4 bg-primary/5 rounded-xl border border-primary/20">
              <div className="flex items-center gap-3">
                <Info className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Showing commands for <span className="font-semibold text-foreground">PHP {phpVersion}</span>.
                  Commands are version-specific.
                </p>
              </div>
            </div>

            {/* Database Reset */}
            <Section id="database-reset" title="Database Reset & Fresh Seed" icon={Database} variant="info">
              <div className="space-y-6">
                <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                  <p className="text-yellow-600 dark:text-yellow-400 font-semibold">Warning</p>
                  <p className="text-foreground text-sm mt-1">
                    This will delete all data in your database. Use with caution in production!
                  </p>
                </div>

                <div>
                  <p className="text-foreground mb-2">
                    <strong>Step 1:</strong> Enter MySQL and drop the database:
                  </p>
                  <CodeBlock
                    code={`sudo mysql\n\nDROP DATABASE your_database_name;\n\nCREATE DATABASE your_database_name\n  CHARACTER SET utf8mb4\n  COLLATE utf8mb4_unicode_ci;\n\nEXIT;`}
                    language="sql"
                  />
                </div>

                <div>
                  <p className="text-foreground mb-2">
                    <strong>Step 2:</strong> Run migrations and seeders:
                  </p>
                  <CodeBlock code={`php artisan migrate --force\nphp artisan db:seed --force`} />
                </div>

                <div>
                  <p className="text-foreground mb-2">
                    <strong>Step 3:</strong> If using Passport, recreate the client:
                  </p>
                  <CodeBlock code={`php artisan passport:client --personal --provider=users`} />
                </div>
              </div>
            </Section>

            {/* Cache Clearing */}
            <Section id="cache-clearing" title="Clear & Rebuild Caches" icon={Trash2} variant="info">
              <div className="space-y-6">
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-primary font-semibold">When to use</p>
                  <p className="text-foreground text-sm mt-1">
                    Run these commands after deploying updates to your application.
                  </p>
                </div>

                <div>
                  <p className="text-foreground mb-2">
                    <strong>Step 1:</strong> Run specific seeders (if needed):
                  </p>
                  <CodeBlock code={`php artisan db:seed --class=CountrySeeder --force\nphp artisan db:seed --class=CategorySeeder --force\nphp artisan db:seed --class=UserSeeder --force`} />
                </div>

                <div>
                  <p className="text-foreground mb-2">
                    <strong>Step 2:</strong> Clear all caches:
                  </p>
                  <CodeBlock code={`php artisan optimize:clear`} />
                </div>

                <div>
                  <p className="text-foreground mb-2">
                    <strong>Step 3:</strong> Rebuild production caches:
                  </p>
                  <CodeBlock code={`php artisan config:cache\nphp artisan route:cache\nphp artisan view:cache`} />
                </div>

                <div>
                  <p className="text-foreground mb-2">
                    <strong>Step 4:</strong> Restart services (PHP {phpVersion}):
                  </p>
                  <CodeBlock code={cacheRebuildCommands[phpVersion]} />
                </div>
              </div>
            </Section>

            {/* Verification */}
            <Section id="verification" title="Verify Everything Works" icon={CheckCircle}>
              <div className="space-y-6">
                <div>
                  <p className="text-foreground mb-2">Check routes are registered:</p>
                  <CodeBlock code={`php artisan route:list | grep api/auth`} />
                </div>

                <div>
                  <p className="text-foreground mb-2">Test login endpoint:</p>
                  <CodeBlock code={`curl -X POST https://yourdomain.com/api/auth/login \\\n  -H "Accept: application/json" \\\n  -H "Content-Type: application/json" \\\n  -d '{"email":"test@example.com","password":"your_password"}'`} />
                </div>

                <div>
                  <p className="text-foreground mb-2">Check Laravel logs for errors:</p>
                  <CodeBlock code={`tail -f storage/logs/laravel.log`} />
                </div>

                <div>
                  <p className="text-foreground mb-2">Check Nginx error logs:</p>
                  <CodeBlock code={`sudo tail -f /var/log/nginx/error.log`} />
                </div>
              </div>
            </Section>

            {/* Quick Reference */}
            <Section id="quick-reference" title={`Quick Reference (PHP ${phpVersion})`} icon={RefreshCw}>
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">Command</th>
                        <th className="px-4 py-3 text-left font-semibold">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quickReferenceCommands[phpVersion].map((item, index) => (
                        <tr key={index} className="border-t border-border">
                          <td className="px-4 py-3">
                            <code className="text-xs bg-muted px-2 py-1 rounded">{item.command}</code>
                          </td>
                          <td className="px-4 py-3">{item.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

export default UsefulCommands;
