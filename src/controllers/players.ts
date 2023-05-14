/** source/controllers/players.ts */
import { Request, Response } from 'express';
import { players } from '../data/players.json';
import { Player } from '../models/player';
import { getStatistics } from '../controllers/utils/statistics';



// Getting all players sorted
const getPlayers =  (req: Request, res: Response) => {
    const data: Player[] = players.sort((a: Player, b: Player) => b.data.rank - a.data.rank);
    return res.status(200).json(data);
  };
  

// Getting a single player
const getPlayer = (req: Request, res: Response) => {
    const id: string = req.params.id;
    const player = players.find((player) => player.id.toString() === id);
    
    if (player) {
      return res.status(200).json(player);
    } else {
      return res.status(404).json({ message: "Player not found" });
    }
  };
// Getting players statistics 
  const getPlayersStatistics = (req: Request, res: Response) => {
    return res.status(200).json(getStatistics(players));
};
  

export default { getPlayers, getPlayer, getPlayersStatistics };
