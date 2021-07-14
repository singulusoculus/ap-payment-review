<script>
    import Icon from './Icon.svelte'
    export let version
</script>

<style>
	footer {
		background-color: var(--prime);
		background-image: url("/images/banner.gif");
		color: #fff;
		padding: 0 5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
	}

	.contact-support {
		display: flex;
		align-items: center;
	}

	.contact-support-text {
		margin-left: .5rem;
	}
</style>

	<footer>
		<span>
			© {new Date().getFullYear()} Company AP Payment Review | v{version}
		</span>
		<span>
			<a href="mailto:support@company.com" class=contact-support>
				<Icon name="mail" />
				<span class=contact-support-text>Contact Support</span>
			</a>
		</span>
	</footer>