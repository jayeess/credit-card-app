'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-1.5 group">
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-gray-700 transition-colors group-focus-within:text-blue-600"
        >
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
              focus:outline-none focus:ring-0 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-100
              hover:border-gray-400
              ${error
                ? 'border-red-400 bg-red-50 focus:border-red-500 focus:shadow-red-100'
                : 'border-gray-200 bg-white/80 backdrop-blur-sm'}
              ${className}
            `}
            {...props}
          />
          {/* Focus indicator line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 group-focus-within:w-full rounded-full" />
        </div>
        {error && (
          <p className="text-sm text-red-600 flex items-center gap-1 animate-fade-in">
            <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
