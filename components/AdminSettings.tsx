import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Settings } from '../types';

interface AdminSettingsProps {
    initialSettings: Settings;
    onSettingsUpdate: () => Promise<void> | void;
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
            rows={4}
            className="bg-gray-50 dark:bg-[#010409] border border-gray-300 dark:border-[#30363d] text-gray-900 dark:text-gray-300 rounded-md block w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
    </div>
);


const AdminSettings: React.FC<AdminSettingsProps> = ({ initialSettings, onSettingsUpdate }) => {
    const [settings, setSettings] = useState<Settings>(initialSettings);
    const [saveStatus, setSaveStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setSettings(initialSettings);
    }, [initialSettings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSettings(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setSaveStatus('');
        try {
            const { id, ...settingsToUpdate } = settings;
            await api.updateSettings(settingsToUpdate);
            await onSettingsUpdate();
            setSaveStatus('Settings saved successfully!');
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            setSaveStatus(`Error saving settings: ${message}`);
            console.error(error);
        } finally {
            setIsLoading(false);
            setTimeout(() => setSaveStatus(''), 4000);
        }
    };

    return (
        <form onSubmit={handleSave} className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Branding &amp; Content</h3>
            <InputField label="Site Title" name="siteTitle" value={settings.siteTitle} onChange={handleChange} disabled={isLoading} />
            <InputField label="Site Tagline" name="siteTagline" value={settings.siteTagline} onChange={handleChange} disabled={isLoading} />
            <TextAreaField label="About Me Section" name="aboutMe" value={settings.aboutMe} onChange={handleChange} disabled={isLoading} />
            
            <div className="border-t border-gray-200 dark:border-[#30363d] pt-6">
                 <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Contact Form</h3>
                <InputField label="Destination Email" name="contactEmail" type="email" value={settings.contactEmail} onChange={handleChange} disabled={isLoading} />
            </div>

            <div className="flex justify-end items-center space-x-4">
                {saveStatus && <p className={`${saveStatus.includes('Error') ? 'text-red-500' : 'text-green-500'} text-sm`}>{saveStatus}</p>}
                <button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed">
                    {isLoading ? 'Saving...' : 'Save Settings'}
                </button>
            </div>
        </form>
    );
};

export default AdminSettings;