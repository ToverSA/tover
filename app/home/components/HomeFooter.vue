<template lang="html">
  <div class="footer">
    <div class="section">
      <h3>FOLLOW US</h3>
      <a href="https://facebook.com/">
        <img src="../../../assets/images/logo-facebook.svg" alt="Facebook logo">
        <span>Facebook</span>
      </a>
      <a href="https://twitter.com/">
        <img src="../../../assets/images/logo-twitter.svg" alt="Twitter logo">
        <span>Twitter</span>
      </a>
      <a href="https://instagram.com/">
        <img src="../../../assets/images/logo-instagram.svg" alt="Instagram logo">
        <span>Instagram</span>
      </a>
    </div>
    <div class="section">
      <h3>RESOURCES</h3>
      <router-link to="/account">My account</router-link>
      <router-link to="/search">Search</router-link>
      <router-link to="/books">Books & Study Materials</router-link>
      <router-link to="/electronics">Electronics</router-link>
      <router-link to="/services">Services & Other</router-link>
      <router-link to="/events">Events</router-link>
    </div>
    <div class="section">
      <h3>LINKS</h3>
      <router-link to="/about">About Tover</router-link>
      <router-link to="/faq">Frequently Asked Questions</router-link>
      <router-link to="/privacy-policy">Privacy Policy</router-link>
      <router-link to="/tos">Terms of Service</router-link>
    </div>
    <div class="section">
      <h3>CONTACT US</h3>
      <span>(035) 567 6679</span>
      <span>info@tover.co.za</span>
      <span>City of office<br>Downy Rd<br>Surburb<br>4310</span>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import '../../app.scss';
div.footer{
  background-color: #263238;
  min-height: 200px;
  padding: 10px;
  color: #FFF;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  .section{
    padding: 20px;
    a, span{
      display: flex;
      margin: 10px 0;

      img{

      }
      > span{
        margin: 0;
        padding: 5px;
      }
    }
  }
  a{
    text-decoration: none;
    color: #FFF;
  }
}
</style>
