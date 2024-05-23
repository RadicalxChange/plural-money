import { useEffect, useRef } from 'react';

export default function useClickOutside(handler: () => void) {
    const domNodeRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        // Define maybeHandler to check if the click is outside the ref element
        const maybeHandler = (event: MouseEvent) => {
            if (domNodeRef.current && !domNodeRef.current.contains(event.target as Node)) {
                handler();
            }
        };

        // Add event listener to the document
        document.addEventListener('mousedown', maybeHandler);

        // Cleanup function to remove the event listener
        return () => {
            document.removeEventListener('mousedown', maybeHandler);
        };
    }, [handler]); // Include handler in the dependency array to handle updates

    return domNodeRef;
}
