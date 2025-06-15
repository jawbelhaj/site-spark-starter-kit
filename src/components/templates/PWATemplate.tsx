
import React from 'react';
import { WebsiteConfig } from '../WebsiteBuilder';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PWATemplateProps {
  config: WebsiteConfig;
}

export const PWATemplate: React.FC<PWATemplateProps> = ({ config }) => {
  const installPWA = () => {
    alert('PWA installation would be triggered here in a real implementation');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </div>
              MyApp
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Home</a>
              <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Features</a>
              <a href="#offline" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Offline</a>
              <a href="#download" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Download</a>
            </div>
            <Button size="sm" style={{ backgroundColor: config.primaryColor }} onClick={installPWA}>
              Install App
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="space-y-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mx-auto flex items-center justify-center shadow-2xl">
              <span className="text-3xl text-white font-bold">A</span>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white">
                Your Offline-First App
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Experience the power of a Progressive Web App. Install once, use everywhere - even when you're offline.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Badge variant="secondary">📱 Installable</Badge>
              <Badge variant="secondary">🔌 Offline Ready</Badge>
              <Badge variant="secondary">🔔 Push Notifications</Badge>
              <Badge variant="secondary">⚡ Fast Loading</Badge>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" style={{ backgroundColor: config.primaryColor }} onClick={installPWA}>
                📲 Install App
              </Button>
              <Button variant="outline" size="lg">
                Try in Browser
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              PWA Features
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Modern web app capabilities that work like native apps
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Offline Support',
                description: 'Works perfectly even without internet connection',
                icon: '🔌',
                detail: 'Service workers cache your data and content'
              },
              {
                title: 'App-like Experience',
                description: 'Install on your device like a native app',
                icon: '📱',
                detail: 'Add to home screen on mobile and desktop'
              },
              {
                title: 'Push Notifications',
                description: 'Stay updated with real-time notifications',
                icon: '🔔',
                detail: 'Receive updates even when app is closed'
              },
              {
                title: 'Fast Loading',
                description: 'Lightning-fast performance and startup',
                icon: '⚡',
                detail: 'Instant loading with smart caching'
              },
              {
                title: 'Secure HTTPS',
                description: 'Always secure with HTTPS encryption',
                icon: '🔒',
                detail: 'Enhanced security for all communications'
              },
              {
                title: 'Cross-Platform',
                description: 'Works on any device with a browser',
                icon: '🌐',
                detail: 'iOS, Android, Windows, macOS, Linux'
              }
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="text-3xl mb-2">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 mb-2">
                    {feature.description}
                  </p>
                  <p className="text-sm text-slate-500">
                    {feature.detail}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Offline Demo Section */}
      <section id="offline" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-8">
            Try It Offline
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-12">
            Disconnect your internet and see how the app continues to work seamlessly
          </p>
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700">
            <div className="space-y-6">
              <div className="text-4xl">📡</div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Connection Status: Online
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Your data is automatically cached for offline use. Try disconnecting to see the magic!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button style={{ backgroundColor: config.primaryColor }}>
                  Test Offline Mode
                </Button>
                <Button variant="outline">
                  View Cached Data
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Installation Section */}
      <section id="download" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Install in Seconds
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              No app store needed - install directly from your browser
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📱</span>
                  Mobile Installation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="font-semibold">1. Open in Browser</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Visit this site in Safari or Chrome</p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">2. Tap Share Button</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Look for the share icon in your browser</p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">3. Add to Home Screen</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Select "Add to Home Screen" option</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">💻</span>
                  Desktop Installation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="font-semibold">1. Look for Install Button</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Click the install icon in your browser bar</p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">2. Confirm Installation</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Click "Install" in the popup dialog</p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">3. Launch from Desktop</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Find the app icon on your desktop or start menu</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12">
            <Button size="lg" style={{ backgroundColor: config.primaryColor }} onClick={installPWA}>
              📲 Install Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="font-bold text-xl mb-4 flex items-center justify-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            MyApp
          </div>
          <p className="text-slate-400 mb-8">
            Experience the future of web applications with PWA technology.
          </p>
          <div className="border-t border-slate-800 pt-8">
            <p className="text-slate-500">
              © 2024 MyApp. Progressive Web App powered by modern web standards.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
