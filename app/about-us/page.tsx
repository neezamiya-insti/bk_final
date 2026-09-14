import React from 'react'
import AboutHero from '../components/about/AboutHero'
import WhoWeAreSection from '../components/about/WhoWeAreSection'
import MissionVisionSection from '../components/about/MissionVisionSection'
import OurPhilosophySection from '../components/about/OurPhilosophySection'
import ContactPage from '../components/Home/ContactPage'
import DiscoverPotentialSection from '../components/about/DiscoverPotentialSection'
import Partners from '../components/about/Partners'
import OurValuesSection from '../components/about/OurValuesSection'

function page() {
  return (
    <div>
        <AboutHero/>
        <WhoWeAreSection/>
        <MissionVisionSection/>
        <OurPhilosophySection/>
        <DiscoverPotentialSection/>
        <Partners/>
        <OurValuesSection/>
        <ContactPage/>
      
    </div>
  )
}

export default page
