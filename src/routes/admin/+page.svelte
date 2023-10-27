<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { PageData } from './$types';

	export let data: PageData;

	let errorMessage: string | null = null;

	const signin = async (event: Event) => {
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());
		const response = await fetch('/api/auth/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		if (response.ok) {
			errorMessage = null;
            window.location.reload();
			console.log(await response.json());
		} else {
			const { message } = await response.json();
			errorMessage = message;
		}
	};
</script>

<div class="w-full h-[100dvh] flex flex-col gap-2 justify-center items-center">
	<form
		on:submit|preventDefault={signin}
		class="w-full p-2 md:w-96 flex flex-col gap-2 justify-center items-center"
	>
		<h1 class="text-4xl w-full text-center">NIST - CTF</h1>
		<input type="text" name="username" class="p-2 border w-full" placeholder="username" />
		<input type="password" name="password" class="p-2 border w-full" placeholder="password" />
        {#if errorMessage}
            <p class="text-red-500 text-start w-full" transition:slide>{errorMessage}</p>
        {/if}
		<button
			type="submit"
			class="p-2 border w-full rounded transition text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
			>Login</button
		>
	</form>
</div>
