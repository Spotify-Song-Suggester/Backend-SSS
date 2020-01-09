const express = require('express');
const Songs = require('./songs-model');
const router = express.Router();
const authenticate = require('../auth/auth-middleware');
const axios = require('axios');
const songData = require('../../database/db_v2.json');

router.get('/', (req, res) => {
	const firstFifty = songData.slice(0, 51);
	console.log(firstFifty);
	res.status(200).json(firstFifty);
});

router.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const data = await axios.get(`https://spotify-song-suggestor.herokuapp.com/request/${id}`);
		console.log(data.data.results[0]);
		const results = data.data.results[0].map((songId) => {
			return songData.filter((item) => {
				return item.id === songId;
			})[0];
		});
		res.json(
			results.filter((result) => {
				return result != null;
			}),
		);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post('/save', authenticate, (req, res) => {
	const favorite = req.body;
	console.log(favorite);
	Songs.associateSongAccount(favorite)
		.then((song) => {
			res.status(200).json(song);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ errorMessage: 'Unable to save the song to your favorites list.' });
		});
});

router.get('/:id/favorites', authenticate, (req, res) => {
	const id = req.params.id;
	Songs.getFavSongs(id)
		.then((songs) => {
			res.status(200).json(songs);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.delete('/:users_id/favorites/:songs_id', authenticate, async (req, res) => {
	const users_id = req.params.users_id;
	const songs_id = req.params.songs_id;
	const favorites = await Songs.findByIdFavorites(users_id, songs_id);
	if (favorites) {
		Songs.deleteSongsFromFav(users_id, songs_id)
			.then(() => res.status(200).json({ message: 'Song deleted from favorites!' }))
			.catch((err) => console.log(err));
	} else {
		return res.status(403).json({ errorMessage: 'Song ID does not exist in favorites list.' });
	}
});

module.exports = router;
