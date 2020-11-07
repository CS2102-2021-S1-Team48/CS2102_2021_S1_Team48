<script>
  import { url } from "@sveltech/routify";
  import { account } from "../../user";
  let username;

  const unsubscribe = account.subscribe((value) => {
    username = value;
  });
</script>

<style>
  h1 {
    text-align: center;
  }
</style>

<h1>Welcome Back {username}!</h1>
