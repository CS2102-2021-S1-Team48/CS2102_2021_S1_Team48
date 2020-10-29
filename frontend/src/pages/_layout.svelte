<script>
  import Nav from "../Nav.svelte";
  import Sidebar from "../Sidebar.svelte";
</script>

<style>
  .contents {
    padding-left: 230px;
    width: 1024px;
  }
</style>

<Sidebar />
<div class="contents">
  <Nav />
  <slot />
</div>
