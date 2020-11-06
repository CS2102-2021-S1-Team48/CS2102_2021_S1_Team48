<script>
	import { onMount } from "svelte";
	import HeaderBox from "../Components/Header/HeaderBox.svelte";
	import { account } from "../../src/user";
	import { createEventDispatcher } from "svelte";
	let dispatch = createEventDispatcher();
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
	let oldStartDate = "";
	let oldEndDate = "";
	let oldPetType = "";
	let oldPrice = "";
	let i = 0;

	function createEntries(event) {
		event.availabilities.map((obj) => {
			createFromDb(obj);
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

	function createFromDb(event) {
		startDate = event.startdate;
		endDate = event.enddate;
		petType = event.pettype;
		price = event.price;
		pets.push({ startDate, endDate, petType, price });
		pets = pets;
		i = pets.length - 1;
		startDate = endDate = petType = price  = "";
	}

	function addEntry() {
		pets = pets.concat({ startDate, endDate, petType, price });
		i = pets.length - 1;

		const postAvailabilityCall = fetch(
			`http://18.139.110.246:3000/availabilities?usernamect=${username}&startdate=${startDate}&enddate=${endDate}&pettype=${petType}&price=${price}`,
			{
				method: "POST",
			}
		)
			.then((response1) => response1.json())
			.then((data1) => {
				alert(`Success! Your availability has been posted!`);
			})
			.catch((error) => {
				if ((error = 403)) {
					alert("Blank fields and repeated entries are not allowed.");
				}
				console.log("ERROR: " + error);
			});

		startDate = endDate = petType = price = "";
	}

	function update() {
		const index = pets.indexOf(selected);
		oldStartDate = pets[index].startDate;
		oldEndDate = pets[index].endDate;
		oldPetType = pets[index].petType;
		oldPrice = pets[index].price;
		selected.startDate = startDate;
		selected.endDate = endDate;
		selected.petType = petType;
		selected.price = price;
		pets = pets;
		if (petType.match(/[0-9]/) !== null || price.match(/^[^a-zA-Z0-9]+$/) !== true) {
			alert("Please ensure pet names contain no numerals and prices contain no special characters!");
			return;
    }
		console.log(
			oldStartDate,
			oldEndDate,
			oldPetType,
			price,
			startDate,
			endDate,
			selected.petType,
			selected.price
		);
		const patchAvailabiityCall = fetch(
			`http://18.139.110.246:3000/availabilities?startdate=${oldStartDate}&enddate=${oldEndDate}&pettype=${oldPetType}&price=${oldPrice}&usernamect=${username}&newstartdate=${selected.startDate}&newenddate=${selected.endDate}&newpettype=${selected.petType}&newprice=${selected.price}`,
			{
				method: "PATCH",
			}
		)
			.then((response) => response.json())
			.then((data) => {
				alert("Your availability is successfully updated!");
			})
			.catch((error) => {
				console.log("ERROR: " + error);
			});
	}

	function remove() {
		const index = pets.indexOf(selected);
		pets = [...pets.slice(0, index), ...pets.slice(index + 1)];

		const delAvailabilityCall = fetch(
			`http://18.139.110.246:3000/availabilities/${selected.startDate}/${selected.endDate}/${selected.petType}/${username}`,
			{
				method: "DELETE",
			}
		)
			.then((response) => response.json())
			.then((data) => {})
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
	}
	onMount(async () => {
		const getUsersAvailabilitiesCall = fetch(
			`http://18.139.110.246:3000/availabilities/usernamect/${username}`,
			{
				method: "GET",
			}
		)
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
			</div>
		</HeaderBox>
		<select bind:value={i} size={5}>
			{#each filteredPets as pet, i}
				<option value={i}>
					{pet.startDate},
					{pet.endDate},
					{pet.petType},
					{pet.price},
				</option>
			{/each}
		</select>

		<label><input required
				class="short-input"
				type="date"
				id="start"
				min="2020-10-29"
				max="2030-12-31"
				bind:value={startDate}
				placeholder="start date" />
		</label>
		<label><input required
				class="short-input"
				type="date"
				id="start"
				min="2020-10-29"
				max="2030-12-31"
				bind:value={endDate}
				placeholder="end date" />
		</label>
		<label><input required bind:value={petType} placeholder="pet type" /></label>
		<label><input required bind:value={price} placeholder="price" /></label>
	</div> 
	<div class="float-container">
		<div class="buttons">
			<button
				style="color: black; background-color:cornflowerblue"
				on:click={addEntry}
				disabled={!petType || !price || !selected}>Add</button>
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
