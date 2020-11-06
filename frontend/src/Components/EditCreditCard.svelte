<script>
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();

  let cardnumber = "";
  let cardexpirymonth = "";
  let cardexpiryyear = "";

  const handleSubmit = () => {
    if (cardnumber === null || cardnumber.toString().length != 16) {
      alert("Invalid 16 digit Visa/Mastercard Credit Card number");
    } else if (
      cardexpirymonth === "" ||
      cardexpiryyear === "" ||
      cardexpirymonth.toString().length != 2 ||
      cardexpirymonth <= 0 ||
      cardexpirymonth > 12 ||
      cardexpiryyear.toString().length != 2
    ) {
      alert("Invalid Date");
    } else {
      const card = {
        num: cardnumber,
        expirymonth: cardexpirymonth,
        expiryyear: cardexpiryyear,
      };
      //console.log(password);
      dispatch("editCreditCard", card);
    }
  };
</script>

<style>
  .form {
    border-bottom: 1px solid;
    padding: 20px;
  }
  .date-input {
    width: 92px;
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

    <label for="cardexpiry">Card Expirydate</label>
    <div class="date">
      <input
        class="date-input"
        type="number"
        name="cardexpirymonth"
        id="cardexpirymonth"
        placeholder="mm"
        bind:value={cardexpirymonth} />
      <input
        class="date-input"
        type="number"
        name="cardexpiryyear"
        id="cardexpiryyear"
        placeholder="yy"
        bind:value={cardexpiryyear} />
    </div>

    <button>SUBMIT</button>
  </form>
</div>
