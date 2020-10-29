<article class="nextPage">
  <slot>
    hey
  </slot>
</article>
<div class="nextPage-background"></div>
<style>
	.nextPage-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 150%;
		height: 150%;
    border-radius: 15px;
		background: rgba(0,0,0,0.3);
	}

	.nextPage {
		position: absolute;
		left: 50%;
		top: 50%;
		width: calc(100vw);
		max-width: 45em;
		max-height: calc(100vh);
		overflow: auto;
		transform: translate(-50%,-50%);
		padding: 1em;
		border-radius: 25px;
		background: white;
	}
</style>