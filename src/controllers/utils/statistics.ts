import { Player } from '../../models/player';

export function getStatistics (players: Player[]) {
    const playerCount = players.length;
  
    // Calculer le ratio de parties gagnées pour chaque pays
    const countryWinsRatio: { [countryCode: string]: number } = {};
    players.forEach((player) => {
      const countryCode = player.country.code;
      const wins = player.data.last.filter((result) => result === 1).length;
      const totalGames = player.data.last.length;
      const winsRatio = totalGames > 0 ? wins / totalGames : 0;
  
      if (!countryWinsRatio[countryCode] || winsRatio > countryWinsRatio[countryCode]) {
        countryWinsRatio[countryCode] = winsRatio;
      }
    });
  
    // Trouver le pays avec le plus grand ratio de parties gagnées
    const countryWithHighestWinsRatio = Object.keys(countryWinsRatio).reduce((a, b) =>
      countryWinsRatio[a] > countryWinsRatio[b] ? a : b
    );
  
    // Calculer l'IMC moyen de tous les joueurs
    const totalWeight = players.reduce((sum, player) => sum + player.data.weight, 0);
    const averageIMC = totalWeight / playerCount;
  
    // Calculer la médiane de la taille des joueurs
    const sortedHeights = players.map((player) => player.data.height).sort((a, b) => a - b);
    const medianHeight =
      playerCount % 2 === 0
        ? (sortedHeights[playerCount / 2 - 1] + sortedHeights[playerCount / 2]) / 2
        : sortedHeights[Math.floor(playerCount / 2)];
  
    return {
      countryWithHighestWinsRatio,
      averageIMC,
      medianHeight,
    };
  }