import React, { ButtonHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success';
  icon?: LucideIcon;
}

export function Button({ 
  children, 
  variant = 'primary', 
  icon: Icon,
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium';
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 border border-transparent',
    secondary: 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300',
    success: 'bg-green-600 text-white hover:bg-green-700 border border-transparent'
  };

  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {children}
    </button>
  );
}