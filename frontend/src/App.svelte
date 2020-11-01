<script>
  import { Router } from "@sveltech/routify";
  import { routes } from "@sveltech/routify/tmp/routes";
  import { account } from "./user.js";

  // init
  let userObject = null;
  const userbase = window.userbase;
  let authPromise = userbase
    .init({ appId: "bf57ab82-a8b7-444b-adbe-95e4f5038522" })
    .then(({ user }) => (userObject = user));

  //auth
  let username, password;

  const signIn = () => {
    authPromise = userbase
      .signIn({ username, password })
      .then((user) => (userObject = user));
    account.set(username);
  };

  const signUp = () => (authPromise = userbase.signUp({ username, password }));

  const signOut = () =>
    (authPromise = userbase.signOut().then(() => (userObject = null)));

  $: console.log(userObject);
</script>

<style>
  .login {
    border: 1px solid;
    padding: 20px;
    max-width: 500px;
    margin: 0 auto;
  }
</style>

{#await authPromise}
  Loading...
{:then _}
  {#if !userObject}
    <div class="login">
      <h2>Sign in to PetPikker</h2>
      <form>
        <label for="username">Username</label>
        <input type="text" id="username" bind:value={username} />
        <label for="password">Password</label>
        <input type="text" id="password" bind:value={password} />

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
{:catch error}
  Error!
  {error}
{/await}
