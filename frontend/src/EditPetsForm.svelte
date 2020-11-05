<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { account } from "./user.js";

  let username;
  let pettypes = [];
  let petsjson = [];

  const dispatch = createEventDispatcher();

  const unsubscribe = account.subscribe((value) => {
    username = value;
  });

  onMount(async () => {
    await fetch(`http://18.139.110.246:3000/basedailyprices/pettypes`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => (pettypes = data.pettypes));

    //console.log(pettypes);

    await fetch(`http://18.139.110.246:3000/pets/${username}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => (petsjson = data.pets));

    //console.log(petsjson);
  });

  const handleSubmit = () => {
    //console.log(name, category, requirements);

    if (originalpet[0] === "none") {
      alert("Please select the pet that you wish to modify!");
    } else if (category === "none") {
      alert("Please select a category!");
    } else {
      name = originalpet[0];
      originalcategory = originalpet[1];

      dispatch("editPets", {
        petname: name,
        ogpetcategory: originalcategory,
        petcategory: category,
        petrequirements: requirements,
      });
    }
  };
  let originalpet;
  let name;
  let originalcategory;
  let category;
  let requirements;
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
    word-wrap: break-word;
    word-break: break-all;
  }
  .button {
    width: 100px;
  }
</style>

<form on:submit|preventDefault={handleSubmit}>
  <select class="short-input" id="petname" bind:value={originalpet}>
    <option value={['none', 'none']} selected disable hidden>
      Select a Pet
    </option>
    {#each petsjson as pet}
      <option value={[pet.petname, pet.pettype]}>{pet.petname}</option>
    {/each}
  </select>

  <select class="short-input" id="category" bind:value={category}>
    <option value="none" selected disable hidden>Select an Option</option>
    {#each pettypes as type}
      <option value={type.pettype}>{type.pettype}</option>
    {/each}
  </select>
  <textarea
    class="long-input"
    type="text"
    placeholder="requirements"
    wrap="soft"
    bind:value={requirements} />
  <button class="button">Save</button>
</form>
