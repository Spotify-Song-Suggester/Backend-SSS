const express = require('express');
const Songs = require('./songs-model');
const router = express.Router();
const authenticate = require('../auth/auth-middleware');
const axios = require('axios');

router.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const data = await axios.get(`https://spotify-song-suggestor.herokuapp.com/request/${id}`);
		const results = data.data.results[0].map((songId) => {
			Songs.findById(songId).then((song) => {
				console.log(songId);
				console.log(song);
				return song;
			});
		});
		res.json(results);
	} catch (error) {
		res.status(500).json(error);
	}
	// axios
	// 	.get(`https://spotify-song-suggestor.herokuapp.com/request/${id}`)
	// 	.then((data) => {
	// 		console.log(data.data.results[0]);
	// 		const results = data.data.results[0].map(songId => {
	// 			return await Songs.findById(songId)
	// 		});

	// 		res.json(results);

	// 		// Songs.getSongs()
	// 		// 	.then((songs) => {
	// 		// 		res.json(songs);
	// 		// 	})
	// 		// 	.catch((err) => {
	// 		// 		console.log(err);
	// 		// 		res.status(500).json({ message: 'Failed to get songs' });
	// 		// 	});
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 		res.status(500).json(err);
	// 	});
});

// router.post('/track', (req, res) => {
// 	const track_id = req.body.track_id;
// 	axios
// 		.get(`https://spotify-song-suggestor.herokuapp.com/${track_id}`)
// 		.then((response) => {
// 			return res.json(response.data);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.status(500).json({ message: 'Unable to get suggested songs', error: err });
// 		});
// });

router.get('/:id/favorites', authenticate, (req, res) => {
	const id = req.params.id;
	// axios.get(`https://spotify-song-suggestor.herokuapp.com/${id}`).then((res) => {
	Songs.getFavSongs(id)
		.then((songs) => {
			res.status(200).json(songs);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});
// });

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
