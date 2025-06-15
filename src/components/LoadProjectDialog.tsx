
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FolderOpen } from 'lucide-react';
import { ProjectCard } from './ProjectCard';

interface Project {
  id: string;
  name: string;
  description: string;
  config: any;
  lastModified: Date;
  thumbnail?: string;
}

interface LoadProjectDialogProps {
  projects: Project[];
  onLoad: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

export const LoadProjectDialog: React.FC<LoadProjectDialogProps> = ({
  projects,
  onLoad,
  onDelete
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLoad = (project: Project) => {
    onLoad(project);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <FolderOpen className="w-4 h-4 mr-2" />
          Load
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Your Projects</DialogTitle>
          <DialogDescription>
            Load a previously saved project or start fresh.
          </DialogDescription>
        </DialogHeader>
        
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <FolderOpen className="w-12 h-12 mx-auto text-slate-400 mb-4" />
            <p className="text-slate-600 dark:text-slate-400">No saved projects yet</p>
            <p className="text-sm text-slate-500">Create and save your first project to see it here</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onLoad={handleLoad}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
