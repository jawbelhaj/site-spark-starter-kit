
import React from 'react';
import { WebsiteConfig } from '../WebsiteBuilder';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LandingTemplateProps {
  config: WebsiteConfig;
}

export const LandingTemplate: React.FC<LandingTemplateProps> = ({ config }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl" style={{ color: config.primaryColor }}>
              {config.title}
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                Home
              </a>
              <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                Features
              </a>
              <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                About
              </a>
              <a href="#contact" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                Contact
              </a>
            </div>
            <Button size="sm" style={{ backgroundColor: config.primaryColor }}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="animate-fade-in">
                  ✨ New Release
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight animate-fade-in">
                  {config.content.hero.title}
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-300 animate-fade-in">
                  {config.content.hero.subtitle}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
                <Button size="lg" style={{ backgroundColor: config.primaryColor }}>
                  Start Building
                </Button>
                <Button variant="outline" size="lg">
                  View Demo
                </Button>
              </div>
              <div className="flex items-center gap-8 text-sm text-slate-600 dark:text-slate-400 animate-fade-in">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Free to use</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>No credit card</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>24/7 support</span>
                </div>
              </div>
            </div>
            <div className="animate-fade-in">
              <div className="relative">
                <img
                  src={config.content.hero.image}
                  alt="Hero"
                  className="rounded-2xl shadow-2xl w-full hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Everything you need to build amazing websites
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {config.content.features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${config.primaryColor}20` }}
                  >
                    <div className="text-2xl" style={{ color: config.primaryColor }}>
                      📱
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-8">
            About Us
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            {config.content.about}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Ready to start your project? Let's talk!
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl mb-4">📧</div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-slate-600 dark:text-slate-300">{config.content.contact.email}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl mb-4">📞</div>
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-slate-600 dark:text-slate-300">{config.content.contact.phone}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl mb-4">📍</div>
                <h3 className="font-semibold mb-2">Address</h3>
                <p className="text-slate-600 dark:text-slate-300">{config.content.contact.address}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="font-bold text-xl mb-4" style={{ color: config.primaryColor }}>
            {config.title}
          </div>
          <p className="text-slate-400 mb-8">
            {config.description}
          </p>
          <div className="border-t border-slate-800 pt-8">
            <p className="text-slate-500">
              © 2024 {config.title}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
