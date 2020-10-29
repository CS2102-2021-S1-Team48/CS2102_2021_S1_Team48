<script>
  let bidRequests = [
    {
      owner: "Daniel",
      payment: "cash",
      pet: "Maple",
      type: "Cat",
      require: "brush daily",
      from: "2020-11-29",
      to: "2020-12-29",
      bid: 24,
    },
    {
      owner: "Jenny",
      payment: "credit card",
      pet: "Morty",
      type: "Dinosaur",
      require: "NIL",
      from: "2020-11-29",
      to: "2020-12-29",
      bid: 26,
    },
    {
      owner: "Xiao Kai",
      payment: "cash",
      pet: "Rax",
      type: "Rat",
      require: "bedtime songs",
      from: "2020-11-22",
      to: "2020-12-31",
      bid: 70,
    },
  ];
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
    <li>Bid</li>
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
      <div class="contents">{bid.pet}</div>
      <div class="contents">
        <div class="subDescription">
          <div>{bid.type}</div>

          <h10>Require:</h10>
          {bid.require}
        </div>
      </div>
      <div class="contents">{bid.from}</div>
      <div class="contents">{bid.to}</div>
      <div class="contents">{bid.bid}</div>
      <div class="button">
        <button
          on:click={() => {
            alert('Link this please!')
          }}>
          Accept
        </button>
      </div>
    </div>
  {/each}
</div>
