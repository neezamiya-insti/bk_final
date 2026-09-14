import React from 'react'
import HeroSection from './components/HeroSection'
import WhoWeAreSection from './components/WhoWeAreSection'
import OurPhilosophySection from './components/Home/OurPhilosophySection'
import DiscoverPotentialSection from './components/Home/DiscoverPotentialSection'

import GlobalPotentialSection from './components/Home/GlobalPotentialSection'
import ContactPage from './components/Home/ContactPage'
import Partners from './components/Home/Partners'
import ScrollParallaxGallery from './components/Home/ScrollParallaxGallery'

import AspirationServicesSection from './components/Home/ServicesScrollGallery'


function page() {
  return (
    <>

      <HeroSection/>
      <Partners/>
      <WhoWeAreSection/>
      <OurPhilosophySection/>
      <DiscoverPotentialSection/>
      <GlobalPotentialSection/>
      <AspirationServicesSection/>
      <ScrollParallaxGallery/>
      
      <ContactPage/>
      
      
    </>
  )
}

export default page
