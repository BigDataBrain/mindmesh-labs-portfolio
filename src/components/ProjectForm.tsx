import React, { useState, useEffect } from 'react';
import { Project } from '../types';

interface ProjectFormProps {
  onSubmit: (projectData: Omit<Project, 'id' | 'created_at'> | Project) => Promise<void>;
  onClose: () => void;
  initialData?: Project | null;
}

const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <input
            {...props}
            className="bg-gray-50 dark:bg-[#010409] border border-gray-300 dark:border-[#30363d] text-gray-900 dark:text-gray-300 rounded-md block w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
    </div>
);

const TextAreaField: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <textarea
            {...props}
            rows={3}
            className="bg-gray-50 dark:bg-[#010409] border border-gray-300 dark:border-[#30363d] text-gray-900 dark:text-gray-300 rounded-md block w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
    </div>
);


const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, onClose, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    longDescription: '',
    projectUrl: '',
    technologies: '',
    complexity: 5.0,
    projectDate: new Date().toISOString().split('T')[0],
    isActive: true,
    avatar: 'robot-1',
    avatarColor: 'bg-teal-500',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        shortDescription: initialData.shortDescription,
        longDescription: initialData.longDescription,
        projectUrl: initialData.projectUrl,
        technologies: initialData.technologies.join(', '),
        complexity: initialData.complexity,
        projectDate: initialData.projectDate,
        isActive: initialData.isActive,
        avatar: initialData.avatar,
        avatarColor: initialData.avatarColor,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const projectPayload = {
      ...formData,
      complexity: parseFloat(String(formData.complexity)),
      technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
    };
    
    try {
        if (initialData) {
            await onSubmit({ ...initialData, ...projectPayload });
        } else {
            await onSubmit(projectPayload);
        }
    } finally {
        setIsSubmitting(false);
    }
  };

  const SelectField: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }> = ({ label, ...props }) => (
     <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <select {...props} className="bg-gray-50 dark:bg-[#010409] border border-gray-300 dark:border-[#30363d] text-gray-900 dark:text-gray-300 rounded-md block w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
     </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputField label="Project Name" name="name" value={formData.name} onChange={handleChange} required disabled={isSubmitting} />
      <InputField label="Project URL" name="projectUrl" type="url" value={formData.projectUrl} onChange={handleChange} required disabled={isSubmitting} />
      <TextAreaField label="Short Description" name="shortDescription" value={formData.shortDescription} onChange={handleChange} required maxLength={100} disabled={isSubmitting} />
      <TextAreaField label="Long Description" name="longDescription" value={formData.longDescription} onChange={handleChange} rows={5} disabled={isSubmitting} />
      <InputField label="Technologies (comma-separated)" name="technologies" value={formData.technologies} onChange={handleChange} disabled={isSubmitting} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Project Date" name="projectDate" type="date" value={formData.projectDate} onChange={handleChange} required disabled={isSubmitting} />
        <InputField label="Complexity (1.0 - 10.0)" name="complexity" type="number" value={String(formData.complexity)} onChange={e => setFormData({...formData, complexity: parseFloat(e.target.value)})} step="0.1" min="1" max="10" required disabled={isSubmitting} />
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField label="Avatar Icon" name="avatar" value={formData.avatar} onChange={handleChange} disabled={isSubmitting}>
                <option value="robot-1">Robot 1</option>
                <option value="robot-2">Robot 2</option>
                <option value="robot-3">Robot 3</option>
                <option value="robot-4">Robot 4</option>
                <option value="robot-5">Robot 5</option>
            </SelectField>
            <SelectField label="Avatar Color" name="avatarColor" value={formData.avatarColor} onChange={handleChange} disabled={isSubmitting}>
                <option value="bg-teal-500">Teal</option>
                <option value="bg-yellow-500">Yellow</option>
                <option value="bg-red-500">Red</option>
                <option value="bg-purple-500">Purple</option>
                <option value="bg-blue-500">Blue</option>
            </SelectField>
      </div>
      
       <div className="flex items-center">
        <input type="checkbox" id="isActive" name="isActive" checked={formData.isActive} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" disabled={isSubmitting} />
        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Publish this project (is active)</label>
      </div>
      
      <div className="flex justify-end space-x-4 pt-4">
        <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors" disabled={isSubmitting}>
          Cancel
        </button>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Project'}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;