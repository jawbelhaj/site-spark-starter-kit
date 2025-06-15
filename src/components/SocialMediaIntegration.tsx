
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SocialPlatform {
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  url: string;
  enabled: boolean;
  placeholder: string;
}

interface SocialMediaIntegrationProps {
  onUpdateSocials: (socials: Record<string, string>) => void;
}

export const SocialMediaIntegration: React.FC<SocialMediaIntegrationProps> = ({
  onUpdateSocials
}) => {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600',
      url: '',
      enabled: false,
      placeholder: 'https://facebook.com/yourpage'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500',
      url: '',
      enabled: false,
      placeholder: 'https://twitter.com/yourusername'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-pink-600',
      url: '',
      enabled: false,
      placeholder: 'https://instagram.com/yourusername'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700',
      url: '',
      enabled: false,
      placeholder: 'https://linkedin.com/in/yourprofile'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      color: 'bg-red-600',
      url: '',
      enabled: false,
      placeholder: 'https://youtube.com/yourchannel'
    }
  ]);

  const { toast } = useToast();

  const updatePlatform = (index: number, updates: Partial<SocialPlatform>) => {
    const updatedPlatforms = platforms.map((platform, i) => 
      i === index ? { ...platform, ...updates } : platform
    );
    setPlatforms(updatedPlatforms);

    // Update parent component
    const enabledSocials = updatedPlatforms
      .filter(p => p.enabled && p.url)
      .reduce((acc, p) => ({ ...acc, [p.name.toLowerCase()]: p.url }), {});
    
    onUpdateSocials(enabledSocials);
  };

  const generateSocialPreview = () => {
    const enabledPlatforms = platforms.filter(p => p.enabled && p.url);
    
    if (enabledPlatforms.length === 0) {
      toast({
        title: "No Social Links",
        description: "Enable and add URLs to see the preview.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Social Links Updated!",
      description: `${enabledPlatforms.length} social platform(s) configured.`,
    });
  };

  const enabledCount = platforms.filter(p => p.enabled && p.url).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                <ExternalLink className="w-3 h-3 text-white" />
              </div>
              Social Media Integration
            </CardTitle>
            <CardDescription>
              Connect your social media accounts to your website
            </CardDescription>
          </div>
          {enabledCount > 0 && (
            <Badge variant="default">
              {enabledCount} Connected
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {platforms.map((platform, index) => {
          const IconComponent = platform.icon;
          return (
            <div key={platform.name} className="space-y-3 p-3 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 ${platform.color} rounded-lg flex items-center justify-center`}>
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{platform.name}</div>
                    {platform.enabled && platform.url && (
                      <div className="text-xs text-slate-500">Connected</div>
                    )}
                  </div>
                </div>
                <Switch
                  checked={platform.enabled}
                  onCheckedChange={(enabled) => updatePlatform(index, { enabled })}
                />
              </div>
              
              {platform.enabled && (
                <div className="space-y-2">
                  <Label htmlFor={`${platform.name}-url`} className="text-xs">
                    Profile URL
                  </Label>
                  <Input
                    id={`${platform.name}-url`}
                    value={platform.url}
                    onChange={(e) => updatePlatform(index, { url: e.target.value })}
                    placeholder={platform.placeholder}
                    className="text-sm"
                  />
                </div>
              )}
            </div>
          );
        })}

        <div className="pt-3 border-t">
          <Button 
            onClick={generateSocialPreview}
            className="w-full"
            variant="outline"
          >
            Update Social Links
          </Button>
        </div>

        {enabledCount > 0 && (
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
            <div className="text-sm font-medium mb-2">Preview:</div>
            <div className="flex gap-2">
              {platforms
                .filter(p => p.enabled && p.url)
                .map((platform) => {
                  const IconComponent = platform.icon;
                  return (
                    <div
                      key={platform.name}
                      className={`w-8 h-8 ${platform.color} rounded-full flex items-center justify-center`}
                    >
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
