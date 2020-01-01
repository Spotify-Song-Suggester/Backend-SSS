const axios = require('axios');

const router = require('express').Router();

router.get('/', (req, res) => {
	const requestOptions = {
		headers : { accept: 'application/json' },
	};

	axios
		.get('https://icanhazdadjoke.com/search', requestOptions)
		.then((response) => {
			res.status(200).json(response.data.results);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Error Fetching Songs', error: err });
		});
});

module.exports = router;
