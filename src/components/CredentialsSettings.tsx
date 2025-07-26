import React from 'react';

const CredentialsSettings: React.FC = () => {
    return (
        <div className="space-y-6">
             <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Update Your Credentials</h3>
             <p className="text-sm text-gray-500 dark:text-gray-400">
                User authentication, including password updates, is now managed by Supabase. To change your password, please use the "Forgot Password" feature on the login page or manage your account through Supabase's provided user management tools.
             </p>
        </div>
    );
};

export default CredentialsSettings;