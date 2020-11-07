<script>
	import Box from "../../Components/Box.svelte";
	import { onMount } from "svelte";
	import { account } from "../../user";
	import Modal from "../../Components/Modal.svelte";
	import CaretakerAvailability from "../../Components/CaretakerAvailability.svelte";

	let showAvailabilityModal = false;
	let petDaysThisMth = 0;
	$: refreshBox = false;
	export let limit = 0;
	$: isEligible = false;
	let name = "";
	let rating = "";
	let reviewMsg = "";
	var date = new Date();
	var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
	var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

	function handleChangeToFT() {
		if (isEligible) {
			fetch(`http://18.139.110.246:3000/caretakersft/${username}`, {
				method: "POST",
			})
				.then((response) => response.json())
				.then((data) => {
					alert("You just switched to full time!");
					refreshBox = true;
					isEligible = false;
				});
		} else {
			alert("You're not eligible to switch to full time!");
		}
	}

	function convertDate(date) {
		var yyyy = date.getFullYear().toString();
		var mm = (date.getMonth() + 1).toString();
		var dd = date.getDate().toString();

		var mmChars = mm.split("");
		var ddChars = dd.split("");

		return (
			yyyy +
			"-" +
			(mmChars[1] ? mm : "0" + mmChars[0]) +
			"-" +
			(ddChars[1] ? dd : "0" + ddChars[0])
		);
	}
	var fday = convertDate(firstDay);
	var lday = convertDate(lastDay);

	let reviewers = [];
	let username;

	const unsubscribe = account.subscribe((value) => {
		username = value;
	});

	function create(event) {
		name = event.username_petowner;
		rating = event.rating;
		reviewMsg = event.review;
		reviewers.push({ name, rating, reviewMsg });
		reviewers = reviewers;
	}

	onMount(async () => {
		const getPetDaysCall = fetch(
			`http://18.139.110.246:3000/bids/getpetdays/${username}?startdate=${fday}&enddate=${lday}`,
			{
				method: "GET",
			}
		)
			.then((response) => response.json())
			.then((data) => {
				data.caretakers.map((obj) => {
					petDaysThisMth = obj.sum;
				});
			})
			.catch((error) => {
				console.log("ERROR: " + error);
			});

		const getPetLimitCall = fetch(
			`http://18.139.110.246:3000/caretakers/${username}`,
			{
				method: "GET",
			}
		)
			.then((response) => response.json())
			.then((data) => {
				data.caretakers.map((obj) => {
					limit = obj.petlimit;
				});
			})
			.catch((error) => {
				console.log("ERROR: " + error);
			});
		const Reviews = fetch(
			`http://18.139.110.246:3000/bids/reviews/${username}`,
			{
				method: "GET",
			}
		)
			.then((response1) => response1.json())
			.then((data1) => {
				data1.reviews.map((obj) => {
					create(obj);
				});
			})
			.catch((error) => {
				console.log("ERROR: " + error);
			});
		const getIfEligibleToBeFTCall = fetch(
			`http://18.139.110.246:3000/caretakerspt/eligibilitytobeft/${username}`,
			{
				method: "GET",
			}
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.eligibility == "eligible") {
					isEligible = true;
				}
			})
			.catch((error) => {
				console.log("ERROR: " + error);
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
		font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
			sans-serif;
	}
</style>

<nav>
	<ul class="header">
		<li style="font-weight:bold">Pet Days this Month:</li>
		<li>{petDaysThisMth}</li>
		<li>
			<button class="button" on:click={handleChangeToFT}>
				Switch to FullTime
			</button>
		</li>
		<li>
			<button class="button" on:click={() => (showAvailabilityModal = true)}>
				Availability
			</button>
		</li>
	</ul>
</nav>

<div>
	{#if refreshBox}
		<div class="profile">
			<Box {limit} />
		</div>
	{:else}
		<div class="profile">
			<Box {limit} />
		</div>
	{/if}
	<div class="review">
		<div class="review-header">Reviews</div>

		{#each reviewers as reviewer}
			<div class="entry">
				<div class="contents">{reviewer.name}</div>
				<div class="contents">{reviewer.rating}</div>
				<div class="contents">
					<h8>"</h8>{reviewer.reviewMsg}
					<h8>"</h8>
				</div>
			</div>
		{:else}
			<p style="margin-left: 400px; padding:10px">You have no reviews yet.</p>
		{/each}
	</div>
</div>

{#if showAvailabilityModal}
	<Modal on:close={() => (showAvailabilityModal = false)}>
		<h2 slot="header">Availabilities</h2>
		<CaretakerAvailability />
	</Modal>
{/if}
