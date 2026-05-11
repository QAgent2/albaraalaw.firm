import React, { useState, useRef } from 'react';
import { cn } from '../lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
  as?: any;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className, onClick, ariaLabel, as: Component = "button" }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative transition-transform duration-200 ease-out", className)}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      <Component 
        onClick={onClick}
        className="w-full h-full cursor-pointer border-none bg-transparent p-0 block appearance-none outline-none"
        aria-label={ariaLabel}
      >
        {children}
      </Component>
    </div>
  );
};
