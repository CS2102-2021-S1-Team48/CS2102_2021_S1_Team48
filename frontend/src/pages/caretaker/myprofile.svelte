<script>
	import Box from "../../Components/Box.svelte";
	import Modal from "../../Components/Modal.svelte";
	import CaretakerAvailability from "../../Components/CaretakerAvailability.svelte";
	import AddAvailabilityForm from "../../Components/AddAvailabilityForm.svelte";
	let showAvailabilityModal = false;
	let showPriceModal = false;
	let showModal = false;

	let reviewers = [
		{
			name: "Alex Koh",
			rating: "5/5",
			reviewMsg:
				"Amazing service from start to finish. From picking up of pets to returning of pets, Donald Trump has been easy to communicate. I’m sure my pets are happy with his care.",
		},
		{
			name: "Ash Ketchum",
			rating: "4/5",
			reviewMsg:
				"Wonderful to work with! Great communication! I had a very tedious workload and he was very gracious for taking on the pet caring for me. Also did a great job! Thank you for a wonderful experience and will be doing business with him again!",
		},
		{ name: "Bimlesh", rating: "3/5", reviewMsg: "shit" },
	];
	function toggle() {
		showAvailabilityModal = !showAvailabilityModal;
		showModal = !showModal;
	}
</script>

<style>
	nav {
		border-bottom: 2px solid;
		border-top: 2px solid;
		margin-top: 10px;
	}
	li {
		display: inline-flex;
		width: 200px;
		padding: 10px;
		font-weight: 500;
		font-size: smaller;
	}
	.button {
		border-radius: 10px;
		padding: 16px;
		width: 150px;
		margin-top: 5px;
		align-items: center;
		color: black;
		background-color: cornflowerblue;
	}
	.profile {
		float: left;
	}
	.review {
		float: right;
	}
	.review-header {
		font-size: large;
		align-items: center;
		margin-top: 40px;
		border-bottom: 2px solid;
	}
	.entry {
		border-bottom: 2px solid;
		border-radius: 5px;
		margin: 5px 0;
		padding: 10px;
		width: 600px;
	}
	.contents {
		border: 1px solid;
		display: table-row;
		width: 200px;
		text-align: left;
		padding: 25px;
	}
</style>

<nav>
	<ul class="header">
		<li>Pet Days this Month:</li>
		<li />
		<li>
			<button class="button" on:click={() => (showAvailabilityModal = true)}>
				Availability
			</button>
		</li>
		<li>
			<button class="button" on:click={() => (showPriceModal = true)}>
				Price List $
			</button>
		</li>
	</ul>
</nav>

<div>
	<div class="profile">
		<Box />
	</div>
	<div class="review">
		<div class="review-header">Reviews</div>

		{#each reviewers as reviewer}
			<div class="entry">
				<div class="contents">{reviewer.name}</div>
				<div class="contents">{reviewer.rating}</div>
				<div class="contents">{reviewer.reviewMsg}</div>
			</div>
		{/each}
	</div>
</div>

{#if showAvailabilityModal}
	<Modal on:close={() => (showAvailabilityModal = false)}>
		<h2 slot="header">Availability</h2>
		<div style="position: inline">
			<div style="float:left; margin: 20px">
				<li>Pet Types:</li>
				<div style="font-size: small">
					Welsh Corgi, Husky, Golden Retriever, Poodle, Chihuahua
				</div>
				<button
					style="color: black; background-color: cornflowerblue; width: 180px; margin-top: 20px"
					on:click={toggle}>
					Add New Availability
				</button>
			</div>
			<div style="float:right; margin: 20px">
				<li>Insert Calendar</li>
			</div>
		</div>
	</Modal>
{/if}

{#if showModal}
	<Modal on:close={() => (showModal = false)}>
		<h2 slot="header">Availability : New Availability</h2>
		<AddAvailabilityForm />
	</Modal>
{/if}

{#if showPriceModal}
	<Modal on:close={() => (showPriceModal = false)}>
		<h2 slot="header">Price List</h2>
		<CaretakerAvailability />
	</Modal>
{/if}
