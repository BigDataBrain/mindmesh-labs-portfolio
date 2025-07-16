import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Settings } from '../types';

interface AdminSettingsProps {
    onSettingsUpdate: () => void;
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


const AdminSettings: React.FC<AdminSettingsProps> = ({ onSettingsUpdate }) => {
    const [settings, setSettings] = useState<Settings>(api.getSettings());
    const [saveStatus, setSaveStatus] = useState('');

    useEffect(() => {
        setSettings(api.getSettings());
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSettings(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        api.updateSettings(settings);
        onSettingsUpdate();
        setSaveStatus('Settings saved successfully!');
        setTimeout(() => setSaveStatus(''), 3000);
    };

    return (
        <form onSubmit={handleSave} className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Branding &amp; Content</h3>
            <InputField label="Site Title" name="siteTitle" value={settings.siteTitle} onChange={handleChange} />
            <InputField label="Site Tagline" name="siteTagline" value={settings.siteTagline} onChange={handleChange} />
            <TextAreaField label="About Me Section" name="aboutMe" value={settings.aboutMe} onChange={handleChange} />
            
            <div className="border-t border-gray-200 dark:border-[#30363d] pt-6">
                 <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Contact Form</h3>
                <InputField label="Destination Email" name="contactEmail" type="email" value={settings.contactEmail} onChange={handleChange} />
            </div>

            <div className="flex justify-end items-center space-x-4">
                {saveStatus && <p className="text-green-500 text-sm">{saveStatus}</p>}
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm transition-colors">
                    Save Settings
                </button>
            </div>
        </form>
    );
};

export default AdminSettings;
