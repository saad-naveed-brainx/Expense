import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ThemeEffect() {
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDarkMode]);

    return null;
}