'use client';

import { useCallback, useState, DragEvent, ChangeEvent } from 'react';
import { Upload, FileCheck, X, CloudUpload } from 'lucide-react';
import { UploadedFile } from '@/lib/types';

interface FileUploadProps {
  label: string;
  accept?: string;
  value: UploadedFile | null;
  onChange: (file: UploadedFile | null) => void;
  error?: string;
}

export function FileUpload({
  label,
  accept = 'image/*,.pdf',
  value,
  onChange,
  error,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      onChange({
        name: file.name,
        size: file.size,
        type: file.type,
      });
    },
    [onChange]
  );

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = () => {
    onChange(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>

      {value ? (
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl animate-scale-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FileCheck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{value.name}</p>
              <p className="text-xs text-green-600 font-medium">{formatFileSize(value.size)} - Uploaded</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
            transition-all duration-300 group
            ${isDragging
              ? 'border-blue-500 bg-blue-50 scale-[1.02] shadow-lg shadow-blue-100'
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'}
            ${error ? 'border-red-400 bg-red-50' : ''}
          `}
        >
          <input
            type="file"
            accept={accept}
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className={`
            w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center
            transition-all duration-300
            ${isDragging
              ? 'bg-blue-100 scale-110'
              : 'bg-gray-100 group-hover:bg-blue-100 group-hover:scale-105'}
          `}>
            {isDragging ? (
              <CloudUpload className="w-8 h-8 text-blue-600 animate-bounce-soft" />
            ) : (
              <Upload className="w-8 h-8 text-gray-400 group-hover:text-blue-600 transition-colors" />
            )}
          </div>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold text-blue-600 group-hover:text-blue-700">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>

          {/* Animated border on drag */}
          {isDragging && (
            <div className="absolute inset-0 rounded-xl border-2 border-blue-500 animate-pulse pointer-events-none" />
          )}
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1 animate-fade-in">
          <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
          {error}
        </p>
      )}
    </div>
  );
}
