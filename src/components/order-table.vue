<template>
  <table
    class="table is-stripped is-hoverable is-fullwidth order-table-inner"
    :class="interactive && 'interactive'">
    <thead>
      <tr>
        <th>Item</th>
        <th>Quantity</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="lineItem in order.lineItems">
        <tr :key="lineItem.product.id">
          <td>{{lineItem.product.name}}</td>
          <td>
            <div class="text-with-controls">
              <button
                :hidden="!interactive"
                aria-label="Remove 1"
                @click="() => removeItem(lineItem.product)"
                class="unstyled fa-button minus"
              >
                <font-awesome-icon aria-hidden="true" icon="minus"></font-awesome-icon>
              </button>
              <div class="quantity">{{lineItem.quantity}}</div>
              <button
                :hidden="!interactive"
                aria-label="Add 1"
                @click="() => addItem(lineItem.product)"
                class="unstyled fa-button plus"
              >
                <font-awesome-icon aria-hidden="true" icon="plus"></font-awesome-icon>
              </button>
            </div>
          </td>
          <td>
            {{lineItem.subTotal | currencyFormat}}
            <button
              :hidden="!interactive"
              aria-label="Delete All"
              @click="() => removeAllOfProduct(lineItem.product)"
              class="unstyled fa-button delete-row-button"
            >
              <font-awesome-icon icon="trash-alt"></font-awesome-icon>
            </button>
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <th></th>
        <th>Total</th>
        <th>{{order.orderTotal | currencyFormat}}</th>
      </tr>
    </tfoot>
  </table>
</template>

<script lang="ts">
import Modal from "@/modals/modal.vue";

import store from "@/store/index";

export default {
  props: {
    order: {
      type: Object as () => IOrder
    },
    interactive: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({}),

  methods: {
    removeItem: (product: IProduct) => {
      store.commit("currentOrder/removeItem", product);
    },
    addItem: (product: IProduct) => {
      store.commit("currentOrder/addItem", product);
    },
    removeAllOfProduct: (product: IProduct) => {
      store.commit("currentOrder/removeAllOfProduct", product);
    }
  }
};
</script>

<style scoped lang="scss">
@import "bulma/bulma.sass";

@media screen and (max-width: $desktop) {
  .order-table-inner.interactive {
    width: calc(100% - 42px) !important;
    .delete-row-button {
      opacity: 1 !important;
    }
  }
}

[hidden] {
  display: none !important;
}

order-table {
  min-height: 100px;
  display: flex;
}

.order-table-inner {
  table-layout: fixed;

  td {
    vertical-align: middle !important;
  }

  tr td,
  tr th {
    &:nth-child(2) {
      text-align: center;
    }
    &:nth-child(3) {
      text-align: right;
      position: relative;
    }
  }

  tr {
    .delete-row-button {
      box-sizing: content-box;
      color: darken($danger, 15);
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: -40px;
      opacity: 0;
      padding: 10px;
      &:hover,
      &:focus {
        z-index: 1;
      }
    }
    &:hover {
      .delete-row-button {
        opacity: 1;
        z-index: 1;
      }
    }
  }

  .text-with-controls {
    display: flex;

    flex-direction: row;
    justify-content: center;
    align-items: baseline;
    text-align: center;

    flex: 0 0 3.5em;

    .fa-button {
      font-size: 0.7rem;
      &.plus {
        color: $success;
      }
      &.minus {
        color: $danger;
      }
    }
    .quantity {
      min-width: 2.5em;
    }
  }
}
</style>
