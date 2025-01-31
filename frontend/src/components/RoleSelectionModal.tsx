import React from 'react';
import { UserCog, GraduationCap, Users, X } from 'lucide-react';

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRoleSelect: (role: string) => void;
}

const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({
  isOpen,
  onClose,
  onRoleSelect,
}) => {
  if (!isOpen) return null;

  const roles = [
    {
      id: 'admin',
      title: 'Admin',
      icon: UserCog,
      description: 'System administration and management',
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'faculty',
      title: 'Faculty',
      icon: Users,
      description: 'Teaching and course management',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'student',
      title: 'Student',
      icon: GraduationCap,
      description: 'Learning and collaboration',
      color: 'from-green-500 to-green-600',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 transform transition-all">
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <h2 className="text-2xl font-bold text-center mb-8">
            Select Your Role
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => onRoleSelect(role.id)}
                  className={`p-6 rounded-xl bg-gradient-to-r ${role.color} transform hover:scale-105 transition-all duration-300 text-white shadow-lg`}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <Icon className="h-12 w-12" />
                    <h3 className="text-xl font-semibold">{role.title}</h3>
                    <p className="text-sm opacity-90">{role.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleSelectionModal