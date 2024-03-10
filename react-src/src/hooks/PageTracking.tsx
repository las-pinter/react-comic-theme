import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const UsePageTracking = () => {
    const location = useLocation();

    useEffect(() => {
        window.gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: location.pathname,
            send_to: 'G-BS16XEB2VB'
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);
};

export default UsePageTracking;