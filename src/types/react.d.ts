// React type compatibility fixes
import { ReactNode as OriginalReactNode } from 'react';

// Override ReactNode type to ensure compatibility between v18 and v19
declare module 'react' {
    export type ReactNode = OriginalReactNode;
    export type AwaitedReactNode = OriginalReactNode;
}

// Global type override for React version compatibility
declare global {
    namespace React {
        type ReactNode = OriginalReactNode;
        type AwaitedReactNode = OriginalReactNode;
    }
}

// Fix for react-bootstrap-icons
declare module 'react-bootstrap-icons' {
    export interface IconProps {
        size?: number | string;
        className?: string;
        style?: React.CSSProperties;
        onClick?: (event: React.MouseEvent<SVGElement>) => void;
    }

    export type Icon = React.FC<IconProps>;
}

// Fix for react-router-dom Link component
declare module 'react-router-dom' {
    export interface LinkProps {
        to: string;
        className?: string;
        onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
        children?: ReactNode;
    }

    export const Link: React.ComponentType<LinkProps>;
}

// Fix for react-phone-input-2
declare module 'react-phone-input-2' {
    export interface PhoneInputProps {
        country?: string;
        value?: string;
        onChange?: (value: string) => void;
        inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
        inputStyle?: React.CSSProperties;
    }

    export const PhoneInput: React.ComponentType<PhoneInputProps>;
}