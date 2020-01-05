const express = require('express');
const Songs = require('./songs-model');
const router = express.Router();
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
router.get('/:id/favorites', (req, res) => {
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
router.post('/save', (req, res) => {
	const songs_id = req.body.songs_id;
	const users_id = req.users;
	// axios
	// 	.get(`https://song-suggester.herokuapp.com/get_like?seed=${songs_id || '0815epvZrVtP00ARbscMLt'}&num=0`)
	// 	.then((res) => {
	Songs.saveSongs(res.data, users_id, songs_id)
		.then(() => {
			res.status(201).json({ message: 'Song saved to favorites.' });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: 'Unable to save the song to favorites.' });
		});
});
// });
//
router.post('/add', (req, res) => {
	const songs = req.body;
	Songs.addFavSongs(songs)
		.then((songs) => {
			res.status(200).jsom(songs);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ errorMessage: 'Could not add to your favorites list' });
		});
});
// delete does not work
// router.delete('/:id', (req, res) => {
// 	Songs.deleteFavSongs(req.params.id)
// 		.then((count) => {
// 			if (count > 0) {
// 				res.status(200).json({ message: 'The song has been removed from your favorites.' });
// 			} else {
// 				res.status(400).json({ errorMessage: 'The post with the specified ID does not exist.' });
// 			}
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 			res.status(500).json({
// 				message : 'The song could not be removed',
// 			});
// 		});
// });
//this delete does not think I am logged in when I delete
router.delete('/:id/favorites/:songs_id', (req, res) => {
	const id = req.params.id;
	const songs_id = req.params.songs_id;
	if (id == req.users_id) {
		Songs.deleteFavSongs(id, songs_id)
			.then(() => res.status(200).json({ message: 'Song deleted from favorites!' }))
			.catch((err) => console.log(err));
	} else {
		return res.status(403).json({ message: 'You must be logged in to delete songs from your favorites list.' });
	}
});

module.exports = router;
