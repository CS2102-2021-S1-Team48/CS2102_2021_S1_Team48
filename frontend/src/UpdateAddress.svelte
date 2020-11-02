<script>
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();

  let address;
  let postal;

  const handleSubmit = () => {
    const newaddress = {
      address,
      postal,
    };
    //console.log(password);
    dispatch("updateAddress", newaddress);
  };
</script>

<style>
  .form {
    border-bottom: 1px solid;
    padding: 20px;
  }
  .long-input {
    width: 600px;
  }
</style>

<div class="form">
  <form on:submit|preventDefault={handleSubmit}>
    <label for="address">Address Line</label>
    <input
      class="long-input"
      type="text"
      name="address"
      id="address"
      placeholder="address"
      bind:value={address} />

    <label for="postal">Postal Code</label>
    <input
      type="number"
      name="postal"
      id="postal"
      placeholder="postal code"
      bind:value={postal} />

    <button>SUBMIT</button>
  </form>
</div>
