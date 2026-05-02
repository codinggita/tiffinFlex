import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ 
  title = "Something went wrong", 
  message = "We couldn't load this content. Please try again.", 
  onRetry 
}) => {
  return (
    <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-8 flex flex-col items-center text-center">
      <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-400 mb-4">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-offwhite mb-2">{title}</h3>
      <p className="text-warm-grey text-sm max-w-xs mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 text-gold font-bold hover:text-gold-light transition-colors text-sm"
        >
          <RefreshCw className="w-4 h-4" /> Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
