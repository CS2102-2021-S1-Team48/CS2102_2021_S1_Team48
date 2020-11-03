<script>
  import ChangePasswordForm from "../ChangePasswordForm.svelte";
  import EditCreditCard from "../EditCreditCard.svelte";
  import UpdateAddress from "../UpdateAddress.svelte";

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

  const handleUpdateAddress = (e) => {
    const newAddress = e.detail;
    console.log(newAddress);
    alert("Address Updated!");
  };
</script>

<style>
  h1 {
    text-align: center;
  }
</style>

<h1>Settings</h1>
<h3>Update Password</h3>
<ChangePasswordForm on:changePassword={handleChangePassword} />
<h3>Update Credit Card</h3>
<EditCreditCard on:editCreditCard={handleEditCreditCard} />
<h3>Update Address</h3>
<UpdateAddress on:updateAddress={handleUpdateAddress} />
