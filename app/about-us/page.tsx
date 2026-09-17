import React from 'react'
import AboutHero from '../components/about/AboutHero'
import WhoWeAreSection from '../components/about/WhoWeAreSection'
import MissionVisionSection from '../components/about/MissionVisionSection'
import OurPhilosophySection from '../components/about/OurPhilosophySection'
import ContactPage from '../components/Home/ContactPage'

import Partners from '../components/about/Partners'
import OurValuesSection from '../components/about/OurValuesSection'
import ManagementBoardSection from '../components/about/ManagementBoardSection'

function page() {
  return (
    <div>
        <AboutHero/>
        <WhoWeAreSection/>
        <MissionVisionSection/>
        <OurPhilosophySection/>
       
        <Partners/>
        <OurValuesSection/>
        <ManagementBoardSection/>
        <ContactPage/>
      
    </div>
  )
}

export default page
