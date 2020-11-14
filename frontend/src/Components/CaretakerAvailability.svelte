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
	let pettypes = [];
	let value = pettypes[0];
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

	function reload() {
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

		fetch(`http://18.139.110.246:3000/basedailyprices/pettypes`, {
			method: "GET",
		})
			.then((resp) => resp.json())
			.then((data) => (pettypes = data.pettypes));
	}

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
		startDate = endDate = petType = price = "";
	}

	function addEntry() {
		if (petType == "") {
			alert("Pet Type cannot be empty.");
		} else {
			const postAvailabilityCall = fetch(
				`http://18.139.110.246:3000/availabilities?usernamect=${username}&startdate=${startDate}&enddate=${endDate}&pettype=${petType}&price=${price}`,
				{
					method: "POST",
				}
			)
				.then((response1) => response1.json())
				.then((data1) => {
					pets = pets.concat({ startDate, endDate, petType, price });

					i = pets.length - 1;
					alert(`Success! Your availability has been posted!`);
					startDate = endDate = price = petType = "";
				})
				// .then(() => reload())
				.catch((error) => {
					if ((error = 403)) {
						alert(
							"Check that your input dates do not overlap with any existing availability dates."
						);
					}
					console.log("ERROR: " + error);
				});
		}
	}

	function update() {
		const index = pets.indexOf(selected);
		oldStartDate = selected.startDate;
		oldEndDate = selected.endDate;
		oldPetType = selected.petType;
		oldPrice = selected.price;

		const patchAvailabiityCall = fetch(
			`http://18.139.110.246:3000/availabilities?startdate=${oldStartDate}&enddate=${oldEndDate}&pettype=${oldPetType}&price=${oldPrice}&usernamect=${username}&newstartdate=${startDate}&newenddate=${endDate}&newpettype=${petType}&newprice=${price}`,
			{
				method: "PATCH",
			}
		)
			.then((response) => response.json())
			.then((data) => {
				selected.startDate = startDate;
				selected.endDate = endDate;
				selected.petType = petType;
				selected.price = price;
				pets = pets;
				alert("Your availability is successfully updated!");
			})
			// .then(() => reload())
			.catch((error) => {
				alert(
					"Please ensure that the new updated values do not conflict with existing entries."
				);
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
			// .then(() => reload())
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

		await fetch(`http://18.139.110.246:3000/basedailyprices/pettypes`, {
			method: "GET",
		})
			.then((resp) => resp.json())
			.then((data) => (pettypes = data.pettypes));

		// Setting limit for date selection
		var today = new Date();
		var enddate = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1; //January is 0!
		var yyyy = today.getFullYear();
		var yyyyend = today.getFullYear() + 2;
		if (dd < 10) {
			dd = "0" + dd;
		}
		if (mm < 10) {
			mm = "0" + mm;
		}

		today = yyyy + "-" + mm + "-" + dd;
		enddate = yyyyend + "-" + mm + "-" + dd;

		document.getElementById("start").setAttribute("min", today);
		document.getElementById("start").setAttribute("max", enddate);
		document.getElementById("end").setAttribute("min", today);
		document.getElementById("end").setAttribute("max", enddate);
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
		<label for="search">Search by pet type </label>
		<input placeholder="eg. dog" bind:value={prefix} />
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

		<label for="start">Start</label>
		<input
			class="short-input"
			type="date"
			id="start"
			min="1899-01-01"
			max="1899-01-01"
			bind:value={startDate}
			placeholder="start date" />

		<label for="end">End </label>
		<input
			class="short-input"
			type="date"
			id="end"
			min="1899-01-01"
			max="1899-01-01"
			bind:value={endDate}
			placeholder="end date" />

		<label for="category">Category</label>
		<select id="category" bind:value={petType}>
			<option value="none" selected disable hidden>Select an Option</option>
			{#each pettypes as type}
				<option value={type.pettype} selected="selected">{type.pettype}</option>
			{/each}
		</select>
		<label for="price">Price</label><input
			id="price"
			bind:value={price}
			placeholder="price" />
	</div>
	<div class="float-container">
		<div class="buttons">
			<button
				style="color: black; background-color:cornflowerblue"
				on:click={addEntry}>Add</button>
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
