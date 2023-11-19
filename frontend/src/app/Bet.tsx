import React from 'react';
interface ClientBetButtonProps {
    team: string;
    address: string;
    onBet: (team: string) => void;
  }
  
  const ClientBetButton: React.FC<ClientBetButtonProps> = ({ team, address, onBet }) => {
    return (
      <button 
        className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => onBet(address)}
      >
        Bet on {team}
      </button>
    );
  };
  
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

  const handleBet = (address: string) => {
    // Handle betting logic here
    //TODO INTERACT WITH CONTRACT
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-lg font-bold">{team1} vs {team2}</h2>
      <p>Date: {matchDate}</p>
      <div className="flex justify-between items-center">
        <div>
          <span>Odds: {oddsTeam1}</span>
          <ClientBetButton team={team1} address={address1} onBet={handleBet} />
        </div>
        <div>
          <span>Odds: {oddsTeam2}</span>
          <ClientBetButton team={team2} address={address2} onBet={handleBet} />
        </div>
      </div>
    </div>
  );
};

export default Bet;
