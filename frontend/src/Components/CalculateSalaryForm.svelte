<script>
  import { createEventDispatcher, onMount } from "svelte";
  //import { petlist } from "./user.js";

  const dispatch = createEventDispatcher();

  let start = "";
  let end = "";

  const handleSubmit = () => {
    if (start === "") {
      alert("Please enter start date!");
    } else if (end === "") {
      alert("Please enter end date!");
    } else if (start > end) {
      alert("Starting date cannot be after ending date!");
    } else {
      dispatch("getSalary", {
        start: start,
        end: end,
      });
    }
  };
</script>

<style>
  .short-input {
    width: 268px;
  }
  .top {
    display: flex;
    max-height: 200px;
    justify-content: space-evenly;
  }
</style>

<form on:submit|preventDefault={handleSubmit}>
  <div class="top">
    <div class="form-input">
      <label for="start">From</label>
      <input
        class="short-input"
        type="date"
        id="datefield"
        min="1899-01-01"
        bind:value={start} />
    </div>
    <div class="form-input">
      <label for="end">To</label>
      <input
        class="short-input"
        type="date"
        id="datefield2"
        min="1899-01-01"
        bind:value={end} />
    </div>
  </div>

  <button>Calculate</button>
</form>
