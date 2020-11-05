<script>
  import { onMount } from "svelte";
  import { account } from "../../user";
  let maxCanCareFor;
  $: emptySlots = maxCanCareFor - currentCaringFor;
  let owner = "";
  let caretaker = "";
  let payment = "";
  let pet = "";
  let type = "";
  let require = "";
  let from = "";
  let to = "";
  var daysLeft = 0;
  let username;

  const unsubscribe = account.subscribe((value) => {
    username = value;
  });

  let currentBids = [];
  function calculateDaysLeft(year, month, day) {
    month -= 1;
    daysLeft = Math.ceil(
      Math.abs(
        (new Date().getTime() -
          new Date(`${year}`, `${month}`, `${day}`).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    );
    return daysLeft;
  }

  function createCurrentEntries(event) {
    event.acceptedbids.map((obj) => {
      addCurrentEntry(obj);
    });
  }

  async function addCurrentEntry(event) {
    owner = event.username_petowner;
    caretaker = event.username_caretaker;
    payment = event.paymentmethod;
    pet = event.petname;
    type = event.pettype;
    from = event.startdate;
    to = event.enddate;
    require = event.requirements;
    var varDateParts = to.split("-");
    var dateYearPart = varDateParts[0];
    var dateMonthPart = varDateParts[1];
    var dateDayPart = varDateParts[2];
    const getPetLimitCall = await fetch(
      `http://18.139.110.246:3000/caretakers/${username}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        data.caretakers.map((obj) => {
          maxCanCareFor = obj.petlimit;
        });
      })
      .catch((error) => {
        console.log("ERROR: " + error);
      });
    daysLeft = calculateDaysLeft(dateYearPart, dateMonthPart, dateDayPart);
    currentBids.push({
      owner,
      payment,
      pet,
      type,
      require,
      from,
      to,
      caretaker,
      daysLeft,
    });
    currentBids = currentBids;
  }
  let currentCaringFor = currentBids.length;
  onMount(async () => {
    const getCurrentPetsCall = fetch(
      `http://18.139.110.246:3000/bids/accepteddaterange/parttimer/2020-01-01/2020-01-03`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        createCurrentEntries(data);
      })
      .catch((error) => {
        console.log("ERROR: " + error);
      });
  });
</script>

<style>
  .EmptySlot {
    height: 60px;
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
</nav>
