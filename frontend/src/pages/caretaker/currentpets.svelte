<script>
  let maxCanCareFor = 5;
  let currentCaringFor = 2;
  let emptySlots = maxCanCareFor - currentCaringFor;
  let currentBids = [
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
  ];
</script>

<style>
  .EmptySlot {
    height: 100px;
    border: 1px solid #aaa;
    border-radius: 5px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
    background-color: rgb(134, 131, 131);
  }
  .FilledSlot {
    border: 1px solid;
    border-radius: 5px;
    margin: 5px 0;
    padding: 10px;
  }
  .contents {
    width: 100px;
    text-align: center;
    display: inline-flex;
    padding: 9px;
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
  {#if currentCaringFor}
    {#each currentBids as slots}
      <div class="FilledSlot">
        <div class="contents">
          <div class="subDescription">
            <div>{slots.pet}</div>
            <div style="font-style:italic">{slots.type}</div>
          </div>
        </div>
        <div class="contents">
          <div class="subDescription">
            <h10>Owned By:</h10>
            <div>{slots.owner}</div>
          </div>
        </div>
        <div class="contents">
          <div class="subDescription">
            <h10>Require:</h10>
            <div>{slots.require}</div>
          </div>
        </div>
        <div class="contents">
          <div class="subDescription">
            <div style="margin:auto">
              <h10>End Date:</h10>
              <div>{slots.to}</div>
            </div>
          </div>
        </div>
        <div class="contents">
          <div class="subDescription">
            <div style="margin:auto">
              <h10>Days Left:</h10>
              <div>{slots.daysLeft}</div>
            </div>
          </div>
        </div>
      </div>
    {/each}
    {#if emptySlots}
      {#each Array(emptySlots) as i}
        <div class="EmptySlot">
          <slot />
        </div>
      {/each}
    {/if}
  {/if}
</nav>
