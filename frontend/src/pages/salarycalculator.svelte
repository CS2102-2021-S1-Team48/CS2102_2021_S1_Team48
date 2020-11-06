<script>
  import Modal from "../Modal.svelte";
  import CalculateSalaryForm from "../CalculateSalaryForm.svelte";

  let showModal = false;
  let totalsalary = [];

  const toggleModal = () => {
    showModal = !showModal;
  };

  const getSalary = (e) => {
    const dates = e.detail;
    const start = dates.start;
    const end = dates.end;
    fetch(
      `http://18.139.110.246:3000/admins/gettotalsalarytobepaid/${start}/${end}`,
      {
        method: "GET",
      }
    )
      .then((resp) => resp.json())
      .then(
        (data) =>
          (totalsalary = data.totalsalary.sort(function (a, b) {
            return a.caretakertype.localeCompare(b.caretakertype);
          }))
      );

    toggleModal();
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
    width: 210px;
    padding: 10px;
    font-weight: 500;
    font-size: larger;
    justify-content: center;
  }
  .contents {
    width: 220px;
    justify-content: center;
    display: inline-flex;
    padding: 10px;
  }
</style>

<h1>Salary</h1>
<button on:click={toggleModal}>Calculate Salary</button>

<Modal {showModal} on:click={toggleModal}>
  <h3>Get Salary List</h3>
  <CalculateSalaryForm on:getSalary={getSalary} />
</Modal>

<nav>
  <ul class="header">
    <li>Username</li>
    <li>Employment Type</li>
    <li>Days worked</li>
    <li>Salary</li>
  </ul>
</nav>
<div>
  {#each totalsalary as salary}
    <div class="price">
      <div class="contents">{salary.username}</div>
      <div class="contents">{salary.caretakertype}</div>
      <div class="contents">{salary.dayswork}</div>
      <div class="contents">{salary.salary}</div>
    </div>
  {:else}
    <p>There is no salary to be paid</p>
  {/each}
</div>
