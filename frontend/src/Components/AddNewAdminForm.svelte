<script>
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();

  let adminusername = "";
  let adminpassword = "";
  let adminpasswordretyped = "";

  const handleSubmit = () => {
    if (
      adminusername === "" ||
      adminusername.match(/^ *$/) !== null ||
      adminpassword === "" ||
      adminpassword.match(/^ *$/) !== null ||
      adminpasswordretyped === "" ||
      adminpasswordretyped.match(/^ *$/) !== null
    ) {
      alert("Please fill in the required fields");
    } else if (adminpassword != adminpasswordretyped) {
      alert("New password and retyped password must be the same!");
    } else {
      const password = adminpassword;
      const retype = adminpasswordretyped;
      const data = {
        username: adminusername,
        password: adminpassword,
      };

      dispatch("addAdmin", data);
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
    <label for="adminusername">Admin Username</label>
    <input
      type="text"
      name="adminusername"
      id="adminusername"
      placeholder="username"
      bind:value={adminusername} />

    <label for="newpassword">Password</label>
    <input
      type="password"
      name="password"
      id="password"
      placeholder="password"
      bind:value={adminpassword} />

    <label for="passwordretype">Retype Password</label>
    <input
      type="password"
      name="passwordretyped"
      id="passwordretype"
      bind:value={adminpasswordretyped} />

    <button>CREATE ADMIN ACCOUNT</button>
  </form>
</div>
