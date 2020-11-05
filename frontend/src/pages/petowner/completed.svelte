<script>
  import { onMount } from "svelte";
  import Modal from "../../Modal.svelte";
  import ReviewForm from "../../ReviewForm.svelte";
  import { account } from "../../user.js";

  let username;

  const unsubscribe = account.subscribe((value) => {
    username = value;
  });

  let showModal = false;
  let caretaker;
  let petname;
  let startdate;
  let enddate;

  let completed = [];

  onMount(async () => {
    await fetch(`http://18.139.110.246:3000/bids/accepted/${username}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => (completed = data.acceptedbids));
  });

  function selectUser(bid) {
    caretaker = bid.username_caretaker;
    petname = bid.petname;
    startdate = bid.startdate;
    enddate = bid.enddate;
    toggleModal();
  }

  function toggleModal() {
    showModal = !showModal;
  }

  function handleRating(e) {
    //console.log(e.detail);
    const values = e.detail;
    const rating = values.rating;
    const review = values.review;
    //console.log(values);

    // PATCH REVIEW
    fetch(
      `http://18.139.110.246:3000/bids/submitreviewandrating/${petname}/${username}/${caretaker}/${startdate}/${enddate}?rating=${rating}&review=${review}`,
      {
        method: "PATCH",
      }
    )
      .then((resp) => resp.json())
      .then((data) => console.log(data));

    toggleModal();
  }
</script>

<style>
  h1,
  h3 {
    text-align: center;
  }
  nav {
    border-bottom: 2px solid;
    border-top: 2px solid;
    margin-top: 15px;
  }
  li {
    display: inline-flex;
    width: 120px;
    padding: 9px;
    font-weight: 500;
    font-size: larger;
  }
  .contents {
    max-width: 180px;
    width: 128px;
    text-align: center;
    display: inline-flex;
    padding: 9px;
  }
  .entry {
    border: 1px solid;
    border-radius: 5px;
    margin: 5px 0;
  }
</style>

<Modal {showModal} on:click={toggleModal}>
  <h3>Leave a Rating</h3>
  <ReviewForm on:leaveRating={handleRating} />
</Modal>

<h1>Completed</h1>
<nav>
  <ul class="header">
    <li>Caretaker</li>
    <li>Pet</li>
    <li>Startdate</li>
    <li>Enddate</li>
    <li>Price</li>
    <li>Leave review</li>
  </ul>
</nav>

<div>
  {#each completed as entry}
    <div class="entry">
      <div class="contents">{entry.username_caretaker}</div>
      <div class="contents">{entry.petname}</div>
      <div class="contents">{entry.startdate}</div>
      <div class="contents">{entry.enddate}</div>
      <div class="contents">Price</div>
      {#if entry.rating === null}
        <div class="contents">
          <button on:click={selectUser(entry)}> Leave Review </button>
        </div>
      {/if}
    </div>
  {:else}
    <p>You have no Pets leaving</p>
  {/each}
</div>
