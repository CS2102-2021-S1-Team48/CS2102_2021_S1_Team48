<script>
  let bidRequests = [
    {
      owner: "Daniel",
      pet: "Maple",
      type: "Cat",
      from: "2020-11-29",
      to: "2020-12-29",
      bid: 24,
    },
    {
      owner: "Jenny",
      pet: "Morty",
      type: "Dinosaur",
      from: "2020-11-29",
      to: "2020-12-29",
      bid: 26,
    },
    {
      owner: "Xiao Kai",
      pet: "Rax",
      type: "Rat",
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
      <div class="contents">{bid.owner}</div>
      <div class="contents">{bid.pet}</div>
      <div class="contents">{bid.type}</div>
      <div class="contents">{bid.from}</div>
      <div class="contents">{bid.to}</div>
      <div class="contents">{bid.bid}</div>
      <div class="button">
        <button
          on:click={() => {
            handleClear(bid.pet);
          }}>
          Accept
        </button>
      </div>
    </div>
  {/each}
</div>
