<script>
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();

  let startDate;
  let endDate;
  let petType;
  let price;

  const handleSubmit = () => {
    const availability = {
      startDate: startDate,
      endDate: endDate,
      petType: petType,
      price: price,
    };
    dispatch("addAvailability", availability);
  };
</script>

<style>
  .short-input {
    width: 268px;
  }
  .form-input {
    padding: 0 20px;
    width: 333px;
  }
  /* .long-input {
    padding: 0 10px 70px;
    height: 100px;
    width: 540px;
    text-align: justify;
  } */
  .search-form-top {
    display: flex;
    max-width: 1024px;
    max-height: 200px;
    justify-content: space-evenly;
  }
</style>

<form on:submit|preventDefault={handleSubmit}>
  <div class="search-form-top">
    <div class="form-input">
      <input
        class="short-input"
        type="date"
        id="start"
        min="2020-10-29"
        max="2030-12-31"
        bind:value={startDate} />
    </div>

    <div class="form-input">
      <input
        class="short-input"
        type="date"
        id="start"
        min="2020-10-29"
        max="2030-12-31"
        bind:value={endDate} />
    </div>
  </div>
  <input
    class="short-input"
    type="text"
    placeholder="petType"
    bind:value={petType} />
  <input
    class="short-input"
    type="text"
    placeholder="price"
    bind:value={price} />
  <button>Submit</button>
</form>
