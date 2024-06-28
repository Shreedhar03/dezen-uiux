"use client"
import ShinyCard from '@mountainpass/react-pokemon-cards'
import '@mountainpass/react-pokemon-cards/dist/css/cards.css'

const PokemonCard = () => (
  <ShinyCard rarity='rare holo' style={{ width: '300px', height: '400px' }}>
      Here is some content
  </ShinyCard>
)

export default PokemonCard