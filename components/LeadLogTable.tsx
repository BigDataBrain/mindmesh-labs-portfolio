import React from 'react';
import { Lead } from '../types';

interface LeadLogTableProps {
  leads: Lead[];
}

const LeadLogTable: React.FC<LeadLogTableProps> = ({ leads }) => {
  return (
    <div className="bg-white dark:bg-[#161B22] border border-gray-200 dark:border-[#30363d] rounded-lg overflow-hidden">
      <div className="max-h-96 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-[#30363d]">
          <thead className="bg-gray-50 dark:bg-[#21262d] sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Contact</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Interested In</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-[#161B22] divide-y divide-gray-200 dark:divide-[#30363d]">
            {leads.length > 0 ? leads.map((lead) => (
              <tr key={lead.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {new Date(lead.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                  <div>{lead.email}</div>
                  <div className="text-xs text-gray-500">{lead.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{lead.projectName}</td>
              </tr>
            )) : (
                <tr>
                    <td colSpan={3} className="px-6 py-10 text-center text-sm text-gray-500">
                        No leads captured yet.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadLogTable;
