const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model');

router.post('/register', (req, res) => {
	let user = req.body;
	const hash = bcrypt.hashSync(user.password, 10);
	user.password = hash;
	Users.add(user)
		.then((saved) => {
			res.status(201).json(saved);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ errorMessage: 'registeration does not work' });
		});
});

router.post('/login', (req, res) => {
	let { username, password } = req.body;
	Users.findBy({ username })
		.first()
		.then((user) => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = signToken(user);
				res.status(200).json({
					token,
					message : `Welcome to Spotify Song Suggester ${user.username}!`,
				});
			} else {
				res.status(401).json({ message: 'Invalid Credentials' });
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ errorMessage: 'Could not login' });
		});
});

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	const user = await Users.findById(id);

	if (user) {
		Users.deleteAccount(id)
			.then(() => res.status(200).json({ message: 'Account deleted.' }))
			.catch((err) => console.log(err));
	} else {
		res.status(403).json({ errorMessage: 'Could not delete account.' });
	}
});

function signToken(user) {
	const payload = {
		username : user.username,
	};
	const secret = process.env.JWT_SECRET || 'keep it safe.';
	const options = {
		expiresIn : '1h',
	};
	return jwt.sign(payload, secret, options);
}

module.exports = router;