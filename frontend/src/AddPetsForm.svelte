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
  <input
    class="short-input"
    type="text"
    placeholder="category"
    bind:value={category} />
  <input
    class="long-input"
    type="text"
    placeholder="requirements"
    bind:value={requirements} />
  <button>Add Pet</button>
</form>
