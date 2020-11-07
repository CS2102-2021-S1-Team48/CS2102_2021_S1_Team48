<script>
  import { onMount } from "svelte";
  import { account } from "../../user";
  var daysLeft = 0;
  let owner = "";
  let caretaker = "";
  let payment = "";
  let pet = "";
  let type = "";
  let require = "";
  let from = "";
  let to = "";
  let total = "";
  let username;
  let SuccessfulBids = [];
  const unsubscribe = account.subscribe((value) => {
    username = value;
  });
  var todayDate = new Date();
  var tmrdate = new Date(
    todayDate.getFullYear(),
    todayDate.getMonth(),
    todayDate.getDate() + 1
  );

  function add_years(dt, n) {
    return new Date(dt.setFullYear(dt.getFullYear() + n));
  }
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
  var nextTwoYearsDate = convertDate(add_years(todayDate, 2));
  var tmrDate = convertDate(tmrdate);
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
  
  function createUpcomingEntries(event) {
    event.acceptedbids.map((obj) => {
      addUpcomingEntry(obj);
    });
  }
  function addUpcomingEntry(event) {
    owner = event.username_petowner;
    caretaker = event.username_caretaker;
    payment = event.paymentmethod;
    pet = event.petname;
    type = event.pettype;
    from = event.startdate;
    to = event.enddate;
    require = event.requirements;
    total = event.owed;
    var varDateParts = from.split("-");
    var dateYearPart = varDateParts[0];
    var dateMonthPart = varDateParts[1];
    var dateDayPart = varDateParts[2];
    daysLeft = calculateDaysLeft(dateYearPart, dateMonthPart, dateDayPart);

    SuccessfulBids.push({
      owner,
      payment,
      pet,
      type,
      require,
      from,
      to,
      caretaker,
      daysLeft,
      total,
    });
    SuccessfulBids = SuccessfulBids;
  }
  console.log(SuccessfulBids);
  onMount(async () => {
    const getUpcomingEntriesCall = fetch(
      `http://18.139.110.246:3000/bids/accepteddaterange/${username}/${tmrDate}/${nextTwoYearsDate}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        createUpcomingEntries(data);
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
  {:else}
    <p>You have no upcoming pets to petsit.</p>
  {/each}
</div>
