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

  const handleSubmit = () => {
    //console.log(name, category, requirements);
    //Check empty fields
    if (category === "" || category.match(/^ *$/) !== null) {
      alert("Please select a Category!");
    } else {
      dispatch("deletePrice", {
        category: category,
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

  <button>Delete</button>
</form>
