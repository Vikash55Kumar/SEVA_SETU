// useNotification.js
import { useState } from 'react';

const useNotification = () => {
    
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    // console.log('Notification component props:', { open, message, severity }); // Debugging line
    const showNotification = (msg, type = 'success') => {
        setMessage(msg);
        setSeverity(type);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return {
        open,
        message,
        severity,
        showNotification,
        handleClose,
    };
};

export default useNotification;
