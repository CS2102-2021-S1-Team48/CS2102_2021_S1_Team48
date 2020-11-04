<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let pettypes = [];

  let name;
  let category;
  let requirements;

  const handleSubmit = () => {
    //console.log(name, category, requirements);

    dispatch("editPets", {
      petname: name,
      petcategory: category,
      petrequirements: requirements,
    });
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
    word-wrap: break-word;
    word-break: break-all;
  }
  .button {
    width: 100px;
  }
</style>

<form on:submit|preventDefault={handleSubmit}>
  <input class="short-input" type="text" placeholder="name" bind:value={name} />

  <select class="short-input" id="paymentmethod" bind:value={category}>
    {#each pettypes as type}
      <option value={type}>{type}</option>
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
