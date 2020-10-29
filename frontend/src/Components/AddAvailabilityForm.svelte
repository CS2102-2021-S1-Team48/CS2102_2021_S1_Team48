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
  .application-form {
    display: flex;
    flex-direction: column;
    padding: 20px 70px;
    border: 1px solid;
    border-radius: 10px;
    background-color: #ffd962df;
  }
  .short-input {
    width: 268px;
  }
  .form-input {
    padding: 0 20px;
    width: 333px;
  }
 
  .application-form-top {
    display: flex;
    max-width: 1024px;
    max-height: 200px;
    justify-content: space-evenly;
  }

  .button {
    position: inline;
  }
</style>

<form on:submit|preventDefault={handleSubmit}>
  <div class="application-form">
    <div class="application-form-top">
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
    <div class="button">
      <button> Cancel</button>
      <button>Submit</button>
    </div>
  </div>
</form>
