const express = require('express');
const z = require('zod');
const { User, Account } = require('../db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');
const authMiddleware = require('../middlewares/auth');

const userRouter = express.Router();

const userSchema = z.object({
	username: z.string().min(1, 'username is required'),
	password: z.string().min(6, 'password must be atleast 6 characters'),
	firstName: z.string().min(1, 'first name is required'),
	lastName: z.string().min(1, 'last name is required'),
});

const updateSchema = z.object({
	firstName: z.string().optional(),
	password: z.string().optional(),
	lastName: z.string().optional(),
});

userRouter.get('/', (req, res) => {
	res.send('hello i am user');
});

userRouter.post('/signup', async (req, res) => {
	const result = userSchema.safeParse(req.body);

	if (!result.success) {
		return res.status(40).json(result.error.errors);
	}

	const { username, password, firstName, lastName } = result.data;

	const userExists = await User.findOne({
		username: req.body.username,
	});

	if (userExists) {
		res.json({
			msg: 'user already exists',
		});
		return;
	} else {
		try {
			const user = await User.create({
				username,
				password,
				firstName,
				lastName,
			});

			await Account.create({
				userId: user._id,
				username,
				balance: 1 + Math.random() * 10000
			})

			const token = jwt.sign(
				{
					userId: user._id,
				},
				JWT_SECRET
			);
			res.json({
				msg: 'user is craeted successfully',
				userID: token,
			});

			console.log("token: ", token)
		} catch (error) {
			res.json({
				msg: error,
			});
		}
	}
});

userRouter.get('/signin', authMiddleware, async (req, res) => {
	// const result = userSchema.safeParse(req.body)
	// if(!result.success){
	//     return res.status(400).json(result.error.errors)
	// }

	// const {username, password} = result.data

	//     const validUser = await User.findOne({
	//         username,
	//         password
	//     })

	//     if(validUser){
	//         res.status(200).json({
	//             msg: "user Signedin Successfully"
	//         })
	//     } else {

	//         res.status(404).json({
	//             msg: "wrong inputs"
	//         })
	//     }

	res.json({
		msg: 'successfully signed in',
	});
});

userRouter.put('/', authMiddleware, async (req, res) => {
	// const result = updateSchema.safeParse(req.body)

	// if(!result.success){
	//     return res.status(411).json({
	//         msg: "error whilte updating the information"
	//     })
	// }

	if (req.body.username) {
		return res.status(403).json({
			msg: 'we cannot update the username',
		});
	}
	if (req.body.password) password = req.body.password;
	if (req.body.firstName) firstName = req.body.firstName;
	if (req.body.lastName) lastName = req.body.lastName;

	try {
		const infoUpdated = await User.updateOne(
			{
				_id: req.userId,
			},
			{
				password,
				firstName,
				lastName,
			}
		);

		if (infoUpdated) {
			res.status(200).json({
				msg: 'data updated successfully',
			});
		}
	} catch (error) {
		res.status(500).json({ error });
	}
});

userRouter.get('/bulk', authMiddleware, async (req, res) => {
	const filter = req.query.filter;
	try {
		//Use ^${filter} in the $regex to dynamically match firstName values that start with the filter value.
		// $options: 'i' makes the match case-insensitive.

		const users = await User.find({
			$or: [
				{
					firstName: {
						$regex: filter,
						$options: `i`,
					},
				},
				{
					lastName: {
						$regex: filter,
						$options: `i`,
					},
				},
			],
		});

		if (users) {
			res.status(200).json({
				user: users.map(user => ({
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    _id: user._id
                }))
			});
		} else {
			res.status(404).json({
				msg: "user doesn't exist",
			});
		}
	} catch (error) {
		res.status(404).json({
			error
		});
	}
});

module.exports = userRouter;
