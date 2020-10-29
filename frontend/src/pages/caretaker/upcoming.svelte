<script>
  let SuccessfulBids = [
    {
      owner: "Daniel",
      payment: "cash",
      pet: "Maple",
      type: "Cat",
      require: "brush daily",
      from: "2020-11-29",
      to: "2020-12-29",
      bid: 24,
      total: 224,
      daysLeft: 8,
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
      total: 84,
      daysLeft: 19,
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
      total: 456,
      daysLeft: 3,
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
    <li>Total</li>
    <li>Days Left</li>
  </ul>
</nav>

<div>
  {#each SuccessfulBids as bid}
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
      <div class="contents">
        <div style="margin:auto">
          <h8>S$</h8>{bid.total}
        </div>
      </div>
      <div class="contents">
        <div style="margin:auto">{bid.daysLeft}</div>
      </div>
    </div>
  {/each}
</div>
