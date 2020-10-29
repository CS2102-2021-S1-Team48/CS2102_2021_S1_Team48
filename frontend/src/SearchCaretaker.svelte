<script>
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();

  let begin;
  let end;
  let name;
  let payment = "Credit Card";

  let pets = [
    { name: "Maple", category: "Corgi", requirements: "NIL", id: 1 },
    {
      name: "Rax",
      category: "T-Rex",
      requirements: "Daily teeth brushing",
      id: 2,
    },
    {
      name: "Morty",
      category: "Corgi",
      requirements: "Daily walks",
      id: 3,
    },
  ];

  let options = ["Credit Card", "Cash"];

  const handleSubmit = () => {
    //console.log(begin, end, name, payment);
    const request = {
      start: begin,
      end: end,
      name: name,
      payment: payment,
    };
    dispatch("SearchCareTaker", request);
  };
</script>

<style>
  .search-form {
    display: flex;
    flex-direction: column;
    padding: 20px 70px;
    border: 1px solid;
    border-radius: 10px;
  }

  .search-form-top {
    display: flex;
    max-width: 1024px;
    max-height: 200px;
    justify-content: space-evenly;
  }
  .search-form-bottom {
    padding: 10px 20px;
    display: flex;
    flex-direction: row;
    max-width: 1024px;
    max-height: 200px;
  }
  .selection {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
  }

  .form-input {
    padding: 0 20px;
    width: 333px;
  }

  .short-input {
    padding: 10px;
    width: 300px;
  }

  .search {
    padding: 20px;
    max-height: 65px;
    width: 300px;
  }

  .button-div {
    padding: 20px 0 0 400px;
    margin: 0;
  }
</style>

<form on:submit|preventDefault={handleSubmit}>
  <div class="search-form">
    <div class="search-form-top">
      <div class="form-input">
        <label for="start">From</label>
        <input
          class="short-input"
          type="date"
          id="start"
          min="2020-10-29"
          max="2030-12-31"
          bind:value={begin} />
      </div>
      <div class="form-input">
        <label for="end">To</label>
        <input
          class="short-input"
          type="date"
          id="end"
          min="2020-10-29"
          max="2030-12-31"
          bind:value={end} />
      </div>
      <div class="form-input">
        <label for="pets">Your Pet</label>
        <select class="short-input" id="pets" bind:value={name}>
          {#each pets as pet}
            <option value={pet.name}>{pet.name}</option>
          {/each}
        </select>
      </div>
    </div>
    <div class="search-form-bottom">
      <div class="selection">
        <p>Payment Method:</p>
        {#each options as value}
          <label><input type="radio" {value} bind:group={payment} />
            {value}</label>
        {/each}
      </div>
      <div class="button-div"><button class="search"> Search </button></div>
    </div>
  </div>
</form>
