// import flowbite from 'flowbite-react/tailwind';

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     flowbite.content(),
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     flowbite.plugin(),
// ],
// }


import flowbite from 'flowbite-react/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // Ensure this matches your project structure
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
}
