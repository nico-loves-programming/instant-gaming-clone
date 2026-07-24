import {ReactNode} from "react";

interface CardProps {
    children: ReactNode
    className?: string
}

export function Card({children, className = ''}: CardProps) {
    return (
        <div className={`rounded-lg  text-white shadow-sm overflow-hidden ${className}`}>
            {children}
        </div>
    )
}