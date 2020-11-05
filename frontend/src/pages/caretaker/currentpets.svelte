<script>
  import { onMount } from "svelte";
  import { account } from "../../user";
  let maxCanCareFor;
  let currentCaringFor = 0;
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

  var date = new Date();

  function convertDate(date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();

    var mmChars = mm.split("");
    var ddChars = dd.split("");

    return (
      yyyy +
      "-" +
      (mmChars[1] ? mm : "0" + mmChars[0]) +
      "-" +
      (ddChars[1] ? dd : "0" + ddChars[0])
    );
  }

  var todayDate = convertDate(date);

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

  function add_years(dt, n) {
    return new Date(dt.setFullYear(dt.getFullYear() + n));
  }

  var nextTenYearsDate = convertDate(add_years(date, 10));

  function createCurrentEntries(event) {
    event.acceptedbids.map((obj) => {
      addCurrentEntry(obj);
    });
  }
  function plusOne() {
    currentCaringFor += 1;
    return currentCaringFor;
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
  currentCaringFor = currentBids.length;
  $: emptySlots = maxCanCareFor - currentCaringFor;
  onMount(async () => {
    const getCurrentPetsCall = fetch(
      `http://18.139.110.246:3000/bids/accepteddaterange/${username}/${todayDate}/${todayDate}`,
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
  console.log(currentCaringFor);
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
    <div use={plusOne()} class="FilledSlot">
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
  {:else}
    <p>You are not currently taking care of any pets.</p>
  {/each}
  {#if (currentCaringFor = 0)}
    {#each Array(maxCanCareFor) as i}
      <div class="EmptySlot">
        <slot />
      </div>
    {/each}
  {/if}
  {#if emptySlots > 0}
    {#each Array(emptySlots) as i}
      <div class="EmptySlot">
        <slot />
      </div>
    {/each}
  {/if}
</nav>
