import React from 'react';
import { parseEther } from 'viem';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
interface ClientBetButtonProps {
    team: string;
    address: string;
    onBet: (team: string) => void;
  }
  
  
export interface BetProps {
  team1: string;
  team2: string;
  matchDate: string;
  oddsTeam1: number;
  oddsTeam2: number;
  address1: string;
  address2: string;
}

export const Bet: React.FC<BetProps> = ({ team1, team2, matchDate, oddsTeam1, oddsTeam2, address1, address2 }) => {

  const { config } = usePrepareContractWrite({
    address: 'address',
    abi: [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_tokenIndex",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "bet",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    functionName: 'mint',
    value:parseEther('0'),
    args: [parseEther('0'),parseEther('0.1')]

  },)
  const { write } = useContractWrite(config)

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-lg font-bold">{team1} vs {team2}</h2>
      <p>Date: {matchDate}</p>
      <div className="flex justify-between items-center">
        <div>
          <span>Odds: {oddsTeam1}</span>
          <button disabled={!write} onClick={() => write?.()}/>
        </div>
        <div>
          <span>Odds: {oddsTeam2}</span>
          <button disabled={!write} onClick={() => write?.()}/>
        </div>
      </div>
    </div>
  );
};

export default Bet;
