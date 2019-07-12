<template>
  <dialog ref="modal" v-on:show-modal="displayModal">
    <div class="modal-box">
      <div class="modal-content">
        <h1 v-if="title">{{ title }}</h1>
        <!-- <component :is="component"> Something else</component> -->
        <!-- <div v-if="Object.keys(buttons).length" class="controls">
          <button @click="confirm" v-if="buttons.confirm" class="button is-primary">{{buttons.confirm}}</button>
          <button @click="cancel" v-if="buttons.cancel" class="button is-danger">{{buttons.cancel}}</button>
        </div> -->
      </div>
    </div>

    <div @click="cancel" class="backdrop">
      <button @click="cancel" class="close" type="reset" aria-label="Close">
        <span class="close-inner" aria-hidden>&times;</span>
      </button>
    </div>
  </dialog>
</template>

<script lang="ts">
import { Vue } from "vue/types/vue";
// import OrderForm from "@/components/order-form.vue";

let { scrollX, scrollY } = window;

const doNothing = e => e.preventDefault();

const resetScroll = e => {
  window.scrollTo(scrollX, scrollY);
};

const displayModal = (modal: HTMLDialogElement) => {
  document.querySelector("html").style.overflowY = "hidden";

  scrollX = window.scrollX;
  scrollY = window.scrollY;

  modal.showModal();
  document.addEventListener("wheel", doNothing, { passive: false });
  window.addEventListener("scroll", resetScroll);
};

const closeModal = (modal: HTMLDialogElement) => {
  document.querySelector("html").style.overflowY = null;
  modal.close();
  document.removeEventListener("wheel", doNothing);
  window.removeEventListener("scroll", resetScroll);
};

export default {
  data: () => ({
    // component: OrderForm
  }),

  props: {
    showDialog: Boolean,
    modalData: Object,
    title: String,
    buttons: Object,
    dismissable: Boolean,
    resolvePromiseWith: Function

    // modalContentView: {
    //   type: Object as () => Vue
    // },
    // dismissable: {
    //   type: Boolean,
    //   default: true
    // }
  },

  mounted() {
    // setTimeout(() => { // ensure this is called only after actually appended to DOM
    //   displayModal(this.$refs.modal as HTMLDialogElement);
    //   console.log(this);
    // }, 0);

  },


  beforeDestroy() {
    closeModal(this.$refs.modal as HTMLDialogElement); // remove any remaining event listeners
  },

  methods: {
    // $_teardown() {
    //   teardown(this.$refs.modal as HTMLDialogElement);
    // },
    // $_setup() {
    //   setup(this.$refs.modal as HTMLDialogElement);
    // },

    beforeOpen() {
      displayModal(this.$refs.modal as HTMLDialogElement);
    },

    displayModal() {
      console.log(1/0);
      displayModal(this.$refs.modal as HTMLDialogElement);
    },

    confirm() {
      closeModal(this.$refs.modal as HTMLDialogElement);
      this.resolvePromiseWith({
        value: true,
      });
    },
    cancel() {
      closeModal(this.$refs.modal as HTMLDialogElement);
      // this.resolvePromiseWith({
      //   value: false,
      // });
    }
  }
};
</script>

<style scoped lang="scss">
$modal-height: 350px;
$modal-width: 550px;

dialog {
  &:not([open]) {
    display: none;
  }

  &::backdrop {
    display: none;
  }

  &[open] {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999999999999999999;
    border: none;
    background: rgba(0, 0, 0, 0);

    .modal-box {
      background: #fff;
      position: absolute;
      padding: 20px;

      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;

      @media screen and (min-width: $modal-width) {
        width: $modal-width;
      }

      @media screen and (min-height: $modal-height) {
        height: $modal-height;
      }
    }

    .close {
      position: fixed;
      display: block;
      z-index: 1000001;
      right: 10px;
      top: 10px;
      color: #fff;
      background: rgba(0, 0, 0, 0);
      font-size: 3rem;
      border: none;
      cursor: pointer;
      width: 1.2em;
      height: 1.2em;

      .close-inner {
        position: fixed;
        display: block;
        right: 22px;
        top: 2px;
      }

      &:hover,
      &:focus {
        opacity: 0.7;
      }
    }
  }

  .backdrop {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;

    background: rgba(0, 0, 0, 0.7);
  }
}
</style>
