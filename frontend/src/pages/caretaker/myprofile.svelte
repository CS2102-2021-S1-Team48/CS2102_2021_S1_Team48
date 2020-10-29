<script>
	import Box from '../../Components/Box.svelte';
	import Modal from '../../Components/Modal.svelte';
	import CaretakerAvailability from '../../Components/CaretakerAvailability.svelte';
	let showAvailabilityModal = false;
	let showPriceModal = false;
	let showNextPg = false;
</script>

<style>
.button {
	border-radius: 10px;
	padding: 5px;
	width: 150px;
	margin-top: 20px;
	align-items:center;
}

span {
	margin-right: 10px;
	display:inline;
	justify-items: right;
}
h3{
	display:inline-flex;
	margin:inherit;
	width:300px;
}

</style>

<span>
<h3>
	Pet Days this Month:
</h3>
<button class="button" on:click="{() => showAvailabilityModal = true}">
	Availability
</button>
	{#if showAvailabilityModal}
	<Modal on:close="{() => showAvailabilityModal = false}">
		<h2 slot="header">
			Availability
		</h2>
		<div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 1em">
			<h6>Pet Types:
				<h5>

				</h5>
				<h8>
					Welsh Corgi, Husky, Golden Retriever, Poodle, Chihuahua
				</h8>
			
			</h6>
			<h2>
				insert calendar
			</h2>
		</div>
		
	</Modal>
	{/if}

	<button class="button" on:click="{() => showPriceModal = true}">
		Price List $
	</button>
	{#if showPriceModal}
	<Modal on:close="{() => showPriceModal = false}">
		<h2 slot="header">
			Price List	
		</h2>
			<CaretakerAvailability />
	</Modal>
	{/if}
</span>

	<div>
	<Box/>
</div>