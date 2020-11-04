<script>
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();

  let currentpassword;
  let newpassword;
  let newpasswordretyped;

  const handleSubmit = () => {
    const password = newpassword;
    const retype = newpasswordretyped;
    const data = {
      current: currentpassword,
      new: newpassword,
    };
    if (password != retype) {
      alert("New password and retyped password must be the same!");
    } else {
      dispatch("changePassword", data);
    }
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
    <label for="currentpassword">Current Password</label>
    <input
      type="text"
      name="currentpassword"
      id="currentpassword"
      placeholder="current password"
      bind:value={currentpassword} />

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
