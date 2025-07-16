import React, { useState } from 'react';
import Modal from './Modal';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, phone: string) => void;
  projectName: string;
}

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ isOpen, onClose, onSubmit, projectName }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone: string) => {
    const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
    return re.test(String(phone));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    setEmailError('');
    setPhoneError('');

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }
    if (!validatePhone(phone)) {
      setPhoneError('Please enter a valid phone number.');
      isValid = false;
    }

    if (isValid) {
      onSubmit(email, phone);
    }
  };
  
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


  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Access Details for "${projectName}"`}>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        To view the project details, please provide your contact information. I'll get in touch to discuss potential collaborations.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          required
        />
        <InputField
          label="Phone Number"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={phoneError}
          required
        />
        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors">
            Cancel
          </button>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
            Submit & View
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default LeadCaptureModal;