<script>
  import { onMount } from "svelte";

  import { account } from "../../user.js";

  let username;

  let bids = [];

  const unsubscribe = account.subscribe((value) => {
    username = value;
  });

  onMount(async () => {
    await fetch(`http://18.139.110.246:3000/bids/accepted/${username}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => (bids = data.acceptedbids));
  });

  let selectedentry;
  let selectedpet;
  let selectedtransfer;

  const handleClear = (bid) => {
    // request Clear bid
    console.log(bid);

    // reload
    fetch(`http://18.139.110.246:3000/bids/accepted/${username}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => (bids = data.acceptedbids));
  };

  const handleCancel = (bid) => {
    // request cancel bid (remove from bid)
    console.log(bid);

    // reload
    fetch(`http://18.139.110.246:3000/bids/accepted/${username}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => (bids = data.acceptedbids));
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
    width: 103px;
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
    <li>Price</li>
    <li>Payment Method</li>
    <li>Status</li>
    <li>Action</li>
  </ul>
</nav>

<div>
  {#each bids as bid}
    <div class="bid">
      <div class="contents">{bid.username_caretaker}</div>
      <div class="contents">{bid.petname}</div>
      <div class="contents">{bid.startdate}</div>
      <div class="contents">{bid.enddate}</div>
      <div class="contents">PRICE</div>
      <div class="contents">{bid.paymentmethod}</div>
      <div class="contents">{bid.transfermethod}</div>
      {#if bid.transfermethod == 'deliver'}
        <div class="button">
          <button
            on:click={() => {
              handleClear(bid);
            }}>
            CLEAR
          </button>
        </div>
      {/if}
      {#if bid.status == 'Pending'}
        <div class="button">
          <button
            on:click={() => {
              handleCancel(bid);
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
