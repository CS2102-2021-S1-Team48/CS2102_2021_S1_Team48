<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  let startdate = "";
  let enddate = "";
  const handleSubmit = () => {
    const schedule = {
      startDate: startdate,
      endDate: enddate,
    };
    dispatch("addSchedule", schedule);
  };
</script>

<style>
  .short-input {
    width: 268px;
  }
</style>

<form on:submit|preventDefault={handleSubmit}>
  <input
    required
    class="short-input"
    type="date"
    id="start"
    min="2020-10-29"
    max="2030-12-31"
    bind:value={startdate} />

  <input
    required
    class="short-input"
    type="date"
    id="start"
    min="2020-10-29"
    max="2030-12-31"
    bind:value={enddate} />
  <button>Add Leave Schedule</button>
</form>
