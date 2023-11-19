"use client"

import { Connected } from '../components/Connected'
import { Web3Button } from '../components/Web3Button'
import {Bet, BetProps} from './Bet'
import { execute } from '../../.graphclient'
import { gql } from 'graphql-request'
import { useState } from 'react'

const myQuery = gql`
  query betsQuery {
    bets {
      id
      assets {
        address
        totalDeposited
      }
      creator
      operator
      startTime
    }
  }
`
export function Page() {
  const [bets, setBets]: [any,any] = useState([]);
  const [ready, setReady]: [any,any] = useState(false);

  if(!ready) {
    execute(myQuery, {}).then((data) => {
      setReady(true)
      setBets(data.data.bets);
    })
  }

  return (
    <>
      <Web3Button />
      <Connected>
        {ready ? bets.map((bet: any) => 
         {
          let totalDeposited = (BigInt(bet.assets[0].totalDeposited)) + (BigInt(bet.assets[1].totalDeposited))
          let totalDepositedNumber = parseInt((totalDeposited / BigInt(10**18)).toString().replace('n',''));
          let totalA = parseInt((BigInt(bet.assets[0].totalDeposited) / BigInt(10**18)).toString().replace('n',''));
          let totalB = parseInt((BigInt(bet.assets[1].totalDeposited) / BigInt(10**18)).toString().replace('n',''));

          const oddsTeam1 = totalDeposited > 0 ? (totalA / totalDepositedNumber) : 0.5
          const oddsTeam2 = totalDeposited > 0 ? (totalB / totalDepositedNumber) : 0.5
          const betProps: BetProps = {
            team1: "Team 1",
            team2: "Team 2",
            matchDate: new Date(bet.startTime * 1000).toDateString(),
            oddsTeam1: oddsTeam1.toFixed(2),
            oddsTeam2: oddsTeam2.toFixed(2),
            address1: bet.assets[0].address,
            address2: bet.assets[1].address
          }
          return <Bet key={bet.id} {...betProps}/>
        }) : <p>Loading...</p>
        }

      </Connected>
    </>
  )
}

export default Page
