<script>
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();

  let currentpassword = "";
  let newpassword = "";
  let newpasswordretyped = "";

  const handleSubmit = () => {
    if (
      currentpassword === null ||
      currentpassword.match(/^ *$/) !== null ||
      newpassword === null ||
      newpassword.match(/^ *$/) !== null ||
      newpasswordretyped === null ||
      newpasswordretyped.match(/^ *$/) !== null
    ) {
      alert("Please fill in the required fields!");
    } else if (newpassword != newpasswordretyped) {
      alert("New password and retyped password must be the same!");
    } else {
      const password = newpassword;
      const retype = newpasswordretyped;
      const data = {
        current: currentpassword,
        new: newpassword,
      };

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
      type="password"
      name="currentpassword"
      id="currentpassword"
      placeholder="current password"
      bind:value={currentpassword} />

    <label for="newpassword">New Password</label>
    <input
      type="password"
      name="newpassword"
      id="newpassword"
      placeholder="new password"
      bind:value={newpassword} />

    <label for="newpasswordretype">Retype New Password</label>
    <input
      type="password"
      name="newpasswordretyped"
      id="newpasswordretype"
      bind:value={newpasswordretyped} />

    <button>CHANGE PASSWORD</button>
  </form>
</div>
