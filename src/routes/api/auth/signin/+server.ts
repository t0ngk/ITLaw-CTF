import db from '$lib/server/db';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import jwt from 'jsonwebtoken';

const getUser = (username: string, password: string) => {
	return new Promise((resolve, reject) => {
		db.get(
			`SELECT * FROM users WHERE username = "${username}" AND password = "${password}" LIMIT 1`,
			(err: any, row: any) => {
				console.log(err, row);
				if (err) {
					console.log(err);
					reject(err);
				} else if (row) {
					resolve(row);
				} else {
					resolve(null);
				}
			}
		);
	});
};

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { username, password } = await request.json();
	if (!username || !password) {
		throw error(400, 'Please provide username and password');
	}
	let user = (await getUser(username, password)) as {
		id: number;
		username: string;
		password: string;
	} | null;
	if (!user) {
		throw error(401, 'Invalid username or password');
	}
	const token = jwt.sign(
		{
			id: user.id
		},
		'supersecret'
	);
	cookies.set('token', token, {
		path: '/',
	});
	return json({
		message: 'Login successful'
	});
};
