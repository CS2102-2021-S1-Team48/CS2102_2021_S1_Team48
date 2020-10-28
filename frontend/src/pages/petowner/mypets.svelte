<script>
  import Addpets from "../../Addpets.svelte";
  import AddPetsForm from "../../AddPetsForm.svelte";

  let showModal = false;

  let pets = [
    { name: "Maple", category: "Corgi", requirements: "NIL", id: 1 },
    {
      name: "Rax",
      category: "T-Rex",
      requirements: "Daily teeth brushing",
      id: 2,
    },
    {
      name: "Morty",
      category: "Corgi",
      requirements: "Daily walks",
      id: 3,
    },
    {
      name: "Geordi",
      category: "Golden Retriever",
      requirements: "Potty in the evening",
      id: 3,
    },
  ];

  const handleClick = (name) => {
    //delete the pet
    pets = pets.filter((pet) => pet.name != name);
  };

  const toggleModal = () => {
    showModal = !showModal;
  };

  const addNewPet = (e) => {
    //console.log(e.detail);
    const pet = e.detail;
    pets = [...pets, pet];
    showModal = !showModal;
  };
</script>

<style>
  nav {
    border-bottom: 2px solid;
    border-top: 2px solid;
  }

  .header {
    list-style-type: none;
    margin: 10px 0;
    padding: 0;
  }

  li {
    display: inline-flex;
    width: 200px;
    padding: 10px;
    font-weight: 500;
    font-size: larger;
  }

  .contents {
    width: 200px;
    text-align: center;
    display: inline-flex;
    padding: 10px;
  }
  .contentsplus {
    width: 400px;
    text-align: center;
    display: inline-flex;
    padding: 10px;
  }
  .pet {
    border: 1px solid;
    border-radius: 5px;
    margin: 5px 0;
    padding: 10px;
  }
  .button {
    display: inline-flex;
    padding: 10px;
  }

  .title {
    max-width: 1024px;
  }

  h1 {
    text-align: center;
  }
</style>

<Addpets {showModal} on:click={toggleModal}>
  <h3>Add a New Pet</h3>
  <AddPetsForm on:addPet={addNewPet} />
</Addpets>
<div class="title">
  <h1>My Pets</h1>
</div>

<nav>
  <ul class="header">
    <li>Name</li>
    <li>Category</li>
    <li>Requirements</li>
  </ul>
</nav>

<div>
  {#each pets as pet}
    <div class="pet">
      <div class="contents">{pet.name}</div>
      <div class="contents">{pet.category}</div>
      <div class="contentsplus">{pet.requirements}</div>
      <div class="button">
        <button
          on:click={() => {
            handleClick(pet.name);
          }}>
          delete
        </button>
      </div>
    </div>
  {:else}
    <p>You have no pets.</p>
  {/each}
</div>
<button on:click={toggleModal}> New Pet</button>
