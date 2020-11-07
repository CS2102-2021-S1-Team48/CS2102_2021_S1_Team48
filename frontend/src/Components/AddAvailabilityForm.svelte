<script>
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();
  let error_boolean = false;
  export let closeHandler = () => {};

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
    dispatch("newAvailability", availability);
  };

  function validateApplication(event) {
    let textbox = event.target;
    error_boolean = false;
    if (textbox.value === "") {
      textbox.setCustomValidity("Required input");
    } else if (textbox.validity.typeMismatch) {
      error_boolean = true;
      textbox.setCustomValidity("please ensure your input is valid");
    } else {
      textbox.setCustomValidity("");
    }
    return true;
  }
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

<form
  on:submit|preventDefault={handleSubmit}
  on:invalid={validateApplication}
  on:change={validateApplication}
  on:input={validateApplication}>
  <div class="application-form">
    <div class="application-form-top">
      <div class="form-input">
        <input
          required
          class="short-input"
          type="date"
          id="start"
          min="2020-10-29"
          max="2030-12-31"
          bind:value={startDate} />
        {#if error_boolean}
          <h8>Please select a start date</h8>
        {/if}
      </div>

      <div class="form-input">
        <input
          required
          class="short-input"
          type="date"
          id="start"
          min="2020-10-29"
          max="2030-12-31"
          bind:value={endDate} />
        {#if error_boolean}
          <h8>Please select an end date</h8>
        {/if}
      </div>
    </div>
    <input
      required
      class="short-input"
      type="text"
      placeholder="petType"
      bind:value={petType} />
    <input
      required
      class="short-input"
      type="text"
      placeholder="price"
      bind:value={price} />
    <div class="button">
      <button on:click={closeHandler}> Cancel</button>
      <button type="submit">Submit</button>
    </div>
  </div>
</form>
