import React from 'react';
import Modal from './Modal';
import { Project } from '../types';
import ProjectQABot from './ProjectQABot';
import { SparklesIcon } from './Icons';

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ isOpen, onClose, project }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={project.name}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Project Overview</h3>
          <p className="text-gray-700 dark:text-gray-300" style={{ whiteSpace: 'pre-wrap' }}>{project.longDescription || 'No detailed description available.'}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Technologies Used</h3>
          <p className="text-gray-700 dark:text-gray-300">{project.technologies.join(', ')}</p>
        </div>

        <div className="border-t border-gray-200 dark:border-[#30363d] my-4"></div>

        <div>
            <div className="flex items-center space-x-2 mb-4">
                <SparklesIcon className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Ask AI About This Project</h3>
            </div>
            <ProjectQABot project={project} />
        </div>

      </div>
    </Modal>
  );
};

export default ProjectDetailModal;