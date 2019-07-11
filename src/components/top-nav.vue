<template>
  <nav class="navbar is-dark" id="nav">
    <div class="container is-fluid">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="/favicon.png" alt />&nbsp;El Gato Blanco
        </router-link>
      </div>
    </div>

    <!-- <div class="burger">
      <div class="burger-item">
        <router-link to="/about">About</router-link>
      </div>
    </div>-->
  </nav>
</template>

<script lang="ts">
export default {}
</script>

<style scoped lang="scss">
#nav {
  // padding: 30px;
  a {
    color: #ddd;
    &.router-link-exact-active {
      color: #eee;
    }
    img {
      vertical-align: middle;
    }
  }
}
</style>
