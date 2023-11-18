import { Connected } from '../components/Connected'
import { Web3Button } from '../components/Web3Button'
import Bet from './bet'

export function Page() {
  return (
    <>
      <Web3Button />

      <Connected>
      <Bet 
        team1="Team A" 
        team2="Team B" 
        matchDate="2023-11-20" 
        oddsTeam1={1.5} 
        oddsTeam2={2.5} 
      />

      </Connected>
    </>
  )
}

export default Page
