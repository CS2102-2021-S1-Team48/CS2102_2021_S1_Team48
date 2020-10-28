<script>
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();

  let transfermethod;

  let options = [
    "Self-Delivery",
    "Caretaker Pick-up",
    "Transfer at PCS Building",
  ];

  const handleSubmit = () => {
    console.log(transfermethod);
    const transfer = {
      transfermethod,
    };
    dispatch("pickTransfer", transfer);
  };
</script>

<style>
  .selection {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
  }
  .search-form {
    padding: 10px 20px;
    display: flex;
    flex-direction: row;
    max-width: 1024px;
    max-height: 200px;
  }

  .button-div {
    padding: 20px 0 0 250px;
    margin-top: 125px;
  }
  .input {
    margin: 20px;
  }
</style>

<form on:submit|preventDefault={handleSubmit}>
  <div class="search-form">
    <div class="selection">
      {#each options as value}
        <div class="input">
          <label><input type="radio" {value} bind:group={transfermethod} />
            {value}</label>
        </div>
      {/each}
    </div>
    <div class="button-div"><button class="submit">SUBMIT</button></div>
  </div>
</form>
