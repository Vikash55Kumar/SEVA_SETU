import React from 'react'
import HomePage from '../homePage/HomePage'
import Slider from '../slider/Slider'
import QuickLink from '../homePage/QuickLink'
// import Profile from '../profile/Profile'




export default function Home() {
  // Form recieves
 
  // map
  const districtData = [
    { name: 'Mumbai', value: 120 },
    { name: 'Pune', value: 95 },
    { name: 'Nagpur', value: 85 },
    // Add more districts and values as needed
  ];

  return (
    <div>

      <HomePage />
      <Slider />
      <QuickLink /> 
      
    </div>
  )
}
