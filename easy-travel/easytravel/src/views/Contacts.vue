<template>
  <div class="container mt-5">
    <div class="row.main">
      <div class="col-sm">
        <h2>Contact with us</h2>
        <ul class="main_contacts">
          <li><a href="tel:+380968858666"><i class="fas fa-phone"></i> +380968858666</a></li>
          <li><a href="mailto:easytravel@gmail.com"><i class="fas fa-envelope"></i> easytravel@gmail.com</a></li>
          <li><a href="https://t.me/"><i class="fab fa-telegram"></i> Telegram</a></li>
          <li><a href="https://wa.me/"><i class="fab fa-whatsapp"></i> WhatsApp</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Contacts"
}
</script>

<style scoped>
h2 {
  text-align: center;
  margin: 0;
}

.row p {
  padding: 10px;
}

.col-sm a{
  color: #ffffff;
  text-decoration: none;
}

.col-sm a:hover i {
  transition: transform 0.3s;
  transform: scale(1.2);
}

.col-sm ul {
  color: #ffffff;
  list-style: none;
}

.mt-5 {
  margin-bottom: 3rem!important;
}

.main_contacts li {
  margin: 10px 0;
}

.main_contacts a {
  margin-left: 30%!important;
  color: #212529!important;
}

.main_contacts i {
  margin-right: 8px;
}

</style>