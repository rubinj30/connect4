import React from 'react';
import './atoms.css';

// using standard HTML button types
type Type = 'submit' | 'reset' | 'button';

type Props = {
    className: string;
    type: Type;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
export const Button = ({ label, className, type, onClick }) => {
    return (
        <button
            type={type}
            className={`pointer tc pa2 br2 hover-bg-blue hover-white bg-white f5 ${className}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};