import React from 'react';
interface ClientBetButtonProps {
    team: string;
    onBet: (team: string) => void;
  }
  
  const ClientBetButton: React.FC<ClientBetButtonProps> = ({ team, onBet }) => {
    return (
      <button 
        className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        // onClick={() => onBet(team)}
      >
        Bet on {team}
      </button>
    );
  };
  
interface BetProps {
  team1: string;
  team2: string;
  matchDate: string;
  oddsTeam1: number;
  oddsTeam2: number;
}

const Bet: React.FC<BetProps> = ({ team1, team2, matchDate, oddsTeam1, oddsTeam2 }) => {

  const handleBet = (team: string) => {
    // Handle betting logic here
    console.log(`Bet placed on ${team}`);
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-lg font-bold">{team1} vs {team2}</h2>
      <p>Date: {matchDate}</p>
      <div className="flex justify-between items-center">
        <div>
          <span>Odds: {oddsTeam1}</span>
          <ClientBetButton team={team1} onBet={handleBet} />
        </div>
        <div>
          <span>Odds: {oddsTeam2}</span>
          <ClientBetButton team={team1} onBet={handleBet} />
        </div>
      </div>
    </div>
  );
};

export default Bet;
