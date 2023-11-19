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
    address: '0x150a8db2cef3b6f6c90b062e97469826e4fce547',
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
    functionName: 'bet',
    value:parseEther('0'),
    args: [parseEther('0'),parseEther('42')]

  },)
  const { write } = useContractWrite(config)

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-lg font-bold">{team1} vs {team2}</h2>
      <p>Date: {matchDate}</p>
      <div className="flex justify-between items-center">
        <div>
          <span>Odds: {oddsTeam1}</span>
          <button disabled={!write} onClick={() => write?.()}>Bet Team A</button>
        </div>
        <div>
          <span>Odds: {oddsTeam2}</span>
          <button disabled={!write} onClick={() => write?.()}>Bet Team B</button>
        </div>
      </div>
    </div>
  );
};

export default Bet;
