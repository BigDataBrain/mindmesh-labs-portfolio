import React from 'react';
import type { Project } from '../types';
import { ArrowRightIcon, Robot1Icon, Robot2Icon, Robot3Icon, Robot4Icon, Robot5Icon, CodeIcon, EditIcon, DeleteIcon } from './Icons';
import StatusIndicator from './StatusIndicator';

interface ProjectCardProps {
  project: Project;
  mode: 'public' | 'admin';
  onToggleStatus?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onViewDetails?: (project: Project) => void;
  onSeeMore?: (project: Project) => void;
}

const ProjectAvatar: React.FC<{ avatar: string; color: string }> = ({ avatar, color }) => {
  const iconProps = { className: "w-6 h-6 text-white" };
  const AvatarIcon = () => {
    switch (avatar) {
      case 'robot-1': return <Robot1Icon {...iconProps} />;
      case 'robot-2': return <Robot2Icon {...iconProps} />;
      case 'robot-3': return <Robot3Icon {...iconProps} />;
      case 'robot-4': return <Robot4Icon {...iconProps} />;
      case 'robot-5': return <Robot5Icon {...iconProps} />;
      default: return null;
    }
  };
  return (
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
      <AvatarIcon />
    </div>
  );
};

const TechPill: React.FC<{ tech: string }> = ({ tech }) => {
  return (
    <div className="flex items-center space-x-1.5 border border-gray-300 dark:border-[#30363d] bg-gray-100 dark:bg-[#0d1117] rounded-full px-2.5 py-1 text-xs text-gray-700 dark:text-gray-300">
      <CodeIcon className="w-3 h-3" />
      <span>{tech}</span>
    </div>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, mode, onToggleStatus, onEdit, onDelete, onViewDetails, onSeeMore }) => {

  const getBarColor = (complexity: number): string => {
    if (complexity >= 8.0) return 'bg-green-500';
    if (complexity >= 7.0) return 'bg-yellow-400';
    if (complexity >= 6.0) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${project.name}"?`)) {
        onDelete?.();
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.();
  };
  
  const handleViewDetailsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onViewDetails?.(project);
  };

  const handleSeeMoreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSeeMore?.(project);
  }

  return (
    <div className="holographic-card bg-white dark:bg-[#161B22] border border-gray-200 dark:border-[#30363d] rounded-lg p-6 flex flex-col justify-between min-h-[420px] transition-shadow">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-4">
            <ProjectAvatar avatar={project.avatar} color={project.avatarColor} />
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{project.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(project.projectDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
            </div>
          </div>
          {mode === 'admin' && (
             <div className="flex items-center space-x-1">
                <button onClick={handleEditClick} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-1 rounded-full hover:bg-gray-200 dark:hover:bg-[#30363d] transition-colors" aria-label="Edit project">
                    <EditIcon className="w-5 h-5" />
                </button>
                <button onClick={handleDeleteClick} className="text-gray-500 dark:text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-[#30363d] transition-colors" aria-label="Delete project">
                    <DeleteIcon className="w-5 h-5" />
                </button>
            </div>
          )}
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 min-h-[40px]">{project.shortDescription}</p>
        <button onClick={handleSeeMoreClick} className="text-blue-500 hover:underline text-sm mb-4 text-left">See More...</button>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.slice(0, 4).map(tech => <TechPill key={tech} tech={tech} />)}
        </div>
        
        <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">Complexity</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{project.complexity.toFixed(1)}</span>
            </div>
             <div className="w-full bg-gray-200 dark:bg-[#30363d] rounded-full h-2">
                <div 
                    className={`h-2 rounded-full ${getBarColor(project.complexity)}`} 
                    style={{ width: `${project.complexity * 10}%` }}
                ></div>
            </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-[#30363d] mt-auto pt-4 flex justify-between items-center">
        {mode === 'admin' && onToggleStatus ? (
            <StatusIndicator isActive={project.isActive} onToggle={onToggleStatus} />
        ) : (
             <div className={`flex items-center space-x-2 text-sm ${project.isActive ? 'text-blue-500' : 'text-gray-500'}`}>
                <span className={`h-2 w-2 rounded-full ${project.isActive ? 'bg-blue-500' : 'bg-gray-500'}`}></span>
                <span>{project.isActive ? 'Active' : 'Inactive'}</span>
            </div>
        )}
        <button onClick={handleViewDetailsClick} className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
          <span>View Details</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;