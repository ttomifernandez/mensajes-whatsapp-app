'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  children,
  className = '',
  disabled = false,
  ...props
}: ButtonProps) {
  const baseClasses = 'rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses: Record<string, string> = {
    primary: 'bg-whatsapp text-white hover:bg-green-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  const finalClassName = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <button
      className={finalClassName}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
