<script>
  export let showModalAddPrice = false;
</script>

<style>
  .backdrop {
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.8);
  }

  .modal {
    padding: 10px;
    border-radius: 10px;
    max-width: 600px;
    margin: 10% auto;
    text-align: center;
    background-color: white;
  }
</style>

{#if showModalAddPrice}
  <div class="backdrop" on:click|self>
    <div class="modal">
      <slot />
    </div>
  </div>
{/if}
