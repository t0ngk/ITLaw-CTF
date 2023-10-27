<script lang="ts">
	import { goto } from "$app/navigation";


</script>

<div class="w-full h-[100dvh] flex flex-col justify-center items-center gap-2">
  <h1 class="text-4xl font-bold">Welcome to NIST CTF</h1>
  <div>
    <button on:click={() => {
      goto("/admin")
    }} class="p-2 border w-full rounded transition text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700">Start</button>
  </div>
</div>
