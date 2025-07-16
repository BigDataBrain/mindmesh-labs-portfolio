import React, { useState } from 'react';
import { api } from '../services/api';

const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string, error?: string }> = ({ label, error, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <input
            {...props}
            className={`bg-gray-50 dark:bg-[#010409] border ${error ? 'border-red-500' : 'border-gray-300 dark:border-[#30363d]'} text-gray-900 dark:text-gray-300 rounded-md block w-full px-3 py-2 focus:outline-none focus:ring-2 ${error ? 'ring-red-500' : 'focus:ring-blue-500'} focus:border-transparent`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

const CredentialsSettings: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newSecretKey, setNewSecretKey] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!currentPassword) newErrors.currentPassword = 'Current password is required.';
        if (!newUsername) newErrors.newUsername = 'New username is required.';
        if (newPassword && newPassword.length < 8) newErrors.newPassword = 'New password must be at least 8 characters.';
        if (newSecretKey && newSecretKey.length !== 17) newErrors.newSecretKey = 'Secret key must be 15 digits plus dashes (XXX-XXXX-XXXX).';

        if (!newPassword && !newSecretKey && !newUsername) {
            newErrors.general = 'You must provide at least one field to update.';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus(null);
        if (!validate()) return;
        
        const currentCreds = api.getCredentials();

        if (currentPassword !== currentCreds.password) {
            setErrors({ ...errors, currentPassword: 'The current password you entered is incorrect.' });
            return;
        }

        const updatedCreds = {
            username: newUsername || currentCreds.username,
            password: newPassword || currentCreds.password,
            secretKey: newSecretKey || currentCreds.secretKey,
        };

        api.updateCredentials(updatedCreds);
        setStatus({type: 'success', message: 'Credentials updated successfully. You may need to log in again with your new credentials.'});
        
        // Clear fields
        setCurrentPassword('');
        setNewUsername('');
        setNewPassword('');
        setNewSecretKey('');
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
             <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Update Your Credentials</h3>
             <p className="text-sm text-gray-500 dark:text-gray-400">
                To update your security credentials, please enter your current password. You can update your username, password, or secret key. Leave fields blank to keep them unchanged.
             </p>
             <InputField
                label="Current Password"
                name="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                error={errors.currentPassword}
                required
            />
            <div className="border-t border-gray-200 dark:border-[#30363d] pt-6 space-y-6">
                <InputField
                    label="New Username"
                    name="newUsername"
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    error={errors.newUsername}
                />
                <InputField
                    label="New Password"
                    name="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    error={errors.newPassword}
                    placeholder="Leave blank to keep current"
                />
                 <InputField
                    label="New Secret Key"
                    name="newSecretKey"
                    type="text"
                    value={newSecretKey}
                    onChange={(e) => setNewSecretKey(e.target.value)}
                    error={errors.newSecretKey}
                    placeholder="XXXXX-XXXXX-XXXXX"
                    maxLength={17}
                />
            </div>
            {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>}
            <div className="flex justify-end items-center space-x-4">
                {status && <p className={`${status.type === 'success' ? 'text-green-500' : 'text-red-500'} text-sm`}>{status.message}</p>}
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm transition-colors">
                    Update Credentials
                </button>
            </div>
        </form>
    );
};

export default CredentialsSettings;
