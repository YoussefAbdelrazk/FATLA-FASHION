import { type ClassValue, clsx } from 'clsx';

import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to construct full image URL from relative path
export function getImageUrl(relativePath: string | null | undefined): string | null {
  if (!relativePath) return null;

  // If it's already an absolute URL, return as is
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath;
  }

  // If it starts with a slash, it's a relative path that should be combined with API base URL
  if (relativePath.startsWith('/')) {
    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'https://fatlaapi.alsalhani.com';

    if (apiBaseUrl) {
      const fullUrl = `${apiBaseUrl}${relativePath}`;
      return fullUrl;
    }

    // If no API base URL is configured, try to use the relative path as is
    // This will work if the images are served from the same domain as the app
    return relativePath;
  }

  // If it doesn't start with a slash, it might be a relative path without leading slash
  // Try to add the API base URL
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'https://fatlaapi.alsalhani.com';
  if (apiBaseUrl) {
    return `${apiBaseUrl}/${relativePath}`;
  }

  // Final fallback - return the path as is
  return relativePath;
}

export function validateImage(file: File): { isValid: boolean; error?: string } {
  // Check file size (2MB = 2 * 1024 * 1024 bytes)
  const maxSize = 2 * 1024 * 1024; // 2MB in bytes
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'Image size must be less than 2MB',
    };
  }

  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Only JPG, JPEG, and PNG files are allowed',
    };
  }

  return { isValid: true };
}
