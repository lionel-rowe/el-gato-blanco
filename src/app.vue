<template>
  <div id="app" v-on:modal:show="() => console.log(2)">
    <TopNav />
    <router-view />
    <Modal />
  </div>
</template>

<script lang="ts">
import TopNav from "@/components/top-nav.vue";
import Modal from "@/modals/modal.vue";

export default {
  components: {
    TopNav,
    Modal
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
@import "bulma/bulma.sass";
@import url("https://fonts.googleapis.com/css?family=Ubuntu&display=swap");

html {
  overflow-y: auto;
}

p {
  margin: $block-spacing 0;
}

#app {
  font-family: "Ubuntu", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.is-sticky {
  @media screen and (min-width: $desktop) {
    position: sticky;
    top: $block-spacing;
    height: 100%;
  }
}

.toast {
  position: fixed;
  width: 60vw;
  bottom: 15vh;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: 8px;
  padding: 5px 10px;
  text-align: center;
  opacity: 1;
  transition: opacity 1s;
  z-index: 1000;

  &.invisible {
    opacity: 0;
    pointer-events: none;
  }
}

.unstyled {
  font-size: inherit;
  padding: 0;
  margin: 0;
  background: none;
  border: none;
}

@mixin fa-icon() {
  display: inline-block;
  width: 1.4em;
  height: 1.4em;
  border-radius: 50%;
  cursor: pointer;
  text-align: center;
  &:hover,
  &:focus-within {
    opacity: 0.7 !important;
  }
  &:active {
    opacity: 0.5 !important;
  }
}

.fa-button {
  @include fa-icon;
}

.spaced {
  padding: $block-spacing 0;
}

.header-with-aside {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  justify-content: space-between;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    flex: 1 0 auto;
  }
}

.unstyled {
  font-size: inherit;
  padding: 0;
  margin: 0;
  background: none;
  border: none;
}

@mixin fa-icon() {
  display: inline-block;
  width: 1.4em;
  height: 1.4em;
  border-radius: 50%;
  cursor: pointer;
  text-align: center;
  &:hover,
  &:focus-within {
    opacity: 0.7 !important;
  }
  &:active {
    opacity: 0.5 !important;
  }
}

.fa-button {
  @include fa-icon;
}

.spaced {
  padding: $block-spacing 0;
}

.header-with-aside {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  justify-content: space-between;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    flex: 1 0 auto;
  }
}
</style>
