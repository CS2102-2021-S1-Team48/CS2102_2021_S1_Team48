<script>
  import { onMount } from "svelte";
  import ModalPO from "../../Components/ModalPO.svelte";
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

  let userrating;
  let userreview;

  let completed = [];

  onMount(async () => {
    // To BE CHANGED
    await fetch(
      `http://18.139.110.246:3000/bids/accepted/usernamect/${username}`,
      {
        method: "GET",
      }
    )
      .then((resp) => resp.json())
      .then((data) => (completed = data.bids));
  });

  function reload() {
    // To BE CHANGED
    fetch(`http://18.139.110.246:3000/bids/accepted/usernamect/${username}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => (completed = data.bids));
  }

  function selectUser(bid) {
    caretaker = bid.username_caretaker;
    petname = bid.petname;
    startdate = bid.startdate;
    enddate = bid.enddate;
    userrating = bid.rating;
    userreview = bid.review;
    toggleModal();
  }

  function toggleModal() {
    showModal = !showModal;
  }

  const remaining = (date) => {
    // today
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    var currdate = new Date(date);

    // calc diff
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    const utc1 = Date.UTC(
      currdate.getFullYear(),
      currdate.getMonth(),
      currdate.getDate()
    );
    const utc2 = Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    return Math.floor((utc1 - utc2) / _MS_PER_DAY);
  };
</script>

<style>
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
    width: 170px;
    padding: 9px;
    font-weight: 500;
    font-size: larger;
    justify-content: center;
  }
  .contents {
    max-width: 180px;
    width: 180px;
    text-align: center;
    display: inline-flex;
    padding: 9px;
    justify-content: center;
  }
  .entry {
    border: 1px solid;
    border-radius: 5px;
    margin: 5px 0;
  }
</style>

<ModalPO {showModal} on:click={toggleModal}>
  <h3>Ratings</h3>
  {#if userrating != null}
    <div>Rating: {userrating}</div>
  {:else}
    <div>Rating: No Rating</div>
  {/if}

  {#if userrating != null}
    <div>Review: {userreview}</div>
  {:else}
    <div>Review: No Review</div>
  {/if}
  <button on:click={toggleModal}>Close</button>
</ModalPO>

<nav>
  <ul class="header">
    <li>Pet Owner</li>
    <li>Pet</li>
    <li>Startdate</li>
    <li>Enddate</li>
    <li>Rating</li>
  </ul>
</nav>

<div>
  {#each completed as entry}
    {#if remaining(entry.enddate) <= 0}
      <div class="entry">
        <div class="contents">{entry.username_petowner}</div>
        <div class="contents">{entry.petname}</div>
        <div class="contents">{entry.startdate}</div>
        <div class="contents">{entry.enddate}</div>

        <div class="contents">
          <button on:click={selectUser(entry)}> VIEW </button>
        </div>
      </div>
    {/if}
  {:else}
    <p>You have no Completed jobs</p>
  {/each}
</div>
