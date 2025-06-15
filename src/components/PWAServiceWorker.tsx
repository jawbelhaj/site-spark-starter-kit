
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, Download, Smartphone, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PWAServiceWorkerProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export const PWAServiceWorker: React.FC<PWAServiceWorkerProps> = ({ isEnabled, onToggle }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [cacheStatus, setCacheStatus] = useState('checking');
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Back Online",
        description: "Your connection has been restored.",
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "You're Offline",
        description: "The app will continue to work with cached content.",
      });
    };

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check service worker registration
    if ('serviceWorker' in navigator && isEnabled) {
      registerServiceWorker();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [isEnabled, toast]);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
      
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
              setCacheStatus('updated');
              toast({
                title: "App Updated",
                description: "A new version is available. Refresh to update.",
              });
            }
          });
        }
      });

      setCacheStatus('cached');
    } catch (error) {
      console.error('SW registration failed: ', error);
      setCacheStatus('error');
    }
  };

  const installPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        toast({
          title: "App Installed!",
          description: "You can now use the app from your home screen.",
        });
      }
      
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  const generateServiceWorkerCode = () => {
    return `
// Service Worker for PWA
const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/manifest.json',
  '/offline.html'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        return fetch(event.request).catch(() => {
          // Return offline page for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
        });
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
    `.trim();
  };

  const generateManifest = () => {
    return {
      "name": "My PWA App",
      "short_name": "PWA App",
      "description": "A Progressive Web App built with modern standards",
      "start_url": "/",
      "display": "standalone",
      "background_color": "#ffffff",
      "theme_color": "#3b82f6",
      "icons": [
        {
          "src": "/icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "/icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ]
    };
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Progressive Web App
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Configure PWA features and offline capabilities
        </p>
      </div>

      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            {isOnline ? (
              <Wifi className="w-4 h-4 text-green-500" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-500" />
            )}
            Connection Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm">
              {isOnline ? 'Online' : 'Offline'}
            </span>
            <Badge variant={isOnline ? 'default' : 'secondary'}>
              {isOnline ? 'Connected' : 'Cached Content Available'}
            </Badge>
          </div>
          {!isOnline && (
            <p className="text-xs text-slate-500 mt-2">
              You can continue browsing with cached content
            </p>
          )}
        </CardContent>
      </Card>

      {/* Installation */}
      {isInstallable && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Smartphone className="w-4 h-4" />
              Install App
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Install this app on your device for a native-like experience
            </p>
            <Button onClick={installPWA} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Install App
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Cache Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Globe className="w-4 h-4" />
            Cache Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Service Worker</span>
            <Badge variant={isEnabled ? 'default' : 'secondary'}>
              {isEnabled ? 'Active' : 'Disabled'}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Content Cache</span>
            <Badge variant={cacheStatus === 'cached' ? 'default' : 'secondary'}>
              {cacheStatus === 'cached' ? 'Cached' : 'Loading...'}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Offline Support</span>
            <Badge variant={isEnabled ? 'default' : 'secondary'}>
              {isEnabled ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* PWA Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">PWA Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
            <h4 className="text-sm font-medium mb-2">Service Worker Code:</h4>
            <pre className="text-xs text-slate-700 dark:text-slate-300 overflow-x-auto max-h-32">
              {generateServiceWorkerCode()}
            </pre>
          </div>
          
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
            <h4 className="text-sm font-medium mb-2">Manifest.json:</h4>
            <pre className="text-xs text-slate-700 dark:text-slate-300 overflow-x-auto">
              {JSON.stringify(generateManifest(), null, 2)}
            </pre>
          </div>

          <Button 
            onClick={() => onToggle(!isEnabled)} 
            variant={isEnabled ? 'destructive' : 'default'}
            className="w-full"
          >
            {isEnabled ? 'Disable PWA Features' : 'Enable PWA Features'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
