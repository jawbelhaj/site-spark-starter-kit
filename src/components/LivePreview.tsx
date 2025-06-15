
import React from 'react';
import { WebsiteConfig } from './WebsiteBuilder';
import { LandingTemplate } from './templates/LandingTemplate';
import { PortfolioTemplate } from './templates/PortfolioTemplate';
import { BlogTemplate } from './templates/BlogTemplate';
import { StoreTemplate } from './templates/StoreTemplate';

interface LivePreviewProps {
  config: WebsiteConfig;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ config }) => {
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
    <div className="h-full w-full overflow-auto bg-white dark:bg-slate-900">
      <div 
        className={`min-h-full transition-all duration-300 ${config.theme === 'dark' ? 'dark' : ''}`}
        style={{
          fontFamily: config.font,
          '--primary-color': config.primaryColor
        } as React.CSSProperties}
      >
        {renderTemplate()}
      </div>
    </div>
  );
};
