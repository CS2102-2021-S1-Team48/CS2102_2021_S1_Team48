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

  /*
  function testloop() {
    pettypes.forEach((pettype) => {
      console.log(pettype);
    });
  }
*/
  /*
  const unsubscribe = petlist.subscribe((value) => {
    pettypes = value;
  });
  */

  let name = "";
  let category;
  let requirements;

  const handleSubmit = () => {
    //console.log(name, category, requirements);
    //Check empty fields
    if (name === "" || name.match(/^ *$/) !== null || category === "none") {
      alert("Please fill in the name and category!");
    } else {
      dispatch("addPets", {
        petname: name,
        petcategory: category,
        petrequirements: requirements,
      });
    }
  };
</script>

<style>
  .short-input {
    width: 268px;
  }

  .long-input {
    padding: 0 10px 70px;
    height: 100px;
    width: 540px;
    text-align: justify;
  }
</style>

<form on:submit|preventDefault={handleSubmit}>
  <input class="short-input" type="text" placeholder="name" bind:value={name} />

  <select class="short-input" id="paymentmethod" bind:value={category}>
    <option value="none" selected disable hidden>Select an Option</option>
    {#each pettypes as type}
      <option value={type.pettype} selected="selected">{type.pettype}</option>
    {/each}
  </select>
  <input
    class="long-input"
    type="text"
    placeholder="requirements"
    bind:value={requirements} />
  <button>Add Pet</button>
</form>
