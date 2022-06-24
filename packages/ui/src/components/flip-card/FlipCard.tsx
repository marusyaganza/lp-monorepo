import React, {useState, useEffect, PropsWithChildren, ReactNode} from 'react';

import './FlipCard.css';

interface FlipCardProps {
    className?: string
    sideA: ReactNode
    sideB:  ReactNode
    // flippBack?: boolean 
}

export const FlipCard = ({sideA, sideB, className}:FlipCardProps) => {
    const [isFlipped, setIsFlipped] = useState<boolean>(false);

    useEffect(() => {
        setIsFlipped(false);
    }, [sideA, sideB])


    const clickHandler = () => {setIsFlipped(prev => !prev)}

    const side = isFlipped ? sideA : sideB;

    return (
        <div className={`${isFlipped ? 'isFlipped' : ''} flipCardContainer`} onClick={clickHandler} tabIndex={0}>
            <div className={` ${className} flipCardContent`}>
                <div className="sideA">{sideA}</div>
                <div className="sideB">{sideB}</div>
            </div>
        </div>
    );
};