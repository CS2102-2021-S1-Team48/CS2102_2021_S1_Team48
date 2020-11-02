<script>
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();

  let name;
  let category;
  let requirements;

  const handleSubmit = () => {
    //console.log(name, category, requirements);
    const pet = {
      name: name,
      category: category,
      requirements: requirements,
    };
    dispatch("addPet", pet);
  };

  let pettypes = [
    "Husky",
    "Corgi",
    "Dinosaur",
    "Duck",
    "Swine",
    "Dragon",
    "Ant",
  ];
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
    {#each pettypes as type}
      <option value={type}>{type}</option>
    {/each}
  </select>
  <input
    class="long-input"
    type="text"
    placeholder="requirements"
    bind:value={requirements} />
  <button>Add Pet</button>
</form>
