<script>
    import Icon from './Icon.svelte'

    export let name = 'Logging in...'

    let visible = true
    let lastScroll = 0

    function handleScroll() {
        const scroll = window.pageYOffset;
        // this will make it reappear on scroll up -> visible = (scroll < 50 || scroll < lastScroll);
        visible = (scroll < 50 );
        lastScroll = scroll;
    }
    
</script>

<style>
    div {
        position: fixed;
        top: 0;
        left: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100vw;
		height: var(--nav-h);
		padding: 0 var(--side-nav);
		margin: 0 auto;
		background-color: white;
		box-shadow: 0 -0.4rem 0.9rem 0.2rem rgba(0,0,0,.5);
		font-family: var(--font);
		z-index: 100;
		user-select: none;
		transform: translate(0,calc(-100% - 1rem));
		transition: transform 0.2s;
	}

	div.visible {
		transform: none;
    }
    
    header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: var(--nav-h);
		padding: 0 var(--side-nav) 0 var(--side-nav);
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: transparent;
		transform: none;
		transition: none;
		box-shadow: none;
	}

	.primary {
		list-style: none;
		font-family: var(--font);
		margin: 0;
		line-height: 1;
    }

    img {
        height: 3rem;
    }

    
	ul {
		position: relative;
		padding: 0 3rem 0 0;
        display: flex;
        align-items: center;
		justify-content: space-between;
    }
    
    li {
        margin: 0 1rem;
        cursor: pointer;
    }

    li.user {
        cursor: default;
    }

    li:hover :global(svg) {
        color: var(--flash);
    }

    li.user:hover :global(svg) {
        color: var(--prime);
    }


</style>

<svelte:window on:scroll={handleScroll} />

<div class:visible="{visible}">
    <header>
        <img src="/images/placeholder.png" alt="">
        <h1>AP Payment Review</h1>
        <ul class="primary">
            <li class="user">
                <Icon name="user" size=22 />
                <span>{name}</span>
            </li>
        </ul>
    </header>
</div>

