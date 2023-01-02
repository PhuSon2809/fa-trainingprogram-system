import React from "react";

const Tags = ({ children, className, onClick }) => {
    return <span onClick={onClick} className={`tags ${className}`}>{children}</span>;
};

export default Tags;
