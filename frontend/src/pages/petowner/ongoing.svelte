<script>
  import { onMount } from "svelte";
  import { account } from "../../user.js";

  let username;

  const unsubscribe = account.subscribe((value) => {
    username = value;
  });

  let bids = [];

  let leavingflag = false;
  let returningflag = false;

  onMount(async () => {
    await fetch(`http://18.139.110.246:3000/bids/accepted/${username}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => (bids = data.acceptedbids));
  });

  function reload() {
    fetch(`http://18.139.110.246:3000/bids/accepted/${username}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => (bids = data.acceptedbids));
  }

  const remaining = (date) => {
    // today
    var asiaTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Shanghai",
    });
    var today = new Date(asiaTime);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    var currdate = new Date(date);

    // calc diff
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    const utc1 = Date.UTC(
      currdate.getFullYear(),
      currdate.getMonth(),
      currdate.getDate()
    );
    const utc2 = Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    return Math.floor((utc1 - utc2) / _MS_PER_DAY);
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
    width: 100px;
    padding: 9px;
    font-weight: 500;
    font-size: larger;
  }
  .contents {
    width: 103px;
    text-align: center;
    display: inline-flex;
    padding: 9px;
  }
  .entry {
    border: 1px solid;
    border-radius: 5px;
    margin: 5px 0;
  }
</style>

<h1>Ongoing</h1>

<nav>
  <ul class="header">
    <li>Caretaker</li>
    <li>Pet</li>
    <li>Startdate</li>
    <li>Enddate</li>
    <li>Payment Method</li>
    <li>Days Left</li>
    <li>transfer Method</li>
  </ul>
</nav>

<div>
  {#each bids as comeback}
    {#if remaining(comeback.startdate) <= 0 && remaining(comeback.enddate) > 0}
      <div class="entry">
        <div class="contents">{comeback.username_caretaker}</div>
        <div class="contents">{comeback.petname}</div>
        <div class="contents">{comeback.startdate}</div>
        <div class="contents">{comeback.enddate}</div>
        <div class="contents">{comeback.paymentmethod}</div>
        <div class="contents">{remaining(comeback.enddate)}</div>
        <div class="contents">{comeback.transfermethod}</div>
      </div>
    {/if}
  {:else}
    <p>You have no Pets returning.</p>
  {/each}
</div>
