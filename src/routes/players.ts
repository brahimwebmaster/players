/** source/routes/players.ts */
import express from 'express';
import controller from '../controllers/players';
const router = express.Router();

router.get('/players', controller.getPlayers);
router.get('/players/statistics', controller.getPlayersStatistics);
router.get('/players/:id', controller.getPlayer);



export = router;