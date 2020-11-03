<script>
  import { account } from "../../user.js";

  let username;

  const unsubscribe = account.subscribe((value) => {
    username = value;
  });

  let showModal = false;

  let bids = [
    {
      caretaker: "Justin",
      pet: "Maple",
      start: "2020-11-29",
      end: "2020-12-29",
      bid: 24,
      payment: "Credit Card",
      status: "Unsuccessful",
    },
    {
      caretaker: "Justin",
      pet: "Morty",
      start: "2020-11-29",
      end: "2020-12-29",
      bid: 26,
      payment: "Credit Card",
      status: "Pending",
    },
  ];

  let selectedentry;
  let selectedpet;
  let selectedtransfer;

  const toggleModal = (entry, pet) => {
    selectedentry = entry;
    selectedpet = pet;
    showModal = !showModal;
  };

  const handleClear = (pet) => {
    //delete the bid
    bids = bids.filter((bid) => bid.pet != pet);
  };

  const handleCancel = (pet) => {
    //delete the bid
    bids = bids.filter((bid) => bid.pet != pet);
  };
</script>

<style>
  h1 {
    text-align: center;
  }
  nav {
    border-bottom: 2px solid;
    border-top: 2px solid;
    margin-top: 15px;
  }
  li {
    display: inline-flex;
    width: 100px;
    padding: 9px;
    font-weight: 500;
    font-size: larger;
  }
  .contents {
    width: 100px;
    text-align: center;
    display: inline-flex;
    padding: 9px;
  }
  .bid {
    border: 1px solid;
    border-radius: 5px;
    margin: 5px 0;
    padding: 10px;
  }
  .button {
    width: 100px;
    height: 60px;
    display: inline-flex;
    padding: 10px;
  }
</style>

<h1>Pending Bids</h1>

<nav>
  <ul class="header">
    <li>Caretaker</li>
    <li>Pet</li>
    <li>Startdate</li>
    <li>Enddate</li>
    <li>Your bid</li>

    <li>Payment Method</li>

    <li>Status</li>
    <li>Action</li>
  </ul>
</nav>

<div>
  {#each bids as bid}
    <div class="bid">
      <div class="contents">{bid.caretaker}</div>
      <div class="contents">{bid.pet}</div>
      <div class="contents">{bid.start}</div>
      <div class="contents">{bid.end}</div>
      <div class="contents">{bid.bid}</div>
      <div class="contents">{bid.payment}</div>
      <div class="contents">{bid.status}</div>
      {#if bid.status == 'Unsuccessful'}
        <div class="button">
          <button
            on:click={() => {
              handleClear(bid.pet);
            }}>
            CLEAR
          </button>
        </div>
      {/if}
      {#if bid.status == 'Pending'}
        <div class="button">
          <button
            on:click={() => {
              handleCancel(bid.pet);
            }}>
            CANCEL
          </button>
        </div>
      {/if}
    </div>
  {:else}
    <p>You have no bids.</p>
  {/each}
</div>
