<script>
  import { onMount } from "svelte";
  import AddPriceForm from "../Components/AddPriceForm.svelte";
  import EditPriceForm from "../Components/EditPriceForm.svelte";
  import DeletePriceForm from "../Components/DeletePriceForm.svelte";
  import ModalAddPrice from "../Components/ModalAddPrice.svelte";
  import ModalEditPrice from "../Components/ModalEditPrice.svelte";
  import ModalDeletePrice from "../Components/ModalDeletePrice.svelte";
  import { account } from "../user.js";

  let username;

  let pricelist = [];
  let showModalAddPrice = false;
  let showModalEditPrice = false;
  let showModalDeletePrice = false;

  const unsubscribe = account.subscribe((value) => {
    username = value;
  });

  onMount(async () => {
    await fetch(`http://18.139.110.246:3000/basedailyprices?`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then(
        (data) =>
          (pricelist = data.basedailyprices.sort(function (a, b) {
            if (a.pettype != b.pettype) {
              return a.pettype.localeCompare(b.pettype);
            } else {
              return a.minrating - b.minrating;
            }
          }))
      );

    //console.log(petsjson);
  });

  function reload() {
    fetch(`http://18.139.110.246:3000/basedailyprices?`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then(
        (data) =>
          (pricelist = data.basedailyprices.sort(function (a, b) {
            if (a.pettype != b.pettype) {
              return a.pettype.localeCompare(b.pettype);
            } else {
              return a.minrating - b.minrating;
            }
          }))
      );
  }

  const toggleModalAddPrice = () => {
    showModalAddPrice = !showModalAddPrice;
  };

  const toggleModalEditPrice = () => {
    showModalEditPrice = !showModalEditPrice;
  };

  const toggleModalDeletePrice = () => {
    showModalDeletePrice = !showModalDeletePrice;
  };

  const addNewPrice = (e) => {
    const price = e.detail;
    const category = price.category;
    const one = price.one;
    const two = price.two;
    const three = price.three;
    const four = price.four;
    const five = price.five;
    fetch(
      `http://18.139.110.246:3000/basedailyprices/${username}?amount=${one}&pettype=${category}&minrating=1`,
      {
        method: "POST",
      }
    )
      .then((resp) => resp.json())
      .then((data) => console.log(data));
    fetch(
      `http://18.139.110.246:3000/basedailyprices/${username}?amount=${two}&pettype=${category}&minrating=2`,
      {
        method: "POST",
      }
    )
      .then((resp) => resp.json())
      .then((data) => console.log(data));
    fetch(
      `http://18.139.110.246:3000/basedailyprices/${username}?amount=${three}&pettype=${category}&minrating=3`,
      {
        method: "POST",
      }
    )
      .then((resp) => resp.json())
      .then((data) => console.log(data));
    fetch(
      `http://18.139.110.246:3000/basedailyprices/${username}?amount=${four}&pettype=${category}&minrating=4`,
      {
        method: "POST",
      }
    )
      .then((resp) => resp.json())
      .then((data) => console.log(data));
    fetch(
      `http://18.139.110.246:3000/basedailyprices/${username}?amount=${five}&pettype=${category}&minrating=5`,
      {
        method: "POST",
      }
    )
      .then((resp) => resp.json())
      .then((data) => console.log(data))
      .then(() => reload());

    toggleModalAddPrice();
    alert("Price Added!");
  };

  const editPrice = (e) => {
    const price = e.detail;
    const category = price.category;
    const one = price.one;
    const two = price.two;
    const three = price.three;
    const four = price.four;
    const five = price.five;
    fetch(
      `http://18.139.110.246:3000/basedailyprices/${category}/1/${username}?amount=${one}`,
      {
        method: "PATCH",
      }
    )
      .then((resp) => resp.json())
      .then((data) => console.log(data));
    fetch(
      `http://18.139.110.246:3000/basedailyprices/${category}/2/${username}?amount=${two}`,
      {
        method: "PATCH",
      }
    )
      .then((resp) => resp.json())
      .then((data) => console.log(data));
    fetch(
      `http://18.139.110.246:3000/basedailyprices/${category}/3/${username}?amount=${three}`,
      {
        method: "PATCH",
      }
    )
      .then((resp) => resp.json())
      .then((data) => console.log(data));
    fetch(
      `http://18.139.110.246:3000/basedailyprices/${category}/4/${username}?amount=${four}`,
      {
        method: "PATCH",
      }
    )
      .then((resp) => resp.json())
      .then((data) => console.log(data));
    fetch(
      `http://18.139.110.246:3000/basedailyprices/${category}/5/${username}?amount=${five}`,
      {
        method: "PATCH",
      }
    )
      .then((resp) => resp.json())
      .then((data) => console.log(data))
      .then(() => reload());

    toggleModalEditPrice();
    alert("Price changed!");
  };

  const deletePrice = (e) => {
    const price = e.detail;
    const category = price.category;

    fetch(`http://18.139.110.246:3000/basedailyprices/${category}/1`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data));
    fetch(`http://18.139.110.246:3000/basedailyprices/${category}/2`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data));
    fetch(`http://18.139.110.246:3000/basedailyprices/${category}/3`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data));
    fetch(`http://18.139.110.246:3000/basedailyprices/${category}/4`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data));
    fetch(`http://18.139.110.246:3000/basedailyprices/${category}/5`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data))
      .then(() => reload());

    toggleModalDeletePrice();
    alert("Price deleted!");
  };
</script>

<style>
  h1 {
    text-align: center;
  }
  nav {
    border-bottom: 2px solid;
    border-top: 2px solid;
  }

  li {
    display: inline-flex;
    width: 300px;
    padding: 10px;
    font-weight: 500;
    font-size: larger;
    justify-content: center;
  }
  .contents {
    width: 300px;
    justify-content: center;
    display: inline-flex;
    padding: 10px;
  }
</style>

<h1>Pricelist</h1>

<div>
  <button on:click={toggleModalAddPrice}>Add Price</button>
  <button on:click={toggleModalEditPrice}>Edit Price</button>
  <button on:click={toggleModalDeletePrice}>Delete Price</button>
</div>

<nav>
  <ul class="header">
    <li>Category</li>
    <li>Rating</li>
    <li>Min-Price</li>
  </ul>
</nav>

<div>
  {#each pricelist as price}
    <div class="price">
      <div class="contents">{price.pettype}</div>
      <div class="contents">{price.minrating}</div>
      <div class="contents">{price.amount}</div>
    </div>
  {:else}
    <p>Pricelist is empty.</p>
  {/each}
</div>

<ModalAddPrice {showModalAddPrice} on:click={toggleModalAddPrice}>
  <h3>Add Price</h3>
  <AddPriceForm on:addPrice={addNewPrice} />
</ModalAddPrice>

<ModalEditPrice {showModalEditPrice} on:click={toggleModalEditPrice}>
  <h3>Add Price</h3>
  <EditPriceForm on:editPrice={editPrice} />
</ModalEditPrice>

<ModalDeletePrice {showModalDeletePrice} on:click={toggleModalDeletePrice}>
  <h3>Delete Price</h3>
  <DeletePriceForm on:deletePrice={deletePrice} />
</ModalDeletePrice>
