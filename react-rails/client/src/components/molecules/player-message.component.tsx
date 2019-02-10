import React from 'react';
import { Button } from '../atoms/button.component';

export const NewPlayerMessage = ({
    text,
    reset
}: {
    text: string;
    reset: (e: React.MouseEvent<any>) => void;
}) => (
    <div className="w4 h4 bg-white o-80 flex flex-column items-center pa3 w-100 h4">
        <div className="tc">{text}</div>
        <Button onClick={reset} label={'Close'} />
    </div>
);
