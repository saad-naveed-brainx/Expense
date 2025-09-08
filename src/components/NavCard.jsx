import React from "react";
import { NavLink } from "react-router-dom";

export default function NavCard({ title, icon: Icon, path }) {
    return (
        <NavLink
            to={path}
            className={({ isActive }) => `flex items-center justify-start cursor-pointer gap-3 p-2 rounded-md w-full ${isActive ? 'bg-gray-400' : ''}`}
        >
            {({ isActive }) => (
                <>
                    <Icon className={`text-black text-xl dark:text-white`} />
                    <h1 className={`text-black text-xl dark:text-white`}>{title}</h1>
                </>
            )}
        </NavLink>
    )
}