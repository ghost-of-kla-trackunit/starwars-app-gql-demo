<script lang="ts">
	import { getGraphQL, type GQLRoot } from '$lib/graphqlapi';
	import { getREST } from '$lib/restapi';

	let graphql: Promise<GQLRoot> | null = null;
	let graphqlElement: HTMLPreElement | null = null;
	function loadGraphQL() {
		graphql = getGraphQL();
	}

	let rest: Promise<any> | null = null;
	let restElement: HTMLPreElement | null = null;
	function loadRest() {
		rest = getREST();
	}
</script>

<main>
	<section>
		<h1>GraphQL</h1>
		<button on:click={loadGraphQL}>Load with GraphQL</button>
		{#if graphqlElement && graphql}
			<p>Chars: {graphqlElement?.textContent?.length.toLocaleString()}</p>
		{/if}
		{#await graphql}
			<b aria-busy="true">Loading…</b>
		{:then data}
			<code>
				<pre bind:this={graphqlElement}>
{JSON.stringify(data, null, 2)}
            </pre>
			</code>
		{/await}
	</section>
	<section>
		<h1>REST</h1>
		<button on:click={loadRest} class="secondary">Load with REST</button>
		{#if restElement && rest}
			<p>Chars: {restElement?.textContent?.length.toLocaleString()}</p>
		{/if}
		{#await rest}
			<b aria-busy="true">Loading…</b>
		{:then data}
			<code>
				<pre bind:this={restElement}>
{JSON.stringify(data, null, 2)}
            </pre>
			</code>
		{/await}
		<section />
	</section>
</main>

<style>
	h1 {
		text-align: center;
	}
	main {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 1rem;
	}
	section {
		min-width: 650px;
	}
	code,
	pre {
		width: 100%;
	}
</style>
