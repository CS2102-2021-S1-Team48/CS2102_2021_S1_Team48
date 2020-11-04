<script>
  import { Router } from "@sveltech/routify";
  import { routes } from "@sveltech/routify/tmp/routes";
  import { account, pricelist, pw } from "./user.js";

  // init
  let userObject = null;

  //auth
  let priceObject = null;
  let username = "";
  let password = "";
  let usertype = null;
  let usertypes = ["Admin", "Non-Admin"];

  function signOut() {
    userObject = null;
  }

  function signUp() {
    if (usertype === null) {
      alert("Please select User type!");
    } else if (
      username === null ||
      username.match(/^ *$/) !== null ||
      password === null ||
      password.match(/^ *$/) !== null
    ) {
      alert("Please fill in username/password!");
    } else if (usertype == "Non-Admin") {
      fetch(
        `http://18.139.110.246:3000/users?username=${username}&password=${password}`,
        {
          method: "POST",
        }
      )
        .then((resp) => resp.json())
        .then((data) => {
          alert("Account Created!");
        })
        .catch((e) => alert("Username Taken!"));
    } else {
      alert("Admin account cannot be created here!");
    }
  }

  function signIn() {
    if (usertype === null) {
      alert("Please select User type!");
    } else if (
      usertype === null ||
      username === null ||
      username.match(/^ *$/) !== null ||
      password === null ||
      password.match(/^ *$/) !== null
    ) {
      alert("Please fill in username/password!");
    } else if (usertype === "Non-Admin") {
      fetch(`http://18.139.110.246:3000/users/login/${username}/${password}`, {
        method: "POST",
      })
        .then((resp) => resp.json())
        .then((data) => {
          userObject = data;
          //console.log(data);
        })
        .catch((e) => alert("Invalid Username/Password!"));

      fetch("http://18.139.110.246:3000/basedailyprices?", {
        method: "GET",
      })
        .then((resp) => resp.json())
        .then((data) => {
          pricelist.set(data);
        });
    } else {
      fetch(`http://18.139.110.246:3000/admins/login/${username}/${password}`, {
        method: "POST",
      })
        .then((resp) => resp.json())
        .then((data) => {
          userObject = data;
        })
        .catch((e) => alert("Invalid Username/Password!"));

      fetch("http://18.139.110.246:3000/basedailyprices?", {
        method: "GET",
      })
        .then((resp) => resp.json())
        .then((data) => {
          pricelist.set(data);
        });
    }
    account.set(username);
    pw.set(password);
  }

  $: console.log(userObject);
</script>

<style>
  .login {
    border: 1px solid;
    padding: 20px;
    max-width: 500px;
    margin: 0 auto;
  }

  .selection {
    display: flex;
    flex-direction: row;
    padding: 0;
    margin: 0;
  }
  .input {
    margin: 20px;
  }
</style>

{#if !userObject}
  <div class="login">
    <h2>Sign in to PetPikker</h2>
    <form name="form1">
      <div class="selection">
        {#each usertypes as value}
          <div class="input">
            <label><input type="radio" {value} bind:group={usertype} />
              {value}</label>
          </div>
        {/each}
      </div>
      <label for="username">Username</label>
      <input type="text" name="username" id="username" bind:value={username} />
      <label for="password">Password</label>
      <input type="text" name="password" id="password" bind:value={password} />

      <button on:click={signIn} type="button">Log in </button>
      <button on:click={signUp} type="button">Sign up</button>
    </form>
  </div>
{:else}
  <Router {routes} />
  <button
    on:click={signOut}
    style="position:absolute; bottom:10px; left:75px;">Log out</button>
{/if}
