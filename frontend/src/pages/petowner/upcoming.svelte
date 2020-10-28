<script>
  let leaving = [
    {
      caretaker: "Jamus",
      pet: "Cheddar",
      start: "2020-11-29",
      end: "2020-12-29",
      price: 480,
      payment: "Credit Card",
      remaining: 14,
      transfer: "Delivery",
    },
    {
      caretaker: "Hillary",
      pet: "Crumpet",
      start: "2020-11-25",
      end: "2020-12-01",
      price: 370,
      payment: "Cash",
      remaining: 10,
      transfer: "PCS Building",
    },
  ];

  let returning = [
    {
      caretaker: "Adi",
      pet: "Po-Po",
      start: "2020-10-19",
      end: "2020-11-25",
      price: 380,
      payment: "Credit Card",
      remaining: 10,
      transfer: "Delivery",
    },
  ];
</script>

<style>
  h1,
  h3 {
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
    width: 100px;
    text-align: center;
    display: inline-flex;
    padding: 9px;
  }
  .entry {
    border: 1px solid;
    border-radius: 5px;
    margin: 5px 0;
    padding: 10px;
  }
</style>

<h1>Upcoming Events</h1>
<h3>Leaving</h3>
<nav>
  <ul class="header">
    <li>Caretaker</li>
    <li>Pet</li>
    <li>Startdate</li>
    <li>Enddate</li>
    <li>Price</li>
    <li>Payment Method</li>
    <li>Days Left</li>
    <li>transfer Method</li>
  </ul>
</nav>

<div>
  {#each leaving as leave}
    <div class="entry">
      <div class="contents">{leave.caretaker}</div>
      <div class="contents">{leave.pet}</div>
      <div class="contents">{leave.start}</div>
      <div class="contents">{leave.end}</div>
      <div class="contents">{leave.price}</div>
      <div class="contents">{leave.payment}</div>
      <div class="contents">{leave.remaining}</div>
      <div class="contents">{leave.transfer}</div>
    </div>
  {:else}
    <p>You have no Pets leaving</p>
  {/each}
</div>

<h3>Returning</h3>
<nav>
  <ul class="header">
    <li>Caretaker</li>
    <li>Pet</li>
    <li>Startdate</li>
    <li>Enddate</li>
    <li>Price</li>
    <li>Payment Method</li>
    <li>Days Left</li>
    <li>transfer Method</li>
  </ul>
</nav>

<div>
  {#each returning as comeback}
    <div class="entry">
      <div class="contents">{comeback.caretaker}</div>
      <div class="contents">{comeback.pet}</div>
      <div class="contents">{comeback.start}</div>
      <div class="contents">{comeback.end}</div>
      <div class="contents">{comeback.price}</div>
      <div class="contents">{comeback.payment}</div>
      <div class="contents">{comeback.remaining}</div>
      <div class="contents">{comeback.transfer}</div>
    </div>
  {:else}
    <p>You have no Pets returning.</p>
  {/each}
</div>
