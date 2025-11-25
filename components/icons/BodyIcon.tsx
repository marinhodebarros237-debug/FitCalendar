import React from 'react';

export const BodyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 7V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 10L12 13L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 20L12 15L15 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);
