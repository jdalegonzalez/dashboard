
import React, { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

const AnimatedDot = ({className= "", size = 2}:{className:string, size:number}) => {
    const merged = twMerge(`w-${size} h-${size} rounded-full bg-blue-500 animate-dot-pulse`, className);
    return (
        <div className={merged}></div>
    );
};

const AnimatedDotsTail = ({ className="", size=2, count=3, delay=200 }) => {
    const [dots, setDots] = useState([] as React.ReactElement[]);
    useEffect(() => {
        const newDots: React.ReactElement[] = [];
        const timeouts: NodeJS.Timeout[] = [];
        for (let i = 0; i < count; i++) {
            const timeout = setTimeout(() => {
                newDots.push(<AnimatedDot className={className} size={size} key={i} />);
                setDots([...newDots]);
            }, i * delay);
            timeouts.push(timeout);
        }
        return () => { for (const id in timeouts) clearTimeout(id); }
    }, []);

    return (
    <div className="flex space-x-1">
        {dots}
    </div>
    );
};

export default AnimatedDotsTail;