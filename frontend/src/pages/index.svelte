<script>
  import { account } from "../user.js";

  let username;

  const unsubscribe = account.subscribe((value) => {
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

<h1>Welcome back {username}</h1>

<h3>Click on the Pet Owner tab to manage your pets.</h3>

<h3>Click on the Care Taker tab to organise your pet care service.</h3>
