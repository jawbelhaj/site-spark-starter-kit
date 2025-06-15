
import React from 'react';
import { ResponsivePreview } from './ResponsivePreview';
import { WebsiteConfig } from './WebsiteBuilder';

interface LivePreviewProps {
  config: WebsiteConfig;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ config }) => {
  return <ResponsivePreview config={config} />;
};
