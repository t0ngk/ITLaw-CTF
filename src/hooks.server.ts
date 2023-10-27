import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/api/auth')) {
		return await resolve(event);
	}

  const {cookies, fetch} = event;

  const token = cookies.get('token');
  if (!token) {
    event.locals.user = null;
  }
  const res = await fetch('/api/auth/profile');
  if (res.ok) {
    event.locals.user = await res.json();
  } else {
    event.locals.user = null;
  }

	const response = await resolve(event);
	return response;
};
