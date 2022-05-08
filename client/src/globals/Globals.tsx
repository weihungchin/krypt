import { ReactNode } from "react";


export const IconContainer = ({ children, className, onClick }: { children?: ReactNode, className?: string, onClick?: any }) => (
    <div className={className} onClick={onClick}>
        {children}
    </div>
)