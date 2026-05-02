import React from 'react';
import { motion } from 'framer-motion';
import { Inbox } from 'lucide-react';

const EmptyState = ({ 
  title = "No data found", 
  message = "It looks like there's nothing here yet.", 
  icon: Icon = Inbox,
  action 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-warm-grey mb-6 border border-white/5">
        <Icon className="w-10 h-10" />
      </div>
      <h3 className="text-xl font-serif font-bold text-offwhite mb-2">{title}</h3>
      <p className="text-warm-grey max-w-sm mb-8">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="bg-gold hover:bg-gold-light text-espresso px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-gold/20"
        >
          {action.label}
        </button>
      )}
    </motion.div>
  );
};

export default EmptyState;
