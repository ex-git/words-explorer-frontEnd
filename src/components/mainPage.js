import React from 'react'

import IntroSection from './introSection'
import HowTo from './howTo'
import OpenGame from './openGame'
import Ranking from './ranking'
import JoinGame from './joinGame'

export default function mainPage() {
  return (
    <div>
        <IntroSection />
        <HowTo />
        <OpenGame />
        <JoinGame />
        <Ranking />
    </div>
  )
}
