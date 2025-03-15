import React from 'react'
import HomePage from '../homePage/HomePage'
import Slider from '../slider/Slider'
import QuickLink from '../homePage/QuickLink'
import JoyzChatbot from '../Testing/Testing2'
// import Profile from '../profile/Profile'
import LandingPage from "../homePage/LandingPage"

export default function Home() {

  return (
    <div>
      <HomePage />
      <Slider />
      <LandingPage />
      <JoyzChatbot />
      {/* <QuickLink /> */}
    </div>
  )
}
