<script>
	import { onMount } from "svelte";
	import { account } from "../user";
	import AddSchedule from "./AddSchedule.svelte";
	import AddScheduleForm from "./AddScheduleForm.svelte";

	export let limit = () => {};
	let username;
	$: isFT = 0;
	$: isEligible = false;

	const unsubscribe = account.subscribe((value) => {
		username = value;
	});

	let showModalAddSchedule = false;

	const toggleModalAddSchedule = () => {
		showModalAddSchedule = !showModalAddSchedule;
	};
	const addNewSchedule = (e) => {
		let schedule = e.detail;
		let scheduleStartDate = schedule.startDate;
		let scheduleEndDate = schedule.endDate;
		console.log(scheduleEndDate);
		const postLeaveScheduleCall = fetch(
			`http://18.139.110.246:3000/leaves/${username}/${scheduleStartDate}/${scheduleEndDate}`,
			{
				method: "POST",
			}
		)
			.then((response) => response.json())
			.then((data) => {
				alert("You have submitted your leave schedule successfully!");
			})
			.catch((error) => {
				console.log("ERROR: " + error);
			});
	};
	onMount(async () => {
		const getCaretakerTypeCall = fetch(
			`http://18.139.110.246:3000/caretakersft/${username}`,
			{
				method: "GET",
			}
		)
			.then((response) => response.json())
			.then((data) => {
				isFT = data.caretakerftinfo.length;
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
					console.log(isEligible);
				}
			})
			.catch((error) => {
				console.log("ERROR: " + error);
			});
	});
</script>

<style>
	.box {
		width: 250px;
		height: 300px;
		border: 1px solid #aaa;
		border-radius: 25px;
		box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
		padding: 2em;
		margin: 1 1 1em 0;
		margin-top: 50px;
	}

	h2 {
		padding: 0 0 0.2em 0;
		margin: 0 0 1em 0;
		border-bottom: 3px solid cornflowerblue;
	}

	.CaretakerSince,
	.PetLimit {
		padding: 0 0 0 1.5em;
		background: 0 0 no-repeat;
		background-size: 20px 20px;
		margin: 0 0 0.5em 0;
		line-height: 1.2;
	}

	.CaretakerSince {
		background-image: url(../upgrade.svg);
	}
	.PetLimit {
		background-image: url(../pawprint.svg);
	}

	.CaretakerProfile {
		color: #999;
	}
	.ProfileName {
		color: black;
	}
</style>

<AddSchedule {showModalAddSchedule} on:click={toggleModalAddSchedule}>
	<h3>Add a New Leave Schedule</h3>
	<AddScheduleForm on:addSchedule={addNewSchedule} />
</AddSchedule>

<article class="box">
	<h2>
		<slot class="CaretakerProfilePic" />
		<slot name="name">
			{#if isFT == 1}
				<span class="ProfileName">Full-time Caretaker</span>
			{:else}<span class="ProfileName">Part-time Caretaker</span>{/if}
		</slot>
	</h2>

	<div class="CaretakerSince">
		<slot name="CaretakerSince">
			{#if isEligible}
				<span class="CaretakerProfile">Eligible to be Full-Timer</span>
			{:else}<span></span>{/if}
		</slot>
	</div>

	<div class="PetLimit">
		<slot name="Pet Limit description">
			<span class="CaretakerProfile">Pet Limit</span>
			<span style="float:right">{limit}</span>
		</slot>
	</div>
	<div>
		<button on:click={toggleModalAddSchedule}>Add FT Leave Schedule</button>
	</div>
</article>
