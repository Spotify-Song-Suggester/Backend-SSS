const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model');
const authenticate = require('../auth/auth-middleware');

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
					id       : user.id,
					username,
					token,
					message  : `Welcome to Spotify Song Suggester ${user.username}!`,
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

router.put('/:id', (req, res) => {
	const { id } = req.params;
	let { username, password } = req.body;
	const hash = bcrypt.hashSync(password, 10);
	password = hash;
	if (!username || !password) {
		return res.status(400).json({ error: 'Please provide username and password for the user.' });
	}
	Users.editAccount(id, { username, password })
		.then((updated) => {
			if (updated) {
				Users.findById(id).then((user) => res.status(200).json(user)).catch((err) => {
					console.log(err);
					res.status(500).json({ error: 'The user informatmion could not be retrieved.' });
				});
			} else {
				res.status(404).json({ error: `The user with the specified ID does not exist.` });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: 'The user information could not be modified.' });
		});
});

router.get('/', authenticate, (req, res) => {
	Users.find()
		.then((users) => {
			res.json(users);
		})
		.catch((err) => res.send(err));
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
