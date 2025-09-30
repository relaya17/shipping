import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import './MicroInteractions.css';

interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: string;
  size?: "sm" | "lg";
  className?: string;
}

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({ 
  children, 
  onClick, 
  variant = "primary", 
  size,
  className = "" 
}) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y
    };

    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    if (onClick) onClick();
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={`interactive-btn ${className}`}
      onClick={createRipple}
    >
      <>
        {children as React.ReactNode}
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            className="ripple"
            style={{
              left: ripple.x,
              top: ripple.y
            }}
          />
        ))}
      </>
    </Button>
  );
};

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({ 
  children, 
  className = "",
  delay = 0 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Card 
      className={`floating-card ${isVisible ? 'visible' : ''} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children as React.ReactNode}
    </Card>
  );
};

interface PulseIconProps {
  children: React.ReactNode;
  color?: string;
  size?: number;
}

export const PulseIcon: React.FC<PulseIconProps> = ({ 
  children, 
  color = "#007bff",
  size = 48 
}) => {
  return (
    <div 
      className="pulse-icon" 
      style={{ 
        '--pulse-color': color, 
        '--pulse-size': `${size}px` 
      } as React.CSSProperties}
    >
      {children as React.ReactNode}
      <div className="pulse-ring"></div>
      <div className="pulse-ring" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = "",
  onClick 
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setPosition({ x: x * 0.1, y: y * 0.1 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      className={`magnetic-btn ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children as React.ReactNode}
    </button>
  );
};

interface ParallaxTextProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxText: React.FC<ParallaxTextProps> = ({ 
  children, 
  speed = 0.5,
  className = "" 
}) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset * speed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div 
      className={`parallax-text ${className}`}
      style={{ transform: `translateY(${offset}px)` }}
    >
      {children as React.ReactNode}
    </div>
  );
};
