<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  let startDate1 = "";
  let endDate1 = "";
  let startDate2="";
  let endDate2="";
  const handleSubmit = () => {
    const workperiod = {
      startDate1: startDate1,
      endDate1: endDate1,
      startDate2: startDate2,
      endDate2: endDate2,
    };
    dispatch("addWorkPeriod", workperiod);
  };
</script>

<style>
  .short-input {
    width: 268px;
  }
</style>

<form on:submit|preventDefault={handleSubmit}>
  <p>Specify your first work period.</p>
  <input
    required
    class="short-input"
    type="date"
    id="start"
    min="2020-10-29"
    max="2030-12-31"
    bind:value={startDate1} />

  <input
    required
    class="short-input"
    type="date"
    id="start"
    min="2020-10-29"
    max="2030-12-31"
    bind:value={endDate1} />

  <p>Specify your second work period.</p>
  <input
    required
    class="short-input"
    type="date"
    id="start"
    min="2020-10-29"
    max="2030-12-31"
    bind:value={startDate2} />

  <input
    required
    class="short-input"
    type="date"
    id="start"
    min="2020-10-29"
    max="2030-12-31"
    bind:value={endDate2} />
  <button>Add Schedule</button>
</form>
