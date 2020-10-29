<style>
	.box {
		width: 300px;
    height: 350px;
		border: 1px solid #aaa;
		border-radius: 25px;
		box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
		padding: 2em;
		margin: 1 1 1em 0;
    margin-top: 50px;
	}

	h2 {
		padding: 0 0 0.2em 0;
		margin: 0 0 1em 0;
    margin-top: 200px;
		border-bottom: 3px solid cornflowerblue
	}

	.CaretakerSince, .PetLimit {
		padding: 0 0 0 1.5em;
		background:  0 0 no-repeat;
		background-size: 20px 20px;
		margin: 0 0 0.5em 0;
		line-height: 1.2;
	}

	.CaretakerSince { background-image: url(tutorial/icons/map-marker.svg) }
	.PetLimit { background-image: url(Icons/pawprint.svg) }

	.CaretakerProfile { color: #999 }
  .ProfileName { color: black}
</style>
<article class="box">
	<h2>
		<slot name="name">
			<span class="ProfileName">Caretaker</span>
		</slot>
	</h2>

	<div class="CaretakerSince">
		<slot name="CaretakerSince">
			<span class="CaretakerProfile">Caretaker Since</span>
		</slot>
	</div>

	<div class="PetLimit">
		<slot name="Pet Limit description">
			<span class="CaretakerProfile">Pet Limit</span>
		</slot>
	</div>
</article>
