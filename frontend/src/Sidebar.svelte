<script>
  import { url, isActive } from "@sveltech/routify";

  const links = [
    ["/index", "Home"],
    ["/settings", "Settings"],
  ];

  const logout = [["/logout", "logout"]];
</script>

<style>
  nav {
    left: 0px;
    top: 0px;
    font-weight: 300;
    padding: 0 5em;
    position: absolute;
    float: left;
    background-color: #709ce2e5;
    height: 100%;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
    clear: both;
  }

  .selected {
    position: relative;
    display: inline-block;
  }

  .selected::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgba(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }

  .bottom {
    position: absolute;
    bottom: 0px;
  }
</style>

<nav>
  <div class="middle">
    <ul>
      {#each links as [path, name]}
        <li>
          <a href={$url(path)} class:selected={$isActive(path)}> {name} </a>
        </li>
      {/each}
    </ul>
  </div>

  <div class="bottom">
    <ul>
      {#each logout as [path, name]}
        <li>
          <a href={$url(path)} class:selected={$isActive(path)}> {name}</a>
        </li>
      {/each}
    </ul>
  </div>
</nav>
