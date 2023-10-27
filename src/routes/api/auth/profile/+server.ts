import type { RequestHandler } from './$types';
import db from '$lib/server/db';
import jwt from 'jsonwebtoken';
import { error, json } from '@sveltejs/kit';

const getUserById = (id: string) => {
	return new Promise((resolve, reject) => {
		db.get(`SELECT * FROM users WHERE id = "${id}" LIMIT 1`, (err: any, row: any) => {
			if (err) {
				reject(err);
			} else if (row) {
				resolve(row);
			} else {
				reject(null);
			}
		});
	});
};

export const GET: RequestHandler = async ({ cookies }) => {
	const token = cookies.get('token');
	if (!token) {
		throw error(400, 'Unauth');
	}
	const { id } = jwt.verify(token, 'supersecret') as { id: string; iat: number };
	const user = (await getUserById(id)) as { id: number; username: string };
	if (!user) {
		throw error(400, 'Unauth');
	}
	return json({
		id: user.id,
		username: user.username
	});
};
