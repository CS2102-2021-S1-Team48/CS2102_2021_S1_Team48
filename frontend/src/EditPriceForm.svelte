<script>
  import { createEventDispatcher, onMount } from "svelte";
  //import { petlist } from "./user.js";

  const dispatch = createEventDispatcher();

  let pettypes = [];

  onMount(async () => {
    await fetch(`http://18.139.110.246:3000/basedailyprices/pettypes`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => (pettypes = data.pettypes));

    //console.log(pettypes);
  });

  let category = "";
  let one = "";
  let two = "";
  let three = "";
  let four = "";
  let five = "";

  const handleSubmit = () => {
    //console.log(name, category, requirements);
    //Check empty fields
    if (category === "" || category.match(/^ *$/) !== null) {
      alert("Please select a Category!");
    } else if (
      one === "" ||
      two === "" ||
      three === "" ||
      four === "" ||
      five === ""
    ) {
      alert("Please fill in the prices");
    } else if (
      one > two ||
      one > three ||
      one > four ||
      one > five ||
      two > three ||
      two > four ||
      two > five ||
      three > four ||
      four > five
    ) {
      alert(
        "Prices of lower rating cannot be higher than higher rating. (eg. Price of 3 star rating cannot be higher than price of 4 star rating)"
      );
    } else {
      dispatch("editPrice", {
        category: category,
        one: one,
        two: two,
        three: three,
        four: four,
        five: five,
      });
    }
  };
</script>

<style>
  .short-input {
    width: 268px;
  }
</style>

<form on:submit|preventDefault={handleSubmit}>
  <select class="short-input" id="category" bind:value={category}>
    <option value="none" selected disable hidden>Select a Category</option>
    {#each pettypes as type}
      <option value={type.pettype}>{type.pettype}</option>
    {/each}
  </select>
  <div class="price-div">
    <label for="one">Price for rating of 1</label>
    <input class="price" type="number" id="one" bind:value={one} />
    <label for="two">Price for rating of 2</label>
    <input class="price" type="number" id="two" bind:value={two} />
    <label for="three">Price for rating of 3</label>
    <input class="price" type="number" id="three" bind:value={three} />
    <label for="four">Price for rating of 4</label>
    <input class="price" type="number" id="four" bind:value={four} />
    <label for="five">Price for rating of 5</label>
    <input class="price" type="number" id="five" bind:value={five} />
  </div>

  <button>Save</button>
</form>
