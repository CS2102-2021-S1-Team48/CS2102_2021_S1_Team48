<script>
  import { account, acctype } from "../user.js";

  let usertype;
  let username;

  const unsubscribe = acctype.subscribe((value) => {
    usertype = value;
  });

  const unsubscribe2 = account.subscribe((value) => {
    username = value;
  });

  console.log("current username is: " + username);
</script>

<style>
  h1,
  h3 {
    text-align: center;
  }
</style>

{#if usertype === 'Admin'}
  <h1>Welcome back {username}</h1>

  <h3>Click on the Pricelist tab to manage minimum price list.</h3>

  <h3>Click on the Salary tab to calculate Salary to be paid to Caretakers.</h3>
{:else}
  <h1>Welcome back {username}</h1>

  <h3>Click on the Pet Owner tab to manage your pets.</h3>

  <h3>Click on the Care Taker tab to organise your pet care service.</h3>
{/if}
