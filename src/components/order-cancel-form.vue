<template>
  <form @submit="cancelOrder">
    <p>Are you sure you want to cancel this order?</p>

    <div class="controls">
      <button type="submit" class="button is-danger">Yes, Cancel Order</button>
      <button autofocus type="button" @click="cancel" class="button" data-test="cancel-order">Close</button>
    </div>
  </form>
</template>

<script lang="ts">
export default {
  props: {
    order: {
      type: Object as () => IOrder
    },
    confirm: Function,
    cancel: Function
  },

  methods: {
    cancelOrder(e: Event) {
      e.preventDefault();

      this.confirm({
        order: this.order
      });
    }
  }
};
</script>

<style scoped lang="scss">
.controls {
  margin: 1.5rem 0 0 0;
  display: flex;
  justify-content: flex-end;
  button {
    margin-left: 1.5rem;
  }
}
</style>
