
import React, { useState, useEffect } from 'react';
import { WebsiteConfig } from './WebsiteBuilder';
import { LandingTemplate } from './templates/LandingTemplate';
import { PortfolioTemplate } from './templates/PortfolioTemplate';
import { BlogTemplate } from './templates/BlogTemplate';
import { StoreTemplate } from './templates/StoreTemplate';

interface LivePreviewProps {
  config: WebsiteConfig;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ config }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      setKey(prev => prev + 1);
    }, 300);

    return () => clearTimeout(timer);
  }, [config.template]);

  const renderTemplate = () => {
    const templateProps = { config };
    
    switch (config.template) {
      case 'landing':
        return <LandingTemplate {...templateProps} />;
      case 'portfolio':
        return <PortfolioTemplate {...templateProps} />;
      case 'blog':
        return <BlogTemplate {...templateProps} />;
      case 'store':
        return <StoreTemplate {...templateProps} />;
      default:
        return <LandingTemplate {...templateProps} />;
    }
  };

  return (
    <div className="h-full w-full relative overflow-hidden">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-800 rounded-full"></div>
              <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 animate-pulse">
              Loading preview...
            </div>
          </div>
        </div>
      )}

      {/* Preview Frame */}
      <div className="h-full w-full bg-white dark:bg-slate-900 relative">
        <div className="absolute inset-0 p-4">
          <div className="h-full w-full bg-white dark:bg-slate-900 rounded-lg shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
            <div 
              key={key}
              className={`h-full w-full transition-all duration-500 ${config.theme === 'dark' ? 'dark' : ''}`}
              style={{
                fontFamily: config.font,
                '--primary-color': config.primaryColor,
                opacity: isLoading ? 0 : 1,
                transform: isLoading ? 'scale(0.95)' : 'scale(1)',
              } as React.CSSProperties}
            >
              <div className="h-full overflow-auto scroll-smooth">
                {renderTemplate()}
              </div>
            </div>
          </div>
        </div>

        {/* Preview Controls */}
        <div className="absolute top-8 right-8 flex gap-2 z-40">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Live</span>
            </div>
          </div>
        </div>

        {/* Responsive Breakpoint Indicator */}
        <div className="absolute bottom-8 left-8 z-40">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-slate-600 dark:text-slate-400">Desktop</span>
              </div>
              <div className="text-slate-300 dark:text-slate-600">•</div>
              <div className="text-slate-500 capitalize">{config.template}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
