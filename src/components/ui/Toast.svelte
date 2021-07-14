<script>
	import { fade, fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import toasts  from '../store/toast'
	import Icon from './Icon.svelte'

	const handleActionClick = (toast) => {
		toast.func(...toast.parameters)
	}

</script>

<style>
	.toast-wrapper {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 4rem;
		text-align: center;
		z-index: 9999;
	}

	.toast-item {
		border-radius: 5px;
		padding: 12px 15px;
		margin: 10px auto;
		max-width: 450px;
		background: rgba(0, 0, 0, 0.7);
		color: #fff;
		position: relative
	}

	.close-icon {
		/* color: #fff; */
		position: absolute;
		right: 2px;
		top: 0px;
		cursor: pointer;
	}

	.actions {
		display: flex;
		justify-content: space-around;
		margin-top: 5px;
	}

	.action {
		font-weight: 500;
		color: #eeff41;
		text-transform: uppercase;
		/* color: var(--flash); */
		cursor: pointer;
	}
</style>

<div class="toast-wrapper">
	{#each $toasts as toast (toast._id)}
	<div class="toast-item" in:fly="{{delay: 0, duration: 300, x: 0, y: 50, opacity: 0.1, easing: backOut}}" out:fade={{duration:500, opacity: 0}}>
		{#if toast.closable}
		<div class="close-icon">
			<Icon name="close" size=15 on:clicked={toasts.removeToast(toast._id)}/>
		</div>
		{/if}
		<div class="message">
			{toast.msg}
		</div>
		{#if toast.actions.length > 0}
		<div class="actions">
			{#each toast.actions as action, i}
				{#if action.url}
					<a href="{action.url}" class="action" target="_blank">{action.name}</a>
				{:else}
					<span class="action" on:click={handleActionClick(toast.actions[i])}>{action.name}</span>
				{/if}
			{/each}
			<span class="action" on:click={toasts.removeToast(toast._id)}>{toast.closeText}</span>
		</div>
		{/if}
	</div>
	{/each}
</div>
