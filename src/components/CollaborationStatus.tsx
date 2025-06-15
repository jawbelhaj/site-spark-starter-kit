
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Wifi, WifiOff, Circle } from 'lucide-react';

interface Collaborator {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'editing' | 'viewing';
  lastSeen: Date;
}

interface CollaborationStatusProps {
  isOnline: boolean;
}

export const CollaborationStatus: React.FC<CollaborationStatusProps> = ({ isOnline }) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    {
      id: '1',
      name: 'You',
      status: 'editing',
      lastSeen: new Date()
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      status: 'viewing',
      lastSeen: new Date(Date.now() - 5 * 60 * 1000) // 5 minutes ago
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'editing': return 'bg-green-500';
      case 'viewing': return 'bg-blue-500';
      case 'online': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'editing': return 'Editing';
      case 'viewing': return 'Viewing';
      case 'online': return 'Online';
      default: return 'Offline';
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isOnline ? (
              <Wifi className="w-4 h-4 text-green-600" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-600" />
            )}
            <span className="text-sm font-medium">
              {isOnline ? 'Connected' : 'Offline'}
            </span>
            <Badge variant="secondary" className="text-xs">
              {collaborators.length} {collaborators.length === 1 ? 'person' : 'people'}
            </Badge>
          </div>
          
          <div className="flex items-center gap-1">
            {collaborators.slice(0, 3).map((collaborator) => (
              <div key={collaborator.id} className="relative">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={collaborator.avatar} />
                  <AvatarFallback className="text-xs">
                    {collaborator.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Circle 
                  className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 ${getStatusColor(collaborator.status)} border border-white dark:border-slate-800 rounded-full`}
                  fill="currentColor"
                />
              </div>
            ))}
            {collaborators.length > 3 && (
              <Badge variant="outline" className="text-xs ml-1">
                +{collaborators.length - 3}
              </Badge>
            )}
          </div>
        </div>
        
        {collaborators.length > 1 && (
          <div className="mt-2 pt-2 border-t">
            <div className="text-xs text-slate-500">
              {collaborators.find(c => c.status === 'editing' && c.id !== '1')?.name || 'Sarah Wilson'} is editing the hero section
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
