<script>
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();

  let userrating;
  let userreview;

  let ratings = [1, 2, 3, 4, 5];

  const handleSubmit = () => {
    if (userrating === null) {
      alert("Please Select a rating from 1-5!");
    } else {
      //creates review;
      const rating = {
        rating: userrating,
        review: userreview,
      };
      //console.log(rating);

      dispatch("leaveRating", rating);
    }
  };
</script>

<style>
  .selection {
    display: flex;
    flex-direction: row;
    padding: 0;
    margin: 0;
    justify-content: center;
  }
  .search-form {
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    max-width: 1024px;
    max-height: 300px;
  }

  .button-div {
    padding: 20px 0 0 250px;
    margin-top: 0;
  }
  .input {
    margin: 20px;
  }
  .large {
    width: 300px;
    height: 150px;
    padding: 0 10px 100px;
    text-align: justify;
  }
</style>

<form on:submit|preventDefault={handleSubmit}>
  <div class="search-form">
    <div class="selection">
      {#each ratings as value}
        <div class="input">
          <label><input type="radio" {value} bind:group={userrating} />
            {value}</label>
        </div>
      {/each}
    </div>
    <div class="reviews">
      <input
        type="text"
        name="review"
        class="large"
        placeholder="leave a review..."
        bind:value={userreview} />
    </div>
    <div class="button-div"><button class="submit">SUBMIT</button></div>
  </div>
</form>
