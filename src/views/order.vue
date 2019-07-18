<template>
  <div class="container is-fluid orders">
    <div class="section">
      <div v-if="loading" class="loading">Loading...</div>

      <div v-else-if="error" class="error">{{ error }}</div>

      <div v-else-if="order.orderStatus !== 0">
        <h2 class="title">Order</h2>
        <OrderTable :order="order" :interactive="false" />
        <div>
          Status:
          <template v-if="order.orderStatus === 1">Paid</template>
          <template v-if="order.orderStatus === 2">Canceled</template>
        </div>
      </div>
      <div v-else>
        <div class="columns is-desktop">
          <div class="column is-8-desktop is-12-mobile">
            <ProductSortView :products="products" :categories="categories" />
          </div>

          <div class="column is-4-desktop is-12-mobile is-sticky">
            <h2 class="title">Order</h2>
            <div v-if="order" class="content">
              <OrderDisplay :order="order" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store/index";
import ProductSortView from "@/components/product-sort-view.vue";
import OrderDisplay from "@/components/order-display.vue";
import OrderTable from "@/components/order-table.vue";
import { fetchJSON } from "@/utils/fetch-json";

const retrieveAndWipeAutosavedOrder = () => {
  if (window.localStorage.autosavedOrder) {
    const order = JSON.parse(window.localStorage.autosavedOrder);
    window.localStorage.removeItem("autosavedOrder");

    return { data: order };
  }

  return null;
};

const updateOrder = async (order: IOrder) => {
  return await fetchJSON(`/api/orders/${order.id}`, {
    method: "PUT",
    body: order
  });
};

const getAllProducts = async (): Promise<FetchResponse<IProduct[]>> => {
  return await fetchJSON(`/api/products`);
};

const getAllCategories = async (): Promise<FetchResponse<ICategory[]>> => {
  return await fetchJSON(`/api/categories`);
};

const getOrderById = async (id: string): Promise<FetchResponse<IOrder>> => {
  return (retrieveAndWipeAutosavedOrder() as ISuccessFetchResponse<IOrder>) || await fetchJSON(`/api/orders/${id}`);
};

export default {
  components: {
    ProductSortView,
    OrderDisplay,
    OrderTable
  },
  data: () => ({
    loading: false,
    categories: [],
    products: [],
    filters: {
      searchText: "",
      categoryNames: []
    },
    error: ""
  }),

  async created() {
    await this.fetchData();

    window.addEventListener("beforeunload", this.$_autosaveOrder);

    console.log(this.order);
  },

  async beforeDestroy() {
    await updateOrder(this.order);

    window.removeEventListener("beforeunload", this.$_autosaveOrder);
  },

  watch: {
    // call the method again if the route changes
    $route: "fetchData"
  },
  computed: {
    order: (): IOrder => store.getters["currentOrder/order"],

    filteredAndSortedProducts: function(): IProduct[] {
      return this.products.filter(product => {
        // const trimmedSearchText = this.filters.searchText.trim();

        if (
          this.filters.categoryNames.length &&
          !this.filters.categoryNames.includes(product.category.name)
        ) {
          return false;
        }

        return true;
      });
    }
  },

  methods: {
    $_autosaveOrder() {
      if (this.order.orderStatus === 0) {
        window.localStorage.autosavedOrder = JSON.stringify(this.order);
      }
    },

    async fetchData() {
      const { id } = this.$route.params;

      this.error = "";
      this.loading = true;
      const url = `/api/orders/${id}`;

      try {
        const [order, products, categories] = await Promise.all([
          getOrderById(id),
          getAllProducts(),
          getAllCategories()
        ]);

        this.loading = false;

        store.commit("currentOrder/set", order.data);

        this.products = products.data;
        this.categories = categories.data;
      } catch (e) {
        this.error = e.toString();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "bulma/bulma.sass";

.orders {
  .tabs {
    display: flex;
    justify-content: space-between;
  }
  .controls {
    margin: $block-spacing 0;
    display: flex;
    justify-content: flex-end;
    button {
      margin-left: $block-spacing;
    }
  }
}
</style>

