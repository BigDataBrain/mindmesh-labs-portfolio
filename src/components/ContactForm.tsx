import React, { useState } from 'react';
import { Settings } from '../types';

interface ContactFormProps {
    settings: Settings | null;
}

const ContactForm: React.FC<ContactFormProps> = ({ settings }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings || !settings.contactEmail) {
        setStatus('error');
        console.error("Contact email not configured in settings.");
        return;
    }

    setStatus('sending');

    // In a real application, you would use a service like SendGrid or a serverless function.
    // This is a simulation.
    console.log(`Simulating sending email to ${settings.contactEmail} from ${email}`);
    console.log({ name, email, message });

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate success
    setStatus('success');
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setStatus('idle'), 5000);
  };
  
  const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <input
            {...props}
            className="bg-gray-50 dark:bg-[#010409] border border-gray-300 dark:border-[#30363d] text-gray-900 dark:text-gray-300 rounded-md block w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
    </div>
  );

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-2">Get In Touch</h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Have a project in mind or just want to say hi? I'd love to hear from you.</p>
      
      <div className="bg-white dark:bg-[#161B22] border border-gray-200 dark:border-[#30363d] rounded-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Your Name" type="text" value={name} onChange={e => setName(e.target.value)} required disabled={status === 'sending'} />
            <InputField label="Your Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required disabled={status === 'sending'} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={5}
              required
              disabled={status === 'sending'}
              className="bg-gray-50 dark:bg-[#010409] border border-gray-300 dark:border-[#30363d] text-gray-900 dark:text-gray-300 rounded-md block w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <button type="submit" disabled={status === 'sending'} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed">
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </div>
          {status === 'success' && <p className="text-green-500 text-center">Message sent successfully! I'll get back to you soon.</p>}
          {status === 'error' && <p className="text-red-500 text-center">Something went wrong. Please check your settings and try again.</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;