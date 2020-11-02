<script>
  import { account } from "../../user.js";

  let username;

  const unsubscribe = account.subscribe((value) => {
    username = value;
  });

  let completed = [
    {
      caretaker: "Mr Lim",
      pet: "Cheddar",
      start: "2020-09-19",
      end: "2020-09-25",
      price: 300,
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
    width: 120px;
    padding: 9px;
    font-weight: 500;
    font-size: larger;
  }
  .contents {
    width: 120px;
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

<h1>Upcoming Events</h1>
<h3>Leaving</h3>
<nav>
  <ul class="header">
    <li>Caretaker</li>
    <li>Pet</li>
    <li>Startdate</li>
    <li>Enddate</li>
    <li>Price</li>
    <li>Leave review</li>
  </ul>
</nav>

<div>
  {#each completed as entry}
    <div class="entry">
      <div class="contents">{entry.caretaker}</div>
      <div class="contents">{entry.pet}</div>
      <div class="contents">{entry.start}</div>
      <div class="contents">{entry.end}</div>
      <div class="contents">{entry.price}</div>
      <div class="contents"><button> Leave Review </button></div>
      <div class="contents"><button>CLEAR</button></div>
    </div>
  {:else}
    <p>You have no Pets leaving</p>
  {/each}
</div>
