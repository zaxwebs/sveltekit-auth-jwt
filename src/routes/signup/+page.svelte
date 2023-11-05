<script>
	import { enhance } from '$app/forms'

	export let form
</script>

<svelte:head>
	<title>Sign Up</title>
</svelte:head>

<h1>Sign Up</h1>

<section>
	<form method="POST" use:enhance>
		<div class="group">
			<label for="email">Email</label>
			<input type="email" name="email" id="email" novalidate />
		</div>

		<div class="group">
			<label for="password">Password</label>
			<input type="password" name="password" id="password" novalidate />
		</div>

		<div class="submit-container">
			<button type="submit">Sign Up</button>
		</div>

		{#if form?.error}
			<div class="notice error">
				{form.error}
			</div>
		{/if}
	</form>

	<div class="actions">
		<a href="/login">Login</a>
	</div>
</section>
