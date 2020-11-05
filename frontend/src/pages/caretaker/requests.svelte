<script>
  import { account } from "../../user";
  import { onMount } from "svelte";
  let owner = "";
  let caretaker = "";
  let payment = "";
  let pet = "";
  let type = "";
  let require = "";
  let from = "";
  let to = "";
  let username;
  const unsubscribe = account.subscribe((value) => {
    username = value;
  });
  let bidRequests = [];
  function createRequestEntries(event) {
    // console.log(event);
    event.unacceptedbids.map((obj) => {
      addBidReq(obj);
    });
  }
  function addBidReq(event) {
    owner = event.username_petowner;
    caretaker = event.username_caretaker;
    require = event.requirements;
    payment = event.paymentmethod;
    pet = event.petname;
    type = event.pettype;
    from = event.startdate;
    to = event.enddate;
    bidRequests.push({
      owner,
      payment,
      pet,
      type,
      require,
      from,
      to,
      caretaker,
    });
    bidRequests = bidRequests;
  }
  function handleAccept(petname, petowner, caretaker, from, to) {
    const acceptBidCall = fetch(
      `http://18.139.110.246:3000/bids/accept/${petname}/${petowner}/${caretaker}/${from}/${to}`,
      {
        method: "PATCH",
      }
    )
      .then((response) => response.json())
      .then((data) => {})
      .then(() => reload());
  }

  function reload() {
    fetch(`http://18.139.110.246:3000/bids/unaccepted/${username}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => (bidRequests = data.unacceptedbids));
  }

  onMount(async () => {
    const getBidRequestsCall = fetch(
      `http://18.139.110.246:3000/bids/unaccepted/${username}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        createRequestEntries(data);
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
  .subDescription {
    display: table-row;
    justify-content: space-around;
  }
  h10 {
    font-style: oblique;
    font-weight: bold;
    font-style: italic;
    font-size: smaller;
  }
</style>

<nav>
  <ul class="header">
    <li>Owner</li>
    <li>Pet</li>
    <li>Type</li>
    <li>From</li>
    <li>To</li>
    <li>Action</li>
  </ul>
</nav>

<div>
  {#each bidRequests as bid}
    <div class="bid">
      <div class="contents">
        <div class="subDescription">
          <div>{bid.owner}</div>
          <div>
            <h10>Payment:</h10>
            {bid.payment}
          </div>
        </div>
      </div>
      <div class="contents">
        <div style="margin:auto">{bid.pet}</div>
      </div>
      <div class="contents">
        <div class="subDescription">
          <div>{bid.type}</div>

          <h10>Require:</h10>
          {bid.require}
        </div>
      </div>
      <div class="contents">{bid.from}</div>
      <div class="contents">{bid.to}</div>
      <!-- <div class="contents">
        <div style="margin:auto"><h8>S$</h8>{bid.bid}</div>
      </div> -->
      <div class="button">
        <div style="margin:auto">
          <button
            on:click={handleAccept(bid.pet, bid.owner, bid.caretaker, bid.from, bid.to)}>
            Accept
          </button>
        </div>
      </div>
    </div>
  {:else}
    <p>You have no bid requests.</p>
  {/each}
</div>
