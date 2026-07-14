import React from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import type { ButtonProps } from 'react-bootstrap';

type LinkButtonProps = Omit<ButtonProps, 'as' | 'href'> & {
  to: LinkProps['to'];
};

/**
 * Bootstrap-styled link that looks like a Button and navigates with react-router.
 */
const LinkButton: React.FC<LinkButtonProps> = ({
  to,
  variant = 'primary',
  size,
  className = '',
  children,
  disabled,
  ...rest
}) => {
  const sizeClass = size === 'lg' ? 'btn-lg' : size === 'sm' ? 'btn-sm' : '';
  const classes = ['btn', `btn-${variant}`, sizeClass, className].filter(Boolean).join(' ');

  return (
    <Link
      to={to}
      className={classes}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      onClick={disabled ? (e) => e.preventDefault() : undefined}
      {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
