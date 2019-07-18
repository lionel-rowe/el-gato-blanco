<template>
  <div
    :aria-hidden="!displayToast"
    class="toast"
    :class="displayToast ? '' : 'invisible'"
    data-test="toast"
  >
    <font-awesome-icon
      v-if="icon"
      :icon="ICONS[icon].glyph"
      class="icon"
      :class="ICONS[icon].class"
    ></font-awesome-icon>
    {{content}}
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { EventBus } from "@/events/event-bus";

const ICONS: IconMap = {
  success: {
    glyph: "check",
    class: "has-text-success"
  },
  error: {
    glyph: "times",
    class: "has-text-danger"
  },
  warning: {
    glyph: "exclamation-triangle",
    class: "has-text-warning"
  },
  info: {
    glyph: "info-circle",
    class: "has-text-info"
  }
};

const initData = () => ({
  icon: "",
  content: "",
  displayToast: false,
  toastTimeout: -1,
  ICONS
});

export default {
  data: initData,

  mounted() {
    EventBus.$on("toast:show", this.$_show);
  },

  beforeDestroy() {
    window.clearTimeout(this.toastTimeout);
    EventBus.$off("toast:show", this.$_show);
  },

  methods: {
    $_show({
      content = "",
      icon = "",
      duration = 5000
    }: {
      content: string;
      icon: string;
      duration: number;
    }) {
      this.displayToast = true;
      this.icon = icon;
      this.content = content;
      this.toastTimeout = window.setTimeout(() => {
        this.displayToast = false;
      }, duration);
    }
  }
};
</script>

<style scoped lang="scss">
.icon {
  margin-right: 1rem;
  font-size: 1.2em;
}

.toast {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60vw;
  bottom: 15vh;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
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
</style>
