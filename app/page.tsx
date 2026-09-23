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
import StatsSection from './components/Home/StatsSection'

function Page() {
  return (
    <>
      {/* 1. HERO — Hook attention */}
      <HeroSection />

      {/* 2. STATS — Instant credibility with numbers */}
      <StatsSection />

      {/* 3. WHO WE ARE — Brand story */}
      <WhoWeAreSection />

      {/* 4. SERVICES — What we offer */}
      <AspirationServicesSection />

      {/* 5. OPPORTUNITY — Why now (market potential) */}
      <DiscoverPotentialSection />

      {/* 6. GLOBAL REACH — Our impact worldwide */}
      <GlobalPotentialSection />

      {/* 7. PHILOSOPHY — Values & mission */}
      <OurPhilosophySection />

      {/* 8. PARTNERS — Social proof (trust) */}
      <Partners />

      {/* 9. LATEST NEWS & BLOGS — Fresh content */}
      <ScrollParallaxGallery />

      {/* 10. CONTACT — Final CTA (convert) */}
      <ContactPage />
    </>
  )
}

export default Page