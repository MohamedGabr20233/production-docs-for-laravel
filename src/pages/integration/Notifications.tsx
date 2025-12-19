import { useEffect } from "react";
import { Section } from "@/components/Section";
import { CodeBlock } from "@/components/CodeBlock";
import { useIntegrationSections } from "@/contexts/IntegrationContext";
import type { SectionGroup } from "@/contexts/IntegrationContext";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Database,
  Key,
  Rocket,
  Server,
  Shield,
  Smartphone,
  Users,
  Wrench,
  XCircle,
  Zap,
} from "lucide-react";

// Flat sections list for scroll tracking
const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "outdated-notes", label: "Outdated Tutorials" },
  { id: "firebase-setup", label: "Firebase Setup" },
  { id: "server-setup", label: "Production Server" },
  { id: "sdk-installation", label: "SDK Installation" },
  { id: "device-tokens", label: "Device Tokens" },
  { id: "endpoint-creation", label: "API Endpoint" },
  { id: "fcm-service", label: "FCM Service Class" },
  { id: "test-notification", label: "Test Notification" },
  { id: "multi-device", label: "Multiple Devices" },
  { id: "admin-notifications", label: "Admin Notifications" },
  { id: "token-cleanup", label: "Token Cleanup" },
  { id: "best-practices", label: "Best Practices" },
];

// Grouped sections for dropdown sidebar
const sectionGroups: SectionGroup[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    sections: [
      { id: "introduction", label: "Introduction" },
      { id: "outdated-notes", label: "Outdated Tutorials" },
    ],
  },
  {
    id: "firebase-config",
    label: "Firebase Configuration",
    sections: [
      { id: "firebase-setup", label: "Firebase Setup" },
      { id: "server-setup", label: "Production Server" },
      { id: "sdk-installation", label: "SDK Installation" },
    ],
  },
  {
    id: "database-api",
    label: "Database & API",
    sections: [
      { id: "device-tokens", label: "Device Tokens" },
      { id: "endpoint-creation", label: "API Endpoint" },
    ],
  },
  {
    id: "fcm-implementation",
    label: "FCM Implementation",
    sections: [
      { id: "fcm-service", label: "FCM Service Class" },
      { id: "test-notification", label: "Test Notification" },
    ],
  },
  {
    id: "advanced-usage",
    label: "Advanced Usage",
    sections: [
      { id: "multi-device", label: "Multiple Devices" },
      { id: "admin-notifications", label: "Admin Notifications" },
      { id: "token-cleanup", label: "Token Cleanup" },
      { id: "best-practices", label: "Best Practices" },
    ],
  },
];

