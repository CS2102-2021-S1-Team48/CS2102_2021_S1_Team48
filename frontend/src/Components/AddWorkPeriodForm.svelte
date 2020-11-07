<script>
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();
  let startDate1 = "";
  let endDate1 = "";
  let startDate2 = "";
  let endDate2 = "";
  const handleSubmit = () => {
    if (
      startDate1 === "" ||
      endDate1 === "" ||
      startDate2 === "" ||
      endDate2 === ""
    ) {
      alert("Please enter required dates!");
    } else if (startDate1 > endDate1 || startDate2 > endDate2) {
      alert("Starting date cannot be after ending date!");
    } else if (
      (startDate2 < endDate1 && startDate2 > startDate1) ||
      (startDate1 < endDate2 && startDate1 > startDate2)
    ) {
      alert("The two periods cannot overlap!");
    } else {
      const workperiod = {
        startDate1: startDate1,
        endDate1: endDate1,
        startDate2: startDate2,
        endDate2: endDate2,
      };
      dispatch("addWorkPeriod", workperiod);
    }
  };

  onMount(async () => {
    var today = new Date();
    var enddate = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var yyyyend = today.getFullYear() + 2;
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "-" + mm + "-" + dd;
    enddate = yyyyend + "-" + mm + "-" + dd;

    document.getElementById("start").setAttribute("min", today);
    document.getElementById("start").setAttribute("max", enddate);
    document.getElementById("end").setAttribute("min", today);
    document.getElementById("end").setAttribute("max", enddate);
    document.getElementById("start1").setAttribute("min", today);
    document.getElementById("start1").setAttribute("max", enddate);
    document.getElementById("end1").setAttribute("min", today);
    document.getElementById("end1").setAttribute("max", enddate);
  });
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
    min="1899-01-01"
    max="1899-01-01"
    bind:value={startDate1} />

  <input
    required
    class="short-input"
    type="date"
    id="end"
    min="1899-01-01"
    max="1899-01-01"
    bind:value={endDate1} />

  <p>Specify your second work period.</p>
  <input
    required
    class="short-input"
    type="date"
    id="start1"
    min="1899-01-01"
    max="1899-01-01"
    bind:value={startDate2} />

  <input
    required
    class="short-input"
    type="date"
    id="end1"
    min="1899-01-01"
    max="1899-01-01"
    bind:value={endDate2} />
  <button>Add Schedule</button>
</form>
