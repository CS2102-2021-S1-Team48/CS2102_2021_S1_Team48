<script>
  import { url, isActive } from "@sveltech/routify";

  const links = [
    ["./petowner", "Pet Owner"],
    ["./caretaker", "Care Taker"],
  ];
</script>

<style>
  nav {
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
    max-width: 1024px;
  }

  ul {
    display: flex;
    margin: 0 auto;
    padding: 0;
    justify-content: space-evenly;
  }

  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: inline-flex;
    padding: 10px 20px;
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
</style>

<nav>
  <ul>
    {#each links as [path, name]}
      <li>
        <a href={$url(path)} class:selected={$isActive(path)}> {name} </a>
      </li>
    {/each}
  </ul>
</nav>
