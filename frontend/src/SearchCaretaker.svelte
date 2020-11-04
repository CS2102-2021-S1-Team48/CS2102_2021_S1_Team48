<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { account } from "./user.js";

  let username;

  let dispatch = createEventDispatcher();

  let begin = "";
  let end = "";
  let petobj;
  //let payment = "Credit Card";
  let petsjson = [];

  const unsubscribe = account.subscribe((value) => {
    username = value;
  });

  onMount(async () => {
    await fetch(`http://18.139.110.246:3000/pets/${username}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => (petsjson = data.pets));

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "-" + mm + "-" + dd;
    document.getElementById("datefield").setAttribute("min", today);
    document.getElementById("datefield2").setAttribute("min", today);
  });

  const handleSubmit = () => {
    //console.log(begin, end, name, payment);
    if (begin === "") {
      alert("Please enter start date!");
    } else if (end === "") {
      alert("Please enter end date!");
    } else if (petobj[0] === "none") {
      alert("Please select pet");
    } else if (begin > end) {
      alert("Starting date cannot be after ending date!");
    } else {
      const request = {
        start: begin,
        end: end,
        name: petobj[0],
        category: petobj[1],
        //payment: payment,
      };
      dispatch("SearchCareTaker", request);
    }
  };
</script>

<style>
  .search-form {
    display: flex;
    flex-direction: column;
    padding: 20px 70px;
    border: 1px solid;
    border-radius: 10px;
  }

  .search-form-top {
    display: flex;
    max-width: 1024px;
    max-height: 200px;
    justify-content: space-evenly;
  }
  .search-form-bottom {
    padding: 10px 20px;
    display: flex;
    flex-direction: row;
    max-width: 1024px;
    max-height: 200px;
  }

  .form-input {
    padding: 0 20px;
    width: 333px;
  }

  .short-input {
    padding: 10px;
    width: 300px;
  }

  .search {
    padding: 20px;
    max-height: 65px;
    width: 300px;
  }

  .button-div {
    padding: 20px 0 0 610px;
    margin: 0;
  }
</style>

<form on:submit|preventDefault={handleSubmit}>
  <div class="search-form">
    <div class="search-form-top">
      <div class="form-input">
        <label for="start">From</label>
        <input
          class="short-input"
          type="date"
          id="datefield"
          min="1899-01-01"
          bind:value={begin} />
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
      <div class="form-input">
        <label for="pets">Your Pet</label>
        <select class="short-input" id="pets" bind:value={petobj}>
          <option value={['none', 'none']} selected disable hidden>
            Select a Pet
          </option>
          {#each petsjson as pet}
            <option value={[pet.petname, pet.pettype]}>{pet.petname}</option>
          {/each}
        </select>
      </div>
    </div>
    <div class="search-form-bottom">
      <div class="button-div"><button class="search"> Search </button></div>
    </div>
  </div>
</form>
