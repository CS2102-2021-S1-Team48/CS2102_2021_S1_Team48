<script>
  import ChangePasswordForm from "../ChangePasswordForm.svelte";
  import EditCreditCard from "../EditCreditCard.svelte";
  import UpdateAddress from "../UpdateAddress.svelte";
  import { account, pw, acctype } from "../user.js";

  let username;
  let pass;
  let usertype;

  const unsubscribe = account.subscribe((value) => {
    username = value;
  });
  const unsubscribe2 = pw.subscribe((value) => {
    pass = value;
  });
  const unsubscribe3 = acctype.subscribe((value) => {
    usertype = value;
  });

  const handleChangePassword = (e) => {
    const received = e.detail;
    const newpw = received.new;
    const current = received.current;
    if (pass != current) {
      alert("Current password Incorrect!");
    } else {
      fetch(
        `http://18.139.110.246:3000/users/changepassword/${username}/${current}/${newpw}`,
        {
          method: "PATCH",
        }
      )
        .then((resp) => resp.json())
        .then((data) => {});
      alert("Password Changed!");
    }
  };

  const handleChangePasswordAdmin = (e) => {
    const received = e.detail;
    const newpw = received.new;
    const current = received.current;
    if (pass != current) {
      alert("Current password Incorrect!");
    } else {
      fetch(
        `http://18.139.110.246:3000/admins/changepassword/${username}/${current}/${newpw}`,
        {
          method: "PATCH",
        }
      )
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
        });
      alert("Password Changed!");
    }
  };

  const handleEditCreditCard = (e) => {
    let current;
    const newCreditCard = e.detail;
    const cardnum = newCreditCard.num;
    const expiry =
      newCreditCard.expirymonth.toString() +
      newCreditCard.expiryyear.toString();

    //check current:
    fetch(`http://18.139.110.246:3000/users/getcreditcard/${username}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => (current = data));
    console.log(current);

    if (current === null) {
      fetch(
        `http://18.139.110.246:3000/users/addcreditcard/${username}?cardnum=${cardnum}`,
        {
          method: "PATCH",
        }
      )
        .then((resp) => resp.json())
        .then((data) => console.log(data));
    } else {
      fetch(
        `http://18.139.110.246:3000/users/changecreditcard/${username}?cardnum=${cardnum}`,
        {
          method: "PATCH",
        }
      )
        .then((resp) => resp.json())
        .then((data) => console.log(data));
    }

    alert("Credit Card Saved!");
  };

  const handleUpdateAddress = (e) => {
    // NOT FIXED
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
{#if usertype === 'Admin'}
  <h3>Update Password</h3>
  <ChangePasswordForm on:changePassword={handleChangePasswordAdmin} />
{:else}
  <h3>Update Password</h3>
  <ChangePasswordForm on:changePassword={handleChangePassword} />
  <h3>Update Credit Card</h3>
  <EditCreditCard on:editCreditCard={handleEditCreditCard} />
  <h3>Update Address</h3>
  <UpdateAddress on:updateAddress={handleUpdateAddress} />
{/if}
