<template>
  <dialog ref="modal">
    <div class="modal-box">
      <div class="modal-inner" ref="modalInner">
        <h1 class="title is-3" v-if="title">{{ title }}</h1>
        <component
          :confirm="confirm"
          :cancel="cancel"
          :is="component"
          v-bind="passThroughProps || {}"
        >
          <template v-if="content">{{ content }}</template>
        </component>
        <div v-if="Object.keys(buttons).length" class="controls">
          <button
            @click="confirm"
            v-if="buttons.confirm"
            class="button is-primary"
          >{{ buttons.confirm }}</button>
          <button @click="cancel" v-if="buttons.cancel" class="button is-danger">{{buttons.cancel}}</button>
        </div>
      </div>
    </div>

    <div @click="cancel" class="backdrop">
      <button @click="cancel" class="close" type="button" aria-label="Close">
        <span class="close-inner" aria-hidden="true">&times;</span>
      </button>
    </div>
  </dialog>
</template>

<script lang="ts">
import { Vue } from "vue/types/vue";
import { EventBus } from "@/events/event-bus";

let { scrollX, scrollY } = window;

const doNothing = (e: Event) => e.preventDefault();

const resetScroll = () => {
  window.scrollTo(scrollX, scrollY);
};

const initData = () => ({
  buttons: {},
  title: "",
  component: "p",
  content: "",
  passThroughProps: {},
  resolve: ({  }: any) => {}
});

export default {
  data: initData,

  mounted() {
    EventBus.$on("modal:show", this.$_setupModal);
  },

  beforeDestroy() {
    this.$_closeModal();
    // remove any remaining event listeners,
    // styles on `html`, etc.

    EventBus.$off("modal:show", this.$_setupModal);
  },

  methods: {
    confirm(value: any) {
      this.resolve({
        canceled: false,
        value
      });
      this.$_teardownModal();
    },
    cancel() {
      this.resolve({
        canceled: true
      });
      this.$_teardownModal();
    },

    $_cancelOnEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        this.cancel();
      }
    },

    $_setupModal(
      { title, buttons, component, content, passThroughProps }: any,
      resolve: (options: object) => any
    ) {
      this.buttons = buttons || {};
      this.title = title || null;
      this.component = component || this.component;
      this.content = content || this.content;
      this.passThroughProps = passThroughProps || this.passThroughProps;
      this.resolve = resolve || this.resolve;

      this.$_displayModal();

      setTimeout(() => {
        const modalInner = this.$refs.modalInner as HTMLElement;

        const firstFocusable =
          modalInner.querySelector("[autofocus]") ||
          modalInner.querySelector(
            ["button", "[href]", "input", "select", "textarea", "[tabindex]"]
              .map(selector => `${selector}:not([hidden]):not([tabindex="-1"])`)
              .join(",")
          );

        if (firstFocusable) {
          firstFocusable.focus();
        }
      }, 0);
    },

    $_teardownModal() {
      const initialData = initData();

      for (const prop in initialData) {
        // Reset the prop locally.
        this[prop] = initialData[prop];
      }

      this.$_closeModal();
    },

    $_displayModal() {
      (document.querySelector("html") as HTMLHtmlElement).style.overflowY =
        "hidden";

      scrollX = window.scrollX;
      scrollY = window.scrollY;

      (this.$refs.modal as HTMLDialogElement).showModal();
      document.addEventListener("wheel", doNothing, { passive: false });
      window.addEventListener("scroll", resetScroll);
      window.addEventListener("keydown", this.$_cancelOnEsc);
    },
    $_closeModal() {
      (document.querySelector(
        "html"
      ) as HTMLHtmlElement).style.overflowY = null;
      (this.$refs.modal as HTMLDialogElement).close();
      document.removeEventListener("wheel", doNothing);
      window.removeEventListener("scroll", resetScroll);
      window.removeEventListener("keydown", this.$_cancelOnEsc);

      // this.$refs.component
    }
  }
};
</script>

<style scoped lang="scss">
$modal-height: 350px;
$modal-width: 600px;

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
        height: unset;
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
