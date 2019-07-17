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
import { fetchJSON } from "@/utils/fetch-json";

// const getPaymentById = async (id: string): Promise<IPayment | null> => {
//   try {
//     return await fetchJSON(`/api/payments/${id}`);
//   } catch(e) {
//     console.error(e);

//     return null;
//   }
// };

const createPayment = async (order: IOrder, amount: number): Promise<{ data: any, res: any }> => {
  const options = {
    method: 'POST',
    body: {
      orderId: order.id,
      amount,
    }
  };

  try {
    return await fetchJSON(`/api/payments`, options);
  } catch(e) {
    console.error(e);

    return null;
  }
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
      const { canceled, value } = await new Promise(resolve =>
        EventBus.$emit(
          "modals:show",
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

      const { order, paymentAmount } = value;

      const { data: payment } = await createPayment(order, paymentAmount);

      console.log(payment);

    },
    cancelOrder: () => {
      // TODO
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
