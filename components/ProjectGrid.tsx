import React from 'react';
import ProjectCard from './ProjectCard';
import { Project } from '../types';
import CreateProjectCard from './CreateProjectCard';

interface ProjectGridProps {
    projects: Project[];
    mode: 'public' | 'admin';
    onToggleStatus?: (projectId: number) => void;
    onEditProject?: (project: Project) => void;
    onDeleteProject?: (projectId: number) => void;
    onCreateProject?: () => void;
    onViewDetails?: (project: Project) => void;
    onSeeMore?: (project: Project) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, mode, onToggleStatus, onEditProject, onDeleteProject, onCreateProject, onViewDetails, onSeeMore }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {mode === 'admin' && onCreateProject && <CreateProjectCard onClick={onCreateProject} />}
      {projects.map((project) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          mode={mode}
          onToggleStatus={onToggleStatus ? () => onToggleStatus(project.id) : undefined}
          onEdit={onEditProject ? () => onEditProject(project) : undefined}
          onDelete={onDeleteProject ? () => onDeleteProject(project.id) : undefined}
          onViewDetails={onViewDetails}
          onSeeMore={onSeeMore}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;
