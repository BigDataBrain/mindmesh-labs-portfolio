import React, { useMemo } from 'react';
import { Project } from '../types';
import { CollectionIcon, CheckCircleIcon, XCircleIcon } from './Icons';

interface StatsSummaryProps {
  projects: Project[];
}

const StatCard: React.FC<{ title: string; value: number; icon: React.ReactNode; color: string; }> = ({ title, value, icon, color }) => (
    <div className="bg-white dark:bg-[#161B22] border border-gray-200 dark:border-[#30363d] rounded-lg p-6 flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
        </div>
    </div>
);

const StatsSummary: React.FC<StatsSummaryProps> = ({ projects }) => {
    const stats = useMemo(() => {
        const total = projects.length;
        const active = projects.filter(p => p.isActive).length;
        const inactive = total - active;
        return { total, active, inactive };
    }, [projects]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
                title="Total Projects" 
                value={stats.total} 
                icon={<CollectionIcon className="w-6 h-6 text-white" />}
                color="bg-blue-500"
            />
            <StatCard 
                title="Active Projects" 
                value={stats.active} 
                icon={<CheckCircleIcon className="w-6 h-6 text-white" />}
                color="bg-green-500"
            />
            <StatCard 
                title="Inactive Projects" 
                value={stats.inactive} 
                icon={<XCircleIcon className="w-6 h-6 text-white" />}
                color="bg-gray-500"
            />
        </div>
    );
};

export default StatsSummary;