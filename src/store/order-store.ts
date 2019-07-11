interface IOrderStoreState {
  order: IOrder | null;
}

const _syncLocal = (order: IOrder | null, clean = false): void => {
  order.dirty = !clean;

  if (order) {
    window.localStorage.order = JSON.stringify(order);
  } else {
    window.localStorage.removeItem("order");
  }
};

const _updateTotal = (order: IOrder): void => {
  order.orderTotal = order.lineItems.reduce(
    (total, lineItem) => total + lineItem.subTotal,
    0
  );
};

export default {
  namespaced: true,
  state: {
    order: JSON.parse(window.localStorage.order || null)
  },

  getters: {
    order: ({ order }: IOrderStoreState) => order
  },

  mutations: {
    set(state: IOrderStoreState, order: IOrder) {
      state.order = order;
      _syncLocal(order);
    },

    unset(state: IOrderStoreState) {
      state.order = null;
      _syncLocal(null);
    },

    markClean(state: IOrderStoreState) {
      _syncLocal(order, true);
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
      _syncLocal(state.order);
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
      _syncLocal(state.order);
    },

    removeAllOfProduct(state: IOrderStoreState, item: IProduct): void {
      const { lineItems } = state.order;

      const idx = lineItems.findIndex(
        lineItem => lineItem.product.id === item.id
      );

      lineItems.splice(idx, 1);

      _updateTotal(state.order);
      _syncLocal(state.order);
    }
  }
};
