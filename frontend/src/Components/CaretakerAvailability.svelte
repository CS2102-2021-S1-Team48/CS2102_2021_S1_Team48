<script>
	import HeaderBox from "../Components/Header/HeaderBox.svelte";
	let pets = [];
	let prefix = "";
	let petType = "";
	let price = "";
	let i = 0;

	$: filteredPets = prefix
		? pets.filter((pet) => {
				const name = `${pet.petType}`;
				return name.toLowerCase().startsWith(prefix.toLowerCase());
		  })
		: pets;

	$: selected = filteredPets[i];

	$: reset_inputs(selected);

	function create() {
		pets.push({ petType, price });
		pets = pets;
		i = pets.length - 1;
		petType = price = "";
	}

	function update() {
		selected.petType = petType;
		selected.price = price;
		pets = pets;
	}

	function remove() {
		const index = pets.indexOf(selected);
		pets = [...pets.slice(0, index), ...pets.slice(index + 1)];

		petType = price = "";
		i = Math.min(i, filteredPets.length - 2);
	}

	function reset_inputs(pet) {
		petType = pet ? pet.petType : "";
		price = pet ? pet.price : "";
	}
</script>

<style>
	* {
		font-family: inherit;
		font-size: inherit;
	}
	div {
		display: inherit;
		height: 100%;
		margin: 1px;
		align-items: center;
		justify-content: center;
		flex-direction: row;
	}
	.float-container {
		border: 3px solid #fff;
		padding: 20px;
	}

	.float-child {
		width: 50%;
		float: left;
		padding: 20px;
	}
	input {
		display: block;
		margin: 0 0 0.5em 0;
	}

	select {
		float: left;
		margin: 0 1em 1em 0;
		width: 14em;
	}

	.buttons {
		clear: both;
	}
</style>

<div class="float-container">
	<div class="float-child">
		<input placeholder="search" bind:value={prefix} />
		<HeaderBox>
			<div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 1em">
				Type
				<div>price</div>
			</div>
		</HeaderBox>
		<select bind:value={i} size={5}>
			{#each filteredPets as pet, i}
				<option value={i}>{pet.petType}, {pet.price}</option>
			{/each}
		</select>

		<label><input bind:value={petType} placeholder="pet type" /></label>
		<label><input bind:value={price} placeholder="price" /></label>
	</div>
	<div class="float-container">
		<div class="buttons">
			<button
				style="color: black; background-color:cornflowerblue"
				on:click={create}
				disabled={!petType || !price}>Add</button>
			<button
				style="color: black; background-color:cornflowerblue"
				on:click={update}
				disabled={!petType || !price || !selected}>Update</button>
			<button
				style="color: black; background-color:cornflowerblue"
				on:click={remove}
				disabled={!selected}>Delete</button>
		</div>
	</div>
</div>
