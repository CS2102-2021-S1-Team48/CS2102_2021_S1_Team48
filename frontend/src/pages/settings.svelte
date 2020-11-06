<script>
  import ChangePasswordForm from "../Components/ChangePasswordForm.svelte";
  import EditCreditCard from "../Components/EditCreditCard.svelte";
  import UpdateAddress from "../Components/UpdateAddress.svelte";
  import AddNewAdminForm from "../Components/AddNewAdminForm.svelte";
  import { account, pw, acctype } from "../user.js";
  import { onMount } from "svelte";

  let username;
  let pass;
  let usertype;
  let addressobject;

  const unsubscribe = account.subscribe((value) => {
    username = value;
  });
  const unsubscribe2 = pw.subscribe((value) => {
    pass = value;
  });
  const unsubscribe3 = acctype.subscribe((value) => {
    usertype = value;
  });

  onMount(async () => {
    await fetch(`http://18.139.110.246:3000/users/getaddress/${username}`, {
      method: "GET",
    }).then((resp) => resp.json().then((data) => (addressobject = data)));
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

  const handleAddAdmin = (e) => {
    const newAdmin = e.detail;
    //console.log(newAdmin);
    const user = newAdmin.username;
    const pw = newAdmin.password;

    fetch(`http://18.139.110.246:3000/admins/register/${user}/${pw}`, {
      method: "POST",
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data))
      .catch((e) => {
        alert("Error: Admin Username used!");
      })
      .then(onfulfilled, alert("Admin account created!"));
  };

  const handleUpdateAddress = (e) => {
    const newAddress = e.detail;
    const address = newAddress.address;
    const postal = newAddress.postal;
    console.log(newAddress);
    if (addressobject === null) {
      fetch(
        `http://18.139.110.246:3000/users/addaddress/${username}/${address}`,
        {
          method: "PATCH",
        }
      )
        .then((resp) => resp.json())
        .then((data) => console.log(data));
    } else {
      fetch(
        `http://18.139.110.246:3000/users/editaddress/${username}/${address}`,
        {
          method: "PATCH",
        }
      )
        .then((resp) => resp.json())
        .then((data) => console.log(data));
    }

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
  <h3>Add new Admin</h3>
  <AddNewAdminForm on:addAdmin={handleAddAdmin} />
{:else}
  <h3>Update Password</h3>
  <ChangePasswordForm on:changePassword={handleChangePassword} />
  <h3>Update Credit Card</h3>
  <EditCreditCard on:editCreditCard={handleEditCreditCard} />
  <h3>Update Address</h3>
  <UpdateAddress on:updateAddress={handleUpdateAddress} />
{/if}
