<script>
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();

  let newpassword;
  let newpasswordretyped;

  const handleSubmit = () => {
    const password = newpassword;
    //console.log(password);
    dispatch("changePassword", password);
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
    <label for="newpassword">New Password</label>
    <input
      type="text"
      name="newpassword"
      id="newpassword"
      placeholder="new password"
      bind:value={newpassword} />

    <label for="newpasswordretype">Retype New Password</label>
    <input
      type="text"
      name="newpasswordretyped"
      id="newpasswordretype"
      bind:value={newpasswordretyped} />

    <button>CHANGE PASSWORD</button>
  </form>
</div>