export function NotificationsPage() {
  const { setSections, setSectionGroups } = useIntegrationSections();

  // Set sections for the right sidebar when component mounts
  useEffect(() => {
    setSections(sections);
    setSectionGroups(sectionGroups);
    return () => {
      setSections([]);
      setSectionGroups([]);
    };
  }, [setSections, setSectionGroups]);
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="border-b border-border pb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-lg bg-primary/10 p-2">
            <Bell className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Push Notifications
            </h1>
            <p className="text-muted-foreground">
              Firebase Cloud Messaging (FCM) with Laravel
            </p>
          </div>
        </div>

        {/* Toolkit badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 font-medium">
            Firebase
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 font-medium">
            Laravel 8-12
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </span>
            Updated {today}
          </span>
        </div>
      </div>

      {/* Introduction */}
      <Section id="introduction" title="Introduction" icon={Zap} variant="info">
        <p>
          This guide walks you through implementing <strong>push notifications</strong> in
          Laravel using Firebase Cloud Messaging (FCM). We'll cover everything from
          initial Firebase setup to sending notifications to multiple devices.
        </p>

        <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
          <p className="text-sm">
            <strong className="text-green-600 dark:text-green-400">Updated for {today}:</strong>{" "}
            This documentation uses the latest best practices and is tested with Laravel 8
            through 12. Unlike many outdated tutorials online, we'll show you the{" "}
            <em>correct</em> approach without unnecessary packages.
          </p>
        </div>

        <h4 className="font-semibold mt-6 mb-2">What you'll learn:</h4>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Setting up Firebase project and service account</li>
          <li>Configuring production server for FCM</li>
          <li>Installing the correct SDK (and avoiding wrong ones)</li>
          <li>Storing device tokens per user</li>
          <li>Creating a reusable FCM service class</li>
          <li>Sending to single and multiple devices</li>
          <li>Handling invalid tokens automatically</li>
        </ul>
      </Section>

      {/* Outdated Tutorials Warning */}
      <Section
        id="outdated-notes"
        title="Notes on Outdated Tutorials"
        icon={AlertTriangle}
        variant="warning"
      >
        <p className="mb-4">
          Many tutorials online are outdated and will lead you astray. Here's what to{" "}
          <strong>avoid</strong>:
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <h4 className="font-semibold text-red-600 dark:text-red-400 flex items-center gap-2 mb-2">
              <XCircle className="h-4 w-4" />
              Google Auth Library
            </h4>
            <p className="text-sm text-muted-foreground mb-2">
              You may see tutorials asking you to install:
            </p>
            <CodeBlock code="composer require google/auth" language="bash" />
            <p className="text-sm text-muted-foreground mt-2">
              <strong>Do not install this manually.</strong> The Firebase PHP SDK already
              includes it. OAuth2 access tokens are handled automatically. Installing it
              yourself is unnecessary and confusing.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <h4 className="font-semibold text-red-600 dark:text-red-400 flex items-center gap-2 mb-2">
              <XCircle className="h-4 w-4" />
              config/services.php Configuration
            </h4>
            <p className="text-sm text-muted-foreground mb-2">
              Old tutorials force Firebase config into <code>config/services.php</code>:
            </p>
            <CodeBlock
              code={`// Example (OUTDATED / UNNECESSARY):
'firebase' => [
    'credentials' => env('FIREBASE_CREDENTIAL'),
],`}
              language="php"
            />
            <p className="text-sm text-muted-foreground mt-2">
              <strong>This is NOT required anymore.</strong> We'll use environment
              variables directly in our service class.
            </p>
          </div>
        </div>
      </Section>

      {/* Firebase Setup */}
      <Section id="firebase-setup" title="Firebase Project Setup" icon={Key}>
        <p className="mb-4">
          First, let's get the credentials you need from Firebase. You'll need:
        </p>

        <div className="p-4 rounded-lg bg-muted/50 border border-border mb-4">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <code className="bg-background px-1.5 py-0.5 rounded">FCM_PROJECT_ID</code> - Your Firebase project ID
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <code className="bg-background px-1.5 py-0.5 rounded">FCM_SERVICE_ACCOUNT_PATH</code> - Path to your private key JSON
            </li>
          </ul>
        </div>

        <h4 className="font-semibold mb-3">Step-by-step:</h4>
        <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
          <li>
            Go to{" "}
            <a
              href="https://console.firebase.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Firebase Console
            </a>{" "}
            or click "Console" at the top right of the Firebase website
          </li>
          <li>Create or open your project</li>
          <li>
            Click the <strong>Settings icon</strong> (gear) next to the project name at
            the top left, then select <strong>Project settings</strong>
          </li>
          <li>
            In the <strong>General</strong> tab, you'll find your{" "}
            <strong>Project ID</strong>
          </li>
          <li>
            Go to the <strong>Service accounts</strong> tab
          </li>
          <li>
            Click <strong>"Generate new private key"</strong> button
          </li>
          <li>
            Download the JSON file and store it in your Laravel project at{" "}
            <code>storage/app/firebase/service-account.json</code>
          </li>
        </ol>

        <div className="mt-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <h4 className="font-semibold text-yellow-600 dark:text-yellow-400 flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4" />
            Security Note
          </h4>
          <p className="text-sm text-muted-foreground mb-2">
            Add this to your <code>.gitignore</code> to prevent accidentally committing
            your credentials:
          </p>
          <CodeBlock
            code={`# Firebase
/storage/app/firebase/*.json`}
            language="bash"
          />
        </div>
      </Section>

      {/* Production Server Setup */}
      <Section id="server-setup" title="Production Server Setup" icon={Server}>
        <p className="mb-4">
          Now let's configure your production server with the Firebase credentials.
        </p>

        <h4 className="font-semibold mb-3">1. Upload the private key to your server:</h4>
        <CodeBlock
          code={`# From your local machine
scp /path/to/service-account.json \\
    your_user@your_server_ip:/var/www/your-app/storage/app/firebase/service-account.json`}
          language="bash"
        />

        <h4 className="font-semibold mb-3 mt-6">2. Verify the file exists on the server:</h4>
        <CodeBlock
          code={`# SSH into your server
ssh your_user@your_server_ip

# Check the file
ls /var/www/your-app/storage/app/firebase/
# Expected output: service-account.json`}
          language="bash"
        />

        <h4 className="font-semibold mb-3 mt-6">3. Update your .env file:</h4>
        <CodeBlock
          code={`FCM_PROJECT_ID=your-project-id
FCM_SERVICE_ACCOUNT_PATH=/var/www/your-app/storage/app/firebase/service-account.json`}
          language="bash"
        />

        <div className="mt-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <p className="text-sm">
            <strong className="text-blue-600 dark:text-blue-400">Note:</strong> In
            production, use the absolute path (not <code>$&#123;PWD&#125;</code>) for
            reliability.
          </p>
        </div>
      </Section>

      {/* SDK Installation */}
      <Section id="sdk-installation" title="SDK Installation" icon={Wrench}>
        <p className="mb-4">
          We'll use the <strong>Kreait Firebase PHP SDK</strong> - the most trusted and
          actively maintained library.
        </p>

        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 mb-4">
          <h4 className="font-semibold text-green-600 dark:text-green-400 flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-4 w-4" />
            What to install
          </h4>
          <CodeBlock code="composer require kreait/firebase-php" language="bash" />
        </div>

        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 mb-4">
          <h4 className="font-semibold text-red-600 dark:text-red-400 flex items-center gap-2 mb-2">
            <XCircle className="h-4 w-4" />
            What NOT to install
          </h4>
          <CodeBlock code="# DO NOT install this:
composer require kreait/laravel-firebase" language="bash" />
          <p className="text-sm text-muted-foreground mt-2">
            <code>kreait/laravel-firebase</code> is a Laravel wrapper that adds
            unnecessary configuration, potential version conflicts, and harder debugging.
          </p>
        </div>

        <h4 className="font-semibold mb-3">Best practice approach:</h4>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Use the core SDK directly</li>
          <li>Create your own service class (we'll do this next)</li>
          <li>Load credentials from .env</li>
          <li>Avoid facades and auto-magic</li>
        </ul>

        <p className="mt-4 text-sm text-muted-foreground">
          This approach works with <strong>Laravel 8 through 12</strong>, is future-proof,
          and is easier for beginners to understand.
        </p>
      </Section>

      {/* Device Tokens */}
      <Section id="device-tokens" title="Device Token Storage" icon={Database}>
        <p className="mb-4">
          To send notifications, we need to know <strong>who</strong> will receive them.
          Each mobile device has a unique FCM token that we need to store.
        </p>

        <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 mb-6">
          <h4 className="font-semibold text-yellow-600 dark:text-yellow-400 flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4" />
            Important Note
          </h4>
          <p className="text-sm text-muted-foreground">
            If you're using <strong>Laravel Passport</strong> for authentication, do NOT
            mix it with notification device tokens. Authentication and notifications are
            two different systems:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
            <li>Laravel Passport handles <em>who the user is</em></li>
            <li>Firebase handles <em>where to send notifications</em></li>
          </ul>
          <p className="text-sm text-muted-foreground mt-2">
            Users can log in from multiple devices, so we store push tokens in a separate
            table.
          </p>
        </div>

        <h4 className="font-semibold mb-3">1. Create the migration:</h4>
        <CodeBlock code="php artisan make:migration create_device_tokens_table" language="bash" />

        <h4 className="font-semibold mb-3 mt-6">2. Define the table structure:</h4>
        <CodeBlock
          code={`Schema::create('device_tokens', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')
          ->constrained()
          ->cascadeOnDelete();
    $table->string('token')->unique();
    $table->string('platform')->comment('android | ios');
    $table->timestamps();
});`}
          language="php"
        />

        <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border">
          <h5 className="font-medium mb-2">Why this design:</h5>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>
              <code>unique(token)</code> - prevents duplicates
            </li>
            <li>
              <code>cascadeOnDelete</code> - cleanup when user is deleted
            </li>
            <li>
              <code>platform</code> - helps with future filtering (iOS/Android specific)
            </li>
          </ul>
        </div>

        <h4 className="font-semibold mb-3 mt-6">3. Run the migration:</h4>
        <CodeBlock code="php artisan migrate" language="bash" />

        <h4 className="font-semibold mb-3 mt-6">4. Create the DeviceToken model:</h4>
        <CodeBlock code="php artisan make:model DeviceToken" language="bash" />

        <CodeBlock
          code={`<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class DeviceToken extends Model
{
    protected $fillable = [
        'user_id',
        'token',
        'platform',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}`}
          language="php"
        />

        <h4 className="font-semibold mb-3 mt-6">5. Add the relation to User model:</h4>
        <CodeBlock
          code={`// In App\\Models\\User

public function deviceTokens()
{
    return $this->hasMany(DeviceToken::class);
}`}
          language="php"
        />
      </Section>

      {/* API Endpoint for Token Registration */}
      <Section id="endpoint-creation" title="Token Registration Endpoint" icon={Smartphone}>
        <p className="mb-4">
          This endpoint allows the mobile app to send its Firebase device token to the
          backend so we can later send push notifications.
        </p>

        <h4 className="font-semibold mb-3">1. Create the Request validation:</h4>
        <CodeBlock code="php artisan make:request StoreDeviceTokenRequest" language="bash" />

        <CodeBlock
          code={`<?php

declare(strict_types=1);

namespace App\\Http\\Requests\\Auth;

use Illuminate\\Foundation\\Http\\FormRequest;

final class RegisterFcmTokenRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'token' => ['required', 'string'],
            'platform' => ['required', 'in:android,ios'],
        ];
    }

    public function messages(): array
    {
        return [
            'token.required' => __('FCM token is required'),
            'token.string' => __('FCM token must be a string'),
        ];
    }
}`}
          language="php"
        />

        <h4 className="font-semibold mb-3 mt-6">2. Create the Controller:</h4>
        <CodeBlock code="php artisan make:controller Api/DeviceTokenController" language="bash" />

        <CodeBlock
          code={`<?php

namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use App\\Http\\Requests\\Auth\\RegisterFcmTokenRequest;

class DeviceTokenController extends Controller
{
    /**
     * Register or update FCM token for push notifications
     * Used by mobile apps (customers, delivery boys, etc.)
     */
    public function registerFcmToken(RegisterFcmTokenRequest $request)
    {
        try {
            $user = $request->user();

            $user->deviceTokens()->updateOrCreate(
                ['token' => $request->token],
                ['platform' => $request->platform]
            );

            return response()->json([
                'success' => true,
                'message' => __('FCM token registered successfully'),
            ]);
        } catch (\\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => __('Failed to register FCM token'),
            ], 500);
        }
    }
}`}
          language="php"
        />

        <h4 className="font-semibold mb-3 mt-6">3. Add the route:</h4>
        <CodeBlock
          code={`// routes/api.php

Route::middleware('auth:api')->post(
    '/device-tokens',
    [DeviceTokenController::class, 'registerFcmToken']
);`}
          language="php"
        />

        <h4 className="font-semibold mb-3 mt-6">4. When should mobile app call this?</h4>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-4">
          <li>After login</li>
          <li>On app startup</li>
          <li>When Firebase refreshes the token</li>
        </ul>

        <h5 className="font-medium mb-2">Example request:</h5>
        <CodeBlock
          code={`{
    "token": "fcm_device_token_here",
    "platform": "android"
}`}
          language="json"
        />
      </Section>

      {/* FCM Service Class */}
      <Section id="fcm-service" title="FCM Service Class" icon={Rocket}>
        <p className="mb-4">
          Now let's create a reusable service class that handles all FCM operations.
        </p>

        <h4 className="font-semibold mb-3">1. Create the service directory and file:</h4>
        <CodeBlock
          code={`mkdir -p app/Services/Firebase
touch app/Services/Firebase/FcmService.php`}
          language="bash"
        />

        <h4 className="font-semibold mb-3 mt-6">2. Implement the FcmService:</h4>
        <CodeBlock
          code={`<?php

declare(strict_types=1);

namespace App\\Services\\Firebase;

use Kreait\\Firebase\\Factory;
use Kreait\\Firebase\\Messaging;
use Kreait\\Firebase\\Messaging\\CloudMessage;
use Kreait\\Firebase\\Messaging\\Notification;

final class FcmService
{
    private Messaging $messaging;

    public function __construct()
    {
        $this->messaging = (new Factory)
            ->withServiceAccount(env('FCM_SERVICE_ACCOUNT_PATH'))
            ->withProjectId(env('FCM_PROJECT_ID'))
            ->createMessaging();
    }

    /**
     * Send notification to a single device token
     */
    public function send(string $token, string $title, string $body, array $data = []): bool
    {
        try {
            $message = CloudMessage::withTarget('token', $token)
                ->withNotification(Notification::create($title, $body))
                ->withData($data);

            $this->messaging->send($message);

            return true;
        } catch (\\Throwable $e) {
            return false;
        }
    }
}`}
          language="php"
        />

        <div className="mt-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <h5 className="font-medium text-blue-600 dark:text-blue-400 mb-2">
            How it works:
          </h5>
          <p className="text-sm text-muted-foreground">
            Firebase Cloud Messaging uses OAuth2 and service accounts. The Firebase PHP
            SDK handles authentication, token generation, and retries automatically. We
            only need to create messages and send them.
          </p>
        </div>
      </Section>

      {/* Test Notification */}
      <Section id="test-notification" title="Testing Notifications" icon={Bell}>
        <p className="mb-4">
          Let's create a test endpoint to verify everything works. The goal is simple:
          "Can Laravel send a push notification?"
        </p>

        <h4 className="font-semibold mb-3">Test Controller:</h4>
        <CodeBlock
          code={`<?php

namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use App\\Services\\Firebase\\FcmService;
use Illuminate\\Http\\Request;

class TestNotificationController extends Controller
{
    /**
     * Send a test push notification to the authenticated user
     */
    public function sendToMe(Request $request, FcmService $fcmService)
    {
        $user = $request->user();

        $deviceToken = $user->deviceTokens()->latest()->first();

        if (! $deviceToken) {
            return response()->json([
                'success' => false,
                'message' => 'You have no registered device token',
            ], 404);
        }

        $sent = $fcmService->send(
            $deviceToken->token,
            'Test Notification',
            'Push notifications are working!'
        );

        return response()->json([
            'success' => $sent,
            'message' => $sent
                ? 'Notification sent successfully'
                : 'Failed to send notification',
        ]);
    }
}`}
          language="php"
        />

        <h4 className="font-semibold mb-3 mt-6">Route:</h4>
        <CodeBlock
          code={`// routes/api.php

Route::middleware('auth:api')->get(
    '/test-notification',
    [TestNotificationController::class, 'sendToMe']
);`}
          language="php"
        />

        <h4 className="font-semibold mb-3 mt-6">How to test:</h4>
        <CodeBlock
          code={`GET /api/test-notification
Authorization: Bearer {access_token}`}
          language="http"
        />
      </Section>

      {/* Multiple Devices */}
      <Section id="multi-device" title="Sending to Multiple Devices" icon={Users}>
        <p className="mb-4">
          A user may log in from multiple phones, reinstall the app, or use both Android
          and iOS. We need to send notifications to <strong>all their devices</strong>.
        </p>

        <h4 className="font-semibold mb-3">Send to all user devices:</h4>
        <CodeBlock
          code={`<?php

namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use App\\Services\\Firebase\\FcmService;
use Illuminate\\Http\\Request;

class UserNotificationController extends Controller
{
    public function notifyMe(Request $request, FcmService $fcmService)
    {
        $user = $request->user();

        $tokens = $user->deviceTokens()->pluck('token');

        if ($tokens->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No registered devices found',
            ], 404);
        }

        foreach ($tokens as $token) {
            $fcmService->send(
                $token,
                'Hello!',
                'This notification was sent to all your devices'
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'Notification sent to all devices',
        ]);
    }
}`}
          language="php"
        />

        <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border">
          <h5 className="font-medium mb-2">Why we loop over tokens:</h5>
          <p className="text-sm text-muted-foreground">
            Firebase sends one message per device token. Even if it's one person using one
            app, each device must be notified separately. This is why we created the{" "}
            <code>device_tokens</code> table.
          </p>
        </div>
      </Section>

      {/* Admin Notifications */}
      <Section id="admin-notifications" title="Admin / System Notifications" icon={Shield}>
        <p className="mb-4">
          Sometimes the system needs to send notifications to other users (not the
          authenticated one). Examples include order status updates, delivery assignments,
          or admin announcements.
        </p>

        <CodeBlock
          code={`use App\\Models\\User;

public function notifyUser(int $userId, FcmService $fcmService)
{
    $user = User::findOrFail($userId);

    $tokens = $user->deviceTokens()->pluck('token');

    foreach ($tokens as $token) {
        $fcmService->send(
            $token,
            'Order Update',
            'Your order is now on the way'
        );
    }

    return response()->json([
        'success' => true,
        'message' => 'User notified successfully',
    ]);
}`}
          language="php"
        />

        <div className="mt-4 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <p className="text-sm text-muted-foreground">
            <strong className="text-yellow-600 dark:text-yellow-400">Security:</strong>{" "}
            This method should be called internally, protected by admin roles, and not
            exposed publicly.
          </p>
        </div>
      </Section>

      {/* Token Cleanup */}
      <Section id="token-cleanup" title="Handling Invalid Tokens" icon={Wrench}>
        <p className="mb-4">
          Sometimes Firebase rejects tokens because the app was uninstalled, notifications
          were disabled, or the token expired. We should clean up invalid tokens
          automatically.
        </p>

        <h4 className="font-semibold mb-3">Updated FcmService with cleanup:</h4>
        <CodeBlock
          code={`public function send(string $token, string $title, string $body): bool
{
    try {
        $message = CloudMessage::withTarget('token', $token)
            ->withNotification(Notification::create($title, $body));

        $this->messaging->send($message);

        return true;
    } catch (\\Kreait\\Firebase\\Exception\\Messaging\\NotFound $e) {
        // Token is invalid - remove it from database
        \\App\\Models\\DeviceToken::where('token', $token)->delete();

        return false;
    } catch (\\Throwable $e) {
        return false;
    }
}`}
          language="php"
        />

        <p className="mt-4 text-sm text-muted-foreground">
          This keeps your database clean automatically by removing tokens that no longer
          work.
        </p>
      </Section>

      {/* Best Practices */}
      <Section id="best-practices" title="Best Practices" icon={CheckCircle2} variant="info">
        <h4 className="font-semibold mb-3">When to send notifications:</h4>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-6">
          <li>Order status changed</li>
          <li>Delivery assigned</li>
          <li>Payment completed</li>
          <li>Admin announcement</li>
        </ul>

        <h4 className="font-semibold mb-3">Where to trigger notifications:</h4>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-6">
          <li>Services (business logic layer)</li>
          <li>Observers (for model events)</li>
          <li>Jobs / Queues (for async processing)</li>
        </ul>

        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 mb-6">
          <p className="text-sm">
            <strong className="text-red-600 dark:text-red-400">Never</strong> send push
            notifications directly from models. Keep your models clean.
          </p>
        </div>

        <h4 className="font-semibold mb-3">Performance Tips:</h4>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Use queues for sending many notifications</li>
          <li>Send asynchronously to avoid blocking API responses</li>
          <li>Consider rate limiting for bulk notifications</li>
        </ul>

        {/* Section Wrap-up */}
        <div className="mt-8 p-6 rounded-xl bg-green-500/10 border border-green-500/20">
          <h4 className="text-lg font-semibold text-green-600 dark:text-green-400 flex items-center gap-2 mb-4">
            <CheckCircle2 className="h-5 w-5" />
            Setup Complete!
          </h4>
          <p className="text-muted-foreground mb-4">At this point, you should have:</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Firebase service-account JSON downloaded and stored safely</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Credentials uploaded to production server</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>File excluded from Git using .gitignore</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>.env configured with absolute paths</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Device tokens stored per user in database</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Reusable FcmService class created</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Laravel ready to send push notifications!</span>
            </li>
          </ul>
        </div>
      </Section>
    </div>
  );
}

export default NotificationsPage;
