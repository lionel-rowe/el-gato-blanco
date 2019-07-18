<template>
  <div>
    <OrderTable :order="order" />
    <div class="controls">
      <button
        class="button is-success"
        @click="confirmPayment"
        data-test="confirm-payment"
      >Confirm Payment</button>
      <button class="button is-danger" @click="cancelOrder" data-test="cancel-order">Cancel Order</button>
    </div>
  </div>
</template>

<script lang="ts">
import { EventBus } from "@/events/event-bus";
import OrderTable from "@/components/order-table.vue";

import Modal from "@/modals/modal.vue";

import store from "@/store/index";
import OrderConfirmForm from "@/components/order-confirm-form.vue";
import OrderCancelForm from "@/components/order-cancel-form.vue";

import { fetchJSON } from "@/utils/fetch-json";
import humanizeError from "@/utils/humanize-error";

const updateOrder = async (order: IOrder) => {
  return await fetchJSON(`/api/orders/${order.id}`, {
    method: "PUT",
    body: order
  });
};

const cancelOrder = async (order: IOrder): Promise<{ data: any; res: any }> => {
  await updateOrder(order);

  return await fetchJSON(`/api/orders/${order.id}`, {
    method: "DELETE"
  });
};

const createPayment = async (
  order: IOrder,
  amount: number
): Promise<{ data: any; res: any }> => {
  const options = {
    method: "POST",
    body: {
      orderId: order.id,
      amount
    }
  };

  await updateOrder(order);

  return await fetchJSON(`/api/payments`, options);
};

export default {
  components: {
    OrderTable
  },

  props: {
    order: {
      type: Object as () => IOrder
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
    },

    async confirmPayment() {
      if (!this.order.lineItems.length) {
        EventBus.$emit("toast:show", {
          icon: "warning",
          content: "Order is empty. Please add items first."
        });

        return;
      }

      const { canceled, value } = await new Promise(resolve =>
        EventBus.$emit(
          "modal:show",
          {
            title: "Confirm Order",
            component: OrderConfirmForm,
            passThroughProps: {
              order: this.order
            }
          },
          resolve
        )
      );

      if (!canceled) {
        try {
          const { order, paymentAmount } = value;

          const { data: payment } = await createPayment(order, paymentAmount);

          this.$router.push({ name: "payments", params: { id: payment.id } });
        } catch (e) {
          EventBus.$emit("toast:show", {
            icon: "error",
            content: humanizeError(e)
          });
        }
      }
    },

    async cancelOrder() {
      const { canceled, value } = await new Promise(resolve =>
        EventBus.$emit(
          "modal:show",
          {
            title: "Cancel Order",
            component: OrderCancelForm,
            passThroughProps: {
              order: this.order
            }
          },
          resolve
        )
      );

      if (!canceled) {
        // i.e. _modal_ not canceled, i.e. order _was_ canceled
        const { order } = value;

        try {
          const { data: canceledOrder } = await cancelOrder(order);

          this.$router.push({ name: "home" });

          EventBus.$emit("toast:show", {
            icon: "success",
            content: "Order canceled."
          });
        } catch (e) {
          EventBus.$emit("toast:show", {
            icon: "error",
            content: humanizeError(e)
          });
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.controls {
  margin: 1.5rem 0;
  display: flex;
  justify-content: flex-end;
  button {
    margin-left: 1.5rem;
  }
}
</style>
