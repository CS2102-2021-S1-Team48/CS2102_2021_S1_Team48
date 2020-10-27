<script>
  import Nav from "../Nav.svelte";
  import Sidebar from "../Sidebar.svelte";
</script>

<style>
  .contents {
    float: right;
    width: 80%;
  }
</style>

<Sidebar />
<div class="contents">
  <Nav />
  <slot />
</div>
