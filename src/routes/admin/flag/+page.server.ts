import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({locals}) => {
    const {user} = locals;
    console.log(user)
    if (!user) {
        throw redirect(302 ,'/admin/');
    }
    return {};
}) satisfies PageServerLoad;
