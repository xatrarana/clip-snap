'use client';

import React, { ReactNode, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

interface RedirectionButtonProps {
  buttonText?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  className?: string;
  children?: ReactNode;
}

const RedirectionButton: React.FC<RedirectionButtonProps> = ({ 
  buttonText = "Continue", 
  onClick, 
  href, 
  className = "", 
  children 
}) => {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }

    if (href) {
      router.push(href);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-200 flex items-center space-x-3 shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transform ${className}`}
    >
      <span>{buttonText}</span>
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      {children}
    </button>
  );
};

export default RedirectionButton;

