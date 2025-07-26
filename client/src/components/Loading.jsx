import React from 'react';

const Loading = ({ 
  size = 'md', 
  message = 'Loading...', 
  overlay = false,
  variant = 'default'
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'lg':
        return 'w-8 h-8';
      case 'xl':
        return 'w-12 h-12';
      default:
        return 'w-6 h-6';
    }
  };

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center space-x-3">
      {variant === 'dots' ? (
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      ) : variant === 'pulse' ? (
        <div className={`${getSizeClasses()} bg-indigo-600 rounded-full animate-pulse`}></div>
      ) : (
        <div className={`${getSizeClasses()} border-2 border-gray-200 border-t-indigo-600 rounded-full animate-spin`}></div>
      )}
      {message && <span className="text-gray-600 font-medium">{message}</span>}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm mx-4">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return <LoadingSpinner />;
};

// Skeleton loader for content
export const SkeletonLoader = ({ lines = 3, className = '' }) => (
  <div className={`animate-pulse ${className}`}>
    {[...Array(lines)].map((_, index) => (
      <div
        key={index}
        className={`h-4 bg-gray-200 rounded mb-3 ${
          index === lines - 1 ? 'w-2/3' : 'w-full'
        }`}
      ></div>
    ))}
  </div>
);

// Card skeleton loader
export const CardSkeleton = ({ className = '' }) => (
  <div className={`card p-6 animate-pulse ${className}`}>
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
    <SkeletonLoader lines={3} />
  </div>
);

// Button loading state
export const ButtonLoading = ({ children, isLoading = false, ...props }) => (
  <button
    {...props}
    disabled={isLoading || props.disabled}
    className={`${props.className} ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
  >
    {isLoading ? (
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        <span>{children}</span>
      </div>
    ) : (
      children
    )}
  </button>
);

export default Loading;
