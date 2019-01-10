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
        <OpenGame games={[
                {id:112233, status:"playing"},
                {id:990099, status:"open"}
            ]}
        />
        <JoinGame />
        <Ranking ranks={[
                {name: "Maxwell", score: 999},
                {name: "Lily", score: 354},
            ]}
        />
    </div>
  )
}
