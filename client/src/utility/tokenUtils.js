// utils/tokenUtils.js

// Utility function to retrieve the access token from localStorage
export const getAccessToken = () => localStorage.getItem('accessToken');

// Utility function to store a new access token in localStorage
export const setAccessToken = (token) => localStorage.setItem('accessToken', token);

export const deleteAllCookies = () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
};

// // Call this function when logging out
// deleteAllCookies();
