<script>
	import { onMount } from "svelte";
	import HeaderBox from "../Components/Header/HeaderBox.svelte";
	import { account } from "../../src/user";

	let username;
	const unsubscribe = account.subscribe((value) => {
		username = value;
	});
	let pets = [];
	let prefix = "";
	let startDate = "";
	let endDate = "";
	let petType = "";
	let price = "";
	let usernameCt = "";
	let oldStartDate = "";
	let oldEndDate = "";
	let oldPetType = "";
	let i = 0;

	function createEntries(event) {
		// console.log(event);
		event.availabilities.map((obj) => {
			create(obj);
		});
	}

	$: filteredPets = prefix
		? pets.filter((pet) => {
				const name = `${pet.petType}`;
				return name.toLowerCase().startsWith(prefix.toLowerCase());
		  })
		: pets;

	$: selected = filteredPets[i];

	$: reset_inputs(selected);

	function create(event) {
		startDate = event.startdate;
		oldStartDate = startDate;
		endDate = event.enddate;
		oldEndDate = endDate;
		petType = event.pettype;
		oldPetType = petType;
		price = event.price;
		usernameCt = event.username_caretaker;
		pets.push({ startDate, endDate, petType, price, usernameCt });
		pets = pets;
		i = pets.length - 1;
		startDate = endDate = petType = price = usernameCt = "";
	}
	
	function update() {
		selected.startDate = startDate;
		selected.endDate = endDate;
		selected.petType = petType;
		selected.price = price;
		pets = pets;
		
		const patchAvailabiityCall = fetch(`http://18.139.110.246:3000/availabilities/${oldStartDate}/${oldEndDate}/${oldPetType}/${usernameCt}?startdate=${startDate}&enddate=${endDate}&pettype=${selected.petType}&price=${selected.price}`, {
			method: "PATCH",
		})
			.then((response) => response.json())
			.then((data) => {
			})
			.catch((error) => {
				console.log("ERROR: " + error);
			});
	}

	function remove() {
		const index = pets.indexOf(selected);
		pets = [...pets.slice(0, index), ...pets.slice(index + 1)];
		
		const delAvailabilityCall = fetch(`http://18.139.110.246:3000/availabilities/${selected.startDate}/${selected.endDate}/${selected.petType}/${usernameCt}`, {
			method: "DELETE",
		})
			.then((response) => response.json())
			.then((data) => {
			})
			.catch((error) => {
				console.log("ERROR: " + error);
			});
		
			startDate = endDate = petType = price = "";
		i = Math.min(i, filteredPets.length - 2);

		
	}

	function reset_inputs(pet) {
		startDate = pet ? pet.startDate : "";
		endDate = pet ? pet.endDate : "";
		petType = pet ? pet.petType : "";
		price = pet ? pet.price : "";
		usernameCt = pet ? pet.usernameCt : "";
	}
	onMount(async () => {
		//`http://18.139.110.246:3000/availabilities/specific?usernamect=$(username)`
		const getPetDaysCall = fetch(`http://18.139.110.246:3000/availabilities/specific?usernamect=alexkoh`, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				createEntries(data);
			})
			.catch((error) => {
				console.log("ERROR: " + error);
			});
	});
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
		width: 39em;
		font-weight: smaller;
	}

	.buttons {
		clear: both;
	}
</style>

<div class="float-container">
	<div class="float-child">
		<input placeholder="search" bind:value={prefix} />
		<HeaderBox>
			<div
				style="display: -webkit-box; grid-template-columns: 2fr 2fr; grid-gap: 1em">
				Start Date
				<div>End Date</div>
				<div>Type</div>
				<div>price</div>
				<div>Caretaker Type</div>
			</div>
		</HeaderBox>
		<select bind:value={i} size={5}>
			{#each filteredPets as pet, i}
				<option value={i}>
					{pet.startDate},
					{pet.endDate},
					{pet.petType},
					{pet.price},
					{pet.usernameCt}
				</option>
			{/each}
		</select>

		<label><input
				class="short-input"
				type="date"
				id="start"
				min="2020-10-29"
				max="2030-12-31"
				bind:value={startDate}
				placeholder="start date" />
		</label>
		<label><input
				class="short-input"
				type="date"
				id="start"
				min="2020-10-29"
				max="2030-12-31"
				bind:value={endDate}
				placeholder="end date" />
		</label>
		<label><input bind:value={petType} placeholder="pet type" /></label>
		<label><input bind:value={price} placeholder="price" /></label>
		<label><input
				bind:value={usernameCt}
				placeholder="caretaker type" /></label>
	</div>
	<div class="float-container">
		<div class="buttons">
			<!-- <button
				style="color: black; background-color:cornflowerblue"
				on:click={create}
				disabled={!petType || !price || !startDate || !endDate || !usernameCt}>Add</button> -->
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
