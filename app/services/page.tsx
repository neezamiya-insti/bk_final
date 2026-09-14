import React from 'react'
import ServicesHero from '../components/services/ServicesHero'
import ServicesShowcaseSection from './Services'
import CtaSection from '../blog/CtaSection'

function page() {
  return (
    <div>
      <ServicesHero/>
      <ServicesShowcaseSection/>
      <CtaSection/>
    </div>
  )
}

export default page
