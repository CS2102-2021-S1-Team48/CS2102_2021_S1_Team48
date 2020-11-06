<script>
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();
  let startdate = "";
  let enddate = "";
  const handleSubmit = () => {

    if (startdate === "") {
      alert("Please enter start date!");
    } else if (enddate === "") {
      alert("Please enter end date!");
    } else if (startdate > enddate) {
      alert("Starting date cannot be after ending date!");
    } else {
      const schedule = {
        startDate: startdate,
        endDate: enddate,
      };
      dispatch("addSchedule", schedule);
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
  });
</script>

<style>
  .short-input {
    width: 200px;
  }
  .top {
    justify-content: center;
  }
</style>

<form on:submit|preventDefault={handleSubmit}>
  <div class="top">
    <div class="single">
      <label for="start">From</label>
      <input
        required
        class="short-input"
        type="date"
        id="start"
        min="1899-01-01"
        max="1899-01-01"
        bind:value={startdate} />
    </div>

    <div class="single">
      <label for="end">To</label>
      <input
        required
        class="short-input"
        type="date"
        id="end"
        min="1899-01-01"
        max="1899-01-01"
        bind:value={enddate} />
    </div>
  </div>
  <button>Add Leave Schedule</button>
</form>
