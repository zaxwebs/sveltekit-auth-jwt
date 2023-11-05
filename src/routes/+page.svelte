<script>
	export let data

	const { user } = data
</script>

<svelte:head>
	<title>Guarded page</title>
</svelte:head>

<section>
	<div>
		<h1>Guarded page</h1>
		<p>This page is guarded and will only be accessible to authenticated users.</p>

		<p>Hello {user.email}</p>
	</div>

	<a href="/logout">Logout</a>
</section>

<style>
	section > * {
		margin-bottom: 2rem;
	}
</style>
