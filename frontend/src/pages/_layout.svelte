<script>
  import Nav from "../Components/Nav.svelte";
  import AdminNav from "../Components/AdminNav.svelte";
  import Sidebar from "../Components/Sidebar.svelte";
  import AdminSidebar from "../Components/AdminSidebar.svelte";
  import { acctype } from "../user.js";

  let usertype;

  const unsubscribe = acctype.subscribe((value) => {
    usertype = value;
  });
</script>

<style>
  .contents {
    padding-left: 230px;
    width: 1024px;
  }
</style>

{#if usertype === 'Admin'}
  <AdminSidebar />
  <div class="contents">
    <AdminNav />
    <slot />
  </div>
{:else}
  <Sidebar />
  <div class="contents">
    <Nav />
    <slot />
  </div>
{/if}
