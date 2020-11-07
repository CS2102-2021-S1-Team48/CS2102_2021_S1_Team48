<script>
  import { onMount } from "svelte/internal";
  import Addpets from "../../Components/Addpets.svelte";
  import Editpets from "../../Components/Editpets.svelte";
  import AddPetsForm from "../../Components/AddPetsForm.svelte";
  import EditPetsForm from "../../Components/EditPetsForm.svelte";
  import { account } from "../../user.js";

  let username;
  let petsjson = [];

  const unsubscribe = account.subscribe((value) => {
    username = value;
  });

  let showModalAddPets = false;
  let showModalEditPets = false;

  onMount(async () => {
    await fetch(`http://18.139.110.246:3000/pets/${username}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => (petsjson = data.pets));

    //console.log(petsjson);
  });

  /*
  function genPets(petarr1, petarr2) {
    petarr1.forEach((element) => {
      const currelem = {
        name: element.petname,
        category: element.pettype,
        requirements: element.requirements,
      };
      petarr2.push(currelem);
    });
  }
*/

  const delPet = (name) => {
    //delete the pet
    fetch(`http://18.139.110.246:3000/pets/${name}/${username}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data))
      .then(() => reload());
    //reload petsjson
  };

  const editPet = () => {
    console.log("Edited");
  };

  function reload() {
    fetch(`http://18.139.110.246:3000/pets/${username}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => (petsjson = data.pets));
  }

  const toggleModalAddPets = () => {
    showModalAddPets = !showModalAddPets;
  };
  const toggleModalEditPets = () => {
    showModalEditPets = !showModalEditPets;
  };

  const addNewPet = (e) => {
    //console.log(e.detail);
    const pet = e.detail;
    const petname = pet.petname;
    const petcategory = pet.petcategory;
    const petrequirements = pet.petrequirements;
    fetch(
      `http://18.139.110.246:3000/pets?petname=${petname}&pettype=${petcategory}&requirements=${petrequirements}&usernamepo=${username}`,
      {
        method: "POST",
        // METHOD NOT ALLOWED
      }
    )
      .then((resp) => resp.json())
      .then((data) => {})
      .then(() => reload())
      .catch((e) => alert("Can't use pet name!"));

    showModalAddPets = !showModalAddPets;
  };

  async function editPets(e) {
    //console.log(e.detail);
    const pet = e.detail;
    const ogpetcategory = pet.ogpetcategory;
    const petname = pet.petname;
    const petcategory = pet.petcategory;
    const petrequirements = pet.petrequirements;

    fetch(
      `http://18.139.110.246:3000/pets?petname=${petname}&pettype=${ogpetcategory}&usernamepo=${username}&newpetname=${petname}&newpettype=${petcategory}&newrequirements=${petrequirements}`,
      {
        method: "PATCH",
      }
    )
      .then((resp) => resp.json())
      .then((data) => console.log(data))
      .then(() => reload());

    showModalEditPets = !showModalEditPets;
  }
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
  .options {
    display: flex;
  }
  .buttons {
    margin: 10px;
  }
</style>

<Addpets {showModalAddPets} on:click={toggleModalAddPets}>
  <h3>Add a New Pet</h3>
  <AddPetsForm on:addPets={addNewPet} />
</Addpets>

<Editpets {showModalEditPets} on:click={toggleModalEditPets}>
  <h3>Edit a New Pet</h3>
  <EditPetsForm on:editPets={editPets} />
</Editpets>
<div class="title" />
<div class="options">
  <div class="buttons">
    <button on:click={toggleModalAddPets}> New Pet</button>
  </div>
  <div class="buttons">
    <button on:click={toggleModalEditPets}>Edit Pets</button>
  </div>
</div>

<nav>
  <ul class="header">
    <li>Name</li>
    <li>Category</li>
    <li>Requirements</li>
  </ul>
</nav>

<div>
  {#each petsjson as pet}
    <div class="pet">
      <div class="contents">{pet.petname}</div>
      <div class="contents">{pet.pettype}</div>
      <div class="contentsplus">{pet.requirements}</div>
      <div class="button">
        <button
          on:click={() => {
            delPet(pet.petname);
          }}>
          delete
        </button>
      </div>
    </div>
  {:else}
    <p>You have no pets.</p>
  {/each}
</div>
