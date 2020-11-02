<script>
  import ChangePasswordForm from "../ChangePasswordForm.svelte";
  import EditCreditCard from "../EditCreditCard.svelte";

  const handleChangePassword = (e) => {
    const newPassword = e.detail;
    console.log(newPassword);
    alert("Password Changed!");
  };

  const handleEditCreditCard = (e) => {
    const newCreditCard = e.detail;
    console.log(newCreditCard);
    alert("Credit Card Saved!");
  };
</script>

<style>
  h1 {
    text-align: center;
  }
</style>

<h1>Settings</h1>
<ChangePasswordForm on:changePassword={handleChangePassword} />
<EditCreditCard on:editCreditCard={handleEditCreditCard} />
