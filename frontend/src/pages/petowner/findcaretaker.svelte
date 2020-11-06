<script>
  import SearchCaretaker from "../../Components/SearchCaretaker.svelte";
  import { account } from "../../user.js";

  let username;

  const unsubscribe = account.subscribe((value) => {
    username = value;
  });

  let availability = [];

  let yourpaymethod;
  let yourtransfer;
  let yourbid;
  let yourpetname;
  let yourpettype;
  let startdate;
  let enddate;

  let pmethod = ["Credit Card", "Cash"];

  let tmethod = ["PCS Building", "Delivery", "Pick Up"];

  const searchCT = (e) => {
    const request = e.detail;
    const petname = request.name;
    const pettype = request.category;
    const start = request.start;
    const end = request.end;
    console.log(pettype);

    yourpetname = petname;
    yourpettype = pettype;
    startdate = start;
    enddate = end;

    // GET AVAILABILITIES - TO BE ADDED: RATINGS
    fetch(
      `http://18.139.110.246:3000/availabilities/${startdate}/${enddate}/${pettype}`,
      {
        method: "GET",
      }
    )
      .then((resp) => resp.json())
      .then((data) => (availability = data.availabilities));

    //console.log(request);
  };

  const handleBid = (name) => {
    if (yourpaymethod === "none") {
      alert("Please select a payment method");
    } else if (yourtransfer === "none") {
      alert("Please select a transfer method");
    } else {
      const bid = {
        petownerusername: username,
        caretakeruser: name,
        petname: yourpetname,
        paymentmethod: yourpaymethod,
        transfermethod: yourtransfer,
        bid: yourbid,
        start: startdate,
        end: enddate,
      };
      console.log(bid);

      // POST BID TO BE FIXED
      fetch(
        `http://18.139.110.246:3000/bids/test?transfermethod=${yourtransfer}&paymentmethod=${yourpaymethod}&petname=${yourpetname}&usernamepo=${username}&usernamect=${name}&startdate=${startdate}&enddate=${enddate}&pettype=${yourpettype}`,
        {
          method: "POST",
        }
      )
        .then((resp) => resp.json())
        .then((data) => alert("Sent Bid!"))
        .catch((e) =>
          alert(`${yourpetname} cannot bid for ${name} for the selected dates!`)
        );
    }
  };
</script>

<style>
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
    width: 220px;
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

  .search-component {
    margin-top: 10px;
  }
</style>

<div class="search-component">
  <SearchCaretaker on:SearchCareTaker={searchCT} />
</div>
<div class="outer">
  <div class="options">
    <label for="paymentmethod">Payment by</label>
    <select class="short-input" id="paymentmethod" bind:value={yourpaymethod}>
      <option value="none" selected disable hidden>Select a method</option>
      {#each pmethod as method}
        <option value={method}>{method}</option>
      {/each}
    </select>
  </div>
  <div class="options">
    <label for="transfermethod">Pet Transfer by</label>
    <select class="short-input" id="transfermethod" bind:value={yourtransfer}>
      <option value="none" selected disable hidden>Select a method</option>
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
      <div class="contents">{caretaker.username_caretaker}</div>
      <div class="contents">rating to be added</div>
      <div class="contents">{caretaker.price}</div>
      <div class="form">
        <button
          on:click={() => {
            handleBid(caretaker.username_caretaker);
          }}>
          BID
        </button>
      </div>
    </div>
  {/each}
</div>
