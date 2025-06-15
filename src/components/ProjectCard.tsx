
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  config: any;
  lastModified: Date;
  thumbnail?: string;
}

interface ProjectCardProps {
  project: Project;
  onLoad: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onLoad,
  onDelete
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer group">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base line-clamp-1">{project.name}</CardTitle>
            <CardDescription className="text-sm line-clamp-2">
              {project.description}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(project.id);
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="capitalize">
            {project.config.template}
          </Badge>
          <span className="text-xs text-slate-500">
            {project.lastModified.toLocaleDateString()}
          </span>
        </div>
        <div className="space-y-2">
          <div className="text-xs text-slate-600 dark:text-slate-400">
            <strong>Title:</strong> {project.config.title}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">
            <strong>Theme:</strong> {project.config.theme}
          </div>
        </div>
        <Button 
          onClick={() => onLoad(project)}
          className="w-full mt-3"
          size="sm"
        >
          Load Project
        </Button>
      </CardContent>
    </Card>
  );
};
