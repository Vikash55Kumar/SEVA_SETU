// import React, { useState, useEffect } from 'react';

// export default function SpinnerLoader() {
//     // Fixing useState instead of useEffect for text state
//     const [text, setText] = useState('');
//     const [showImg, setShowImg] = useState(true); // Initially set showImg to true to display the spinner

//     useEffect(() => {
//         setTimeout(() => {
//             setShowImg(false);
//             setText('I am waiting 3 seconds to be loaded, did you see the spinner?');
//         }, 3000); // 3-second delay
//     }, []);

//     return (
//         <div>
//             {showImg ? (
//                 <img src='./Rolling.svg' alt="Loading Spinner" /> // Ensure this path is correct and the image exists
//             ) : (
//                 <h3>{text}</h3>
//             )}
//         </div>
//     );
// }




import React, { useState, useEffect } from 'react';
import './spinnerLoader.css'; // Make sure to import the CSS file for styling

export default function SpinnerLoader() {
    const [text, setText] = useState('');
    const [showImg, setShowImg] = useState(true); 

    useEffect(() => {
        setTimeout(() => {
            setShowImg(false);
            setText('I am waiting 3 seconds to be loaded, did you see the spinner?');
        }, 3000); 
    }, []);

    return (
        <div className="spinner-overlay">
            {showImg ? (
                <div className="spinner-container">
                    <img src='./RollingT.svg' alt="Loading Spinner" className="spinner-img" />
                </div>
            ) : (
                <h3>{text}</h3>
            )}
        </div>
    );
}
