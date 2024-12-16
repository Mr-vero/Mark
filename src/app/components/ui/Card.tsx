'use client';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md ${className}`}>
      {children}
    </div>
  );
} 