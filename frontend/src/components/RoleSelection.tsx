import React from 'react';
import { UserCog, GraduationCap, Users } from 'lucide-react';

interface RoleSelectionProps {
  onRoleSelect: (role: string) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onRoleSelect }) => {
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
  );
}

export default RoleSelection