import React from "react";
import { Snackbar, Alert, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Notification = ({ open, handleClose, message, severity }) => {
    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={4000} // Auto-hide after 4 seconds
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80%' }}
            >
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant="filled"
                    sx={{ width: '50%' }}
                    action={
                        <IconButton aria-label="close" color="inherit" size="small" onClick={handleClose} >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
}


export default Notification;
