const express = require('express');
const Songs = require('./songs-model');
const router = express.Router();
const authenticate = require('../auth/auth-middleware');
// const axios = require('axios');

// gets all the songs
router.get('/', (req, res) => {
	Songs.getSongs()
		.then((songs) => {
			res.json(songs);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: 'Failed to get songs' });
		});
});

// gets the favorite songs with the specific user ID
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
//tells me unable to add song to favorites, do i need the api?
// router.post('/save', authenticate, (req, res) => {
// 	const songs_id = req.body.songs_id;
// 	const users_id = req.users;
// 	// axios
// 	// 	.get(`https://song-suggester.herokuapp.com/get_like?seed=${songs_id || '0815epvZrVtP00ARbscMLt'}&num=0`)
// 	// 	.then((res) => {
// 	Songs.saveSongs(res.data, users_id, songs_id)
// 		.then(() => {
// 			res.status(201).json({ message: 'Song saved to favorites.' });
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.status(500).json({ error: 'Unable to save the song to favorites.' });
// 		});
// });
// });
//
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
