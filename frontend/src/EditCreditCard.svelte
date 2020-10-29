<script>
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();

  let cardnumber;
  let cardcvv;

  const handleSubmit = () => {
    const card = {
      cardnumber,
      cardcvv,
    };
    //console.log(password);
    dispatch("editCreditCard", card);
  };
</script>

<style>
  .form {
    border-bottom: 1px solid;
    padding: 20px;
  }
</style>

<div class="form">
  <form on:submit|preventDefault={handleSubmit}>
    <label for="cardnumber">Credit/Debit Card Number</label>
    <input
      type="number"
      name="cardnumber"
      id="cardnumber"
      placeholder="card number"
      bind:value={cardnumber} />

    <label for="cardcvv">Card CVV number</label>
    <input
      type="number"
      name="cardcvv"
      id="cardcvv"
      placeholder="CVV"
      bind:value={cardcvv} />

    <button>SUBMIT</button>
  </form>
</div>
