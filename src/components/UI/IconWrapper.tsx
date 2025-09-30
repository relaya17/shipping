import React from 'react';
import { IconProps } from 'react-bootstrap-icons';

interface IconWrapperProps extends IconProps {
  icon: React.ComponentType<IconProps>;
}

const IconWrapper = ({ icon: IconComponent, ...props }: IconWrapperProps): JSX.Element => {
  return React.createElement(IconComponent, props);
};

export default IconWrapper;
