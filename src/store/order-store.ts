interface IOrderStoreState {
  order: IOrder | null;
}

const _updateTotal = (order: IOrder): void => {
  order.orderTotal = order.lineItems.reduce(
    (total, lineItem) => total + lineItem.subTotal,
    0
  );
};

export default {
  namespaced: true,
  state: {
    order: null
  },

  getters: {
    order: ({ order }: IOrderStoreState) => order
  },

  mutations: {
    set(state: IOrderStoreState, order: IOrder) {
      state.order = order;
    },

    unset(state: IOrderStoreState) {
      state.order = null;
    },

    addItem(state: IOrderStoreState, item: IProduct): void {
      const { lineItems } = state.order;

      const lineItem = lineItems.find(
        lineItem => lineItem.product.id === item.id
      );

      if (lineItem) {
        lineItem.quantity++;
        lineItem.subTotal += item.price;
      } else {
        lineItems.push({
          product: item,
          quantity: 1,
          subTotal: item.price
        });
      }

      _updateTotal(state.order);
    },

    removeItem(state: IOrderStoreState, item: IProduct): void {
      const { lineItems } = state.order;

      const idx = lineItems.findIndex(
        lineItem => lineItem.product.id === item.id
      );

      lineItems[idx].quantity--;
      lineItems[idx].subTotal -= item.price;

      if (lineItems[idx].quantity === 0) {
        lineItems.splice(idx, 1);
      }

      _updateTotal(state.order);
    },

    removeAllOfProduct(state: IOrderStoreState, item: IProduct): void {
      const { lineItems } = state.order;

      const idx = lineItems.findIndex(
        lineItem => lineItem.product.id === item.id
      );

      lineItems.splice(idx, 1);

      _updateTotal(state.order);
    }
  }
};
