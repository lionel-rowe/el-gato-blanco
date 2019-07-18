<template>
  <div id="app">
    <TopNav />
    <router-view />
    <Modal />
    <Toast />
  </div>
</template>

<script lang="ts">
import TopNav from "@/components/top-nav.vue";
import Modal from "@/modals/modal.vue";
import Toast from "@/components/toast.vue";

export default {
  components: {
    TopNav,
    Modal,
    Toast
  },
  created() {
    if (/localhost|127\.0\.0\.1/.test(window.location.host)) {
      // is dev
      const c = 'color: #fff; background: #41b883;';
      console.info('%capp-level vue instance: %cwindow.vm', `${c} padding: 0 0 0 5px;`, `${c} padding: 0 5px 0 0; font-weight: bold;`)
      window.vm = this;
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/global.scss";
</style>
