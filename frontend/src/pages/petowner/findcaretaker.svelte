<script>
  import SearchCaretaker from "../../SearchCaretaker.svelte";
  import { account } from "../../user.js";

  let username;

  const unsubscribe = account.subscribe((value) => {
    username = value;
  });

  let yourpaymethod;
  let yourtransfer;
  let yourbid;

  let availability = [
    { name: "Alex Koh", rating: "5/5", currentbid: 26 },
    { name: "Ash Ketchum", rating: "4/5", currentbid: 25 },
    { name: "Bimlesh", rating: "3/5", currentbid: 20 },
  ];

  let pmethod = ["Credit Card", "Cash"];

  let tmethod = ["PCS Building", "Delivery", "Pick Up"];

  const searchCT = (e) => {
    const request = e.detail;
    console.log(request);
  };

  const handleBid = (name) => {
    //delete the pet
    const bid = {
      caretakeruser: name,
      paymentmethod: yourpaymethod,
      transfermethod: yourtransfer,
      bid: yourbid,
    };
    console.log(bid);
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
    width: 220px;
    padding: 10px;
    font-weight: 500;
    font-size: larger;
  }

  .contents {
    width: 200px;
    text-align: center;
    display: inline-flex;
    padding: 20px;
  }
  .bid {
    border: 1px solid;
    border-radius: 5px;
    margin: 5px 0;
    padding: 10px;
  }
  .form {
    display: inline-flex;
    padding: 10px;
  }
  .form-input {
    width: 100px;
  }
  .outer {
    padding: 20px;
    display: flex;
    justify-content: center;
  }
  .options {
    padding: 0 20px;
  }
  .short-input {
    width: 200px;
  }
</style>

<h1>Find Available Caretaker</h1>

<SearchCaretaker on:SearchCareTaker={searchCT} />

<div class="outer">
  <div class="options">
    <label for="paymentmethod">Payment by</label>
    <select class="short-input" id="paymentmethod" bind:value={yourpaymethod}>
      {#each pmethod as method}
        <option value={method}>{method}</option>
      {/each}
    </select>
  </div>
  <div class="options">
    <label for="transfermethod">Pet Transfer by</label>
    <select class="short-input" id="transfermethod" bind:value={yourtransfer}>
      {#each tmethod as method}
        <option value={method}>{method}</option>
      {/each}
    </select>
  </div>
</div>

<nav>
  <ul class="header">
    <li>Name</li>
    <li>Rating</li>
    <li>Highest Bid</li>
    <li>Your Bid</li>
  </ul>
</nav>

<div>
  {#each availability as caretaker}
    <div class="bid">
      <div class="contents">{caretaker.name}</div>
      <div class="contents">{caretaker.rating}</div>
      <div class="contents">{caretaker.currentbid}</div>
      <div class="form">
        <form on:submit|preventDefault>
          <input type="number" class="form-input" bind:value={yourbid} />
          <button
            on:click={() => {
              handleBid(caretaker.name);
            }}>
            BID
          </button>
        </form>
      </div>
    </div>
  {/each}
</div>
