<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;

    const signout = async () => {
        await fetch('/api/auth/signout');
        window.location.reload();
    }
</script>

<div class="w-full h-[100dvh] flex flex-col gap-2 justify-center items-center">
    <h1 class="text-4xl">Flag : flag_nist_is_so_good</h1>
    <button
        on:click={signout}
        class="px-2 py-1 border rounded transition text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
    >Signout</button>
</div>
