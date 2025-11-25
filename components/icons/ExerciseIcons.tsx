import React from 'react';

// Individual icon components for each exercise
const BenchPressIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M5 16H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 16V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M17 16V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="9" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 11V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 7L12 11L15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M4 5H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M4 4V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M20 4V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

const PushupIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="12" cy="6" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 8L9 14L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8L15 14L20 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 14L7 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 14L17 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const TricepPushdownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 13V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 22L12 18L15 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 16L12 13L15 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

const JumpingJackIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 7V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5 21L12 13L19 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5 8L12 11L19 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

const HighKneesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 7V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 13L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 13L9 17L7 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 13L15 18H12L10 16H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const BurpeeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="12" cy="6" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 8L9 14L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8L15 14L20 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 14L7 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 14L17 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const SquatIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M4 5H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="7" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 9V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 19L12 14L15 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

const LegPressIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M5 19L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 12L19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 14L7 11L13 5L16 8L10 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 19H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M19 7H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

const LegExtensionIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M5 12H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 12V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 10V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 12L10 15L15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M19 19H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

const CatCowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="12" cy="6" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 18V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M18 18V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 14C6 10 10 9 12 9C14 9 18 10 18 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 8V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

const ThoracicRotationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="12" cy="6" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 18V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M18 18V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 14H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 8L9 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M15 10L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

// Helper function to get the correct icon for an exercise
export const getExerciseIcon = (exerciseId: string): React.FC<React.SVGProps<SVGSVGElement>> | null => {
    switch(exerciseId) {
        case 'e1': return BenchPressIcon;
        case 'e2': return PushupIcon;
        case 'e3': return TricepPushdownIcon;
        case 'e4': return JumpingJackIcon;
        case 'e5': return HighKneesIcon;
        case 'e6': return BurpeeIcon;
        case 'e7': return SquatIcon;
        case 'e8': return LegPressIcon;
        case 'e9': return LegExtensionIcon;
        case 'e10': return CatCowIcon;
        case 'e11': return ThoracicRotationIcon;
        default: return null;
    }
};
