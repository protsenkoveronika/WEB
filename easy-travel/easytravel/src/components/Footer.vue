<template>
  <footer>
    <div class="row">
      <div class="col-sm">
        <h6>About Us</h6>
        <ul>
          <li>About EasyTravel</li>
          <li>Our Team</li>
          <li>Mission and Values</li>
          <li>Testimonials</li>
        </ul>
      </div>
      <div class="col-sm">
        <h6>Social Media</h6>
        <ul>
          <li>Facebook</li>
          <li>Twitter</li>
          <li>Instagram</li>
          <li>LinkedIn</li>
        </ul>
      </div>
      <div class="col-sm">
        <h6><a href="contacts.html">Contacts</a></h6>
        <ul>
          <li><a href="tel:+380968858666"><i class="fas fa-phone"></i> +380968858666</a></li>
          <li><a href="mailto:easytravel@gmail.com"><i class="fas fa-envelope"></i> easytravel@gmail.com</a></li>
          <li><a href="https://t.me/"><i class="fab fa-telegram"></i> Telegram</a></li>
          <li><a href="https://wa.me/"><i class="fab fa-whatsapp"></i> WhatsApp</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "footer"
}
</script>

<style scoped>
footer {
  display: flex;
  padding-top: 10px;
  background-color: rgba(51, 51, 51, 0.96);
  color: white;
  justify-content: center;
}

h6 {
  font-weight: bold;
  margin: 0;
}

.row {
  width: 95%;
  justify-content: center;
  padding: 10px 10px 0 10px ;
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

</style>