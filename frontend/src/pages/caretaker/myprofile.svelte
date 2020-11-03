<script>
	import Box from "../../Components/Box.svelte";
	import { onMount } from "svelte";
	import { account } from "../../user";
	import Modal from "../../Components/Modal.svelte";
	import CaretakerAvailability from "../../Components/CaretakerAvailability.svelte";
	import AddAvailabilityForm from "../../Components/AddAvailabilityForm.svelte";
	let showAvailabilityModal = false;
	let showPriceModal = false;
	let showModal = false;
	let petDaysThisMth = 0;
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
	let username;

	const unsubscribe = account.subscribe((value) => {
		username = value;
	});
	
	function toggle() {
		showAvailabilityModal = !showAvailabilityModal;
		showModal = !showModal;
	}
	async function addAvailabilityEntry(event) {
		//console.log(`Notify fired! Detail: ${event.detail.startDate, event.detail.endDate}`)

		let startdate = event.detail.startDate.replaceAll("-", "");
		// console.log(startdate);
		let enddate = event.detail.endDate.replaceAll("-", "");
		//console.log(enddate);
		let pettype = event.detail.petType;
		//console.log(pettype);
		let price = event.detail.price;
		//console.log(price);
		const postAvailabilityCall = await fetch(
			`http://18.139.110.246:3000/availabilities/alexkoh?startdate=${startdate}&enddate=${enddate}&pettype=${pettype}&price=${price}`,
			{
				method: "POST",
			}
		)
			.then((response1) => response1.json())
			.then((data1) => {
				console.log(data1);
			})
			.catch((error) => {
				console.log("ERROR: " + error);
			});
		// console.log(price);

	}
	onMount(async () => {
		//where?
		// const getPetDaysCall = fetch("https://api.mocki.io/v1/ce5f60e2", {
		// 	method: "GET",
		// })
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		petDaysThisMth = data.city;
		// 		// console.log(data.city);
		// 		// console.log(data.name);
		// 	})
		// 	.catch((error) => {
		// 		console.log("ERROR: " + error);
		// 	});

		// 	const postAvailabilityCall = fetch(
		// 	`http://18.139.110.246:3000/availabilities?startdate=${startdate}&enddate=${enddate}&pettype=${pettype}&price=${price}`,
		// 	{
		// 		method: "POST",
		// 	}
		// )
		// 	.then((response1) => response1.json())
		// 	.then((data1) => {

		// 	})
		// 	.catch((error) => {
		// 		console.log("ERROR: " + error);
		// 	});

		// const Reviews = fetch("http://18.139.110.246:3000/helloes", {
		// 	method: "GET",
		// })
		// 	.then((response1) => response1.json())
		// 	.then((data1) => {
		// 		console.log(data1);
		// 	})
		// 	.catch((error) => {
		// 		console.log("ERROR: " + error);
		// 	});

		// 	const Reviews1 = fetch("http://18.139.110.246:3000/users?username=wooohoooo&password=password1", {
		// 	method: "POST",

		// })
		// 	.then((response1) => response1.json())
		// 	.then((data1) => {
		// 		console.log(data1);
		// 	})
		// 	.catch((error) => {
		// 		console.log("ERROR: " + error);
		// 	});

		// 	const Reviews2 = fetch("http://18.139.110.246:3000/creditcards?cardnum=3495959959551235&expiry=20200521", {
		// 	method: "POST",
		// 	// body: JSON.stringify({
		// 	// 	username:'johndoe29',
		// 	// 	password:'password1'
		// 	// })
		// })
		// 	.then((response1) => response1.json())
		// 	.then((data1) => {
		// 		console.log(data1);
		// 	})
		// 	.catch((error) => {
		// 		console.log("ERROR: " + error);
		// 	});

		// 	const Reviews2 = fetch("http://18.139.110.246:3000/creditcards?currentcreditcardnum=0004501", {
		// 	method: "DELETE",
		// 	// body: JSON.stringify({
		// 	// 	username:'johndoe29',
		// 	// 	password:'password1'
		// 	// })
		// })
		// 	.then((response1) => response1.json())
		// 	.then((data1) => {
		// 		console.log(data1);
		// 	})
		// 	.catch((error) => {
		// 		console.log("ERROR: " + error);
		// 	});

		// const Reviews5 = fetch("http://18.139.110.246:3000/users/changeusername/sammie/IgotSalmonForDinner", {
		// 	method: "PATCH",

		// })
		// 	.then((response1) => response1.json())
		// 	.then((data1) => {
		// 		console.log(data1);
		// 	})
		// 	.catch((error) => {
		// 		console.log("ERROR: " + error);
		// 	});

		const PetfDays = fetch("https://api.mocki.io/v1/ce5f60e2", {
			method: "GET",
		}).then((response) => {
			// for (let [key, value] of response.headers) {
			// 	console.log(`${key} = ${value}`);
			// }
		});
	});
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
		background-color: lightgrey;
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
		<li style="font-weight:bold">Pet Days this Month:</li>
		<li>{petDaysThisMth}</li>
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
		<AddAvailabilityForm closeHandler={toggle} on:newAvailability={addAvailabilityEntry}/>
	</Modal>
{/if}

{#if showPriceModal}
	<Modal on:close={() => (showPriceModal = false)}>
		<h2 slot="header">Price List</h2>
		<CaretakerAvailability />
	</Modal>
{/if}
