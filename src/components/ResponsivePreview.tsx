
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Monitor, Tablet, Smartphone, RotateCcw } from 'lucide-react';
import { WebsiteConfig } from './WebsiteBuilder';
import { LandingTemplate } from './templates/LandingTemplate';
import { PortfolioTemplate } from './templates/PortfolioTemplate';
import { BlogTemplate } from './templates/BlogTemplate';
import { StoreTemplate } from './templates/StoreTemplate';

interface ResponsivePreviewProps {
  config: WebsiteConfig;
}

type DeviceType = 'desktop' | 'tablet' | 'mobile';

const deviceSizes = {
  desktop: { width: '100%', height: '100%' },
  tablet: { width: '768px', height: '1024px' },
  mobile: { width: '375px', height: '667px' }
};

export const ResponsivePreview: React.FC<ResponsivePreviewProps> = ({ config }) => {
  const [currentDevice, setCurrentDevice] = useState<DeviceType>('desktop');
  const [isRotated, setIsRotated] = useState(false);
  const [key, setKey] = useState(0);

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

  const handleDeviceChange = (device: DeviceType) => {
    setCurrentDevice(device);
    setIsRotated(false);
    setKey(prev => prev + 1);
  };

  const toggleRotation = () => {
    if (currentDevice !== 'desktop') {
      setIsRotated(!isRotated);
    }
  };

  const getDeviceStyle = () => {
    const size = deviceSizes[currentDevice];
    if (currentDevice === 'desktop') return { width: '100%', height: '100%' };
    
    const width = isRotated ? size.height : size.width;
    const height = isRotated ? size.width : size.height;
    
    return {
      width,
      height,
      maxWidth: '100%',
      maxHeight: 'calc(100vh - 200px)',
      margin: '0 auto',
      border: '8px solid #374151',
      borderRadius: currentDevice === 'mobile' ? '25px' : '12px',
      overflow: 'hidden'
    };
  };

  return (
    <div className="h-full w-full bg-slate-100 dark:bg-slate-900 flex flex-col">
      {/* Device Controls */}
      <div className="flex items-center justify-between p-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <Button
            variant={currentDevice === 'desktop' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleDeviceChange('desktop')}
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
            variant={currentDevice === 'tablet' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleDeviceChange('tablet')}
          >
            <Tablet className="w-4 h-4" />
          </Button>
          <Button
            variant={currentDevice === 'mobile' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleDeviceChange('mobile')}
          >
            <Smartphone className="w-4 h-4" />
          </Button>
          {currentDevice !== 'desktop' && (
            <Button
              variant="outline"
              size="sm"
              onClick={toggleRotation}
              className="ml-2"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          )}
        </div>
        
        <div className="text-sm text-slate-600 dark:text-slate-400 capitalize">
          {currentDevice} {isRotated && '(Landscape)'}
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
        <div style={getDeviceStyle()} className="shadow-2xl">
          <div 
            key={key}
            className={`h-full w-full transition-all duration-500 ${config.theme === 'dark' ? 'dark' : ''}`}
            style={{
              fontFamily: config.font,
              '--primary-color': config.primaryColor,
            } as React.CSSProperties}
          >
            <div className="h-full overflow-auto scroll-smooth">
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
