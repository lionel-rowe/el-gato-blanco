<template>
  <div class="container is-fluid orders">
    <div class="section">
      <div v-if="loading" class="loading">Loading...</div>

      <div v-else-if="error" class="error">{{ error }}</div>

      <div v-else>
        <div class="columns is-desktop">
          <div class="column is-8-desktop is-12-mobile">
            <ProductSortView :products="products" :categories="categories" />
          </div>

          <div class="column is-4-desktop is-12-mobile is-sticky">
            <h2 class="title">Order</h2>
            <div v-if="order" class="content">
              <OrderForm :order="order" />
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
import OrderForm from "@/components/order-form.vue";
import { fetchJSON } from '@/utils/fetch-json';

const getAllProducts = async (): Promise<FetchResponse<IProduct[]>> => {
  return await fetchJSON(`/api/products`);
};

const getAllCategories = async (): Promise<FetchResponse<ICategory[]>> => {
  return await fetchJSON(`/api/categories`);
};

const getOrderById = async (id: string): Promise<FetchResponse<IOrder>> => {
  return await fetchJSON(`/api/orders/${id}`);
};

export default {
  components: {
    ProductSortView,
    OrderForm
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
  },
  watch: {
    // call the method again if the route changes
    $route: "fetchData"
  },
  computed: {
    order: () => store.getters["currentOrder/order"],

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

        if (!this.order || this.order.id !== order.data.id) {
          store.commit("currentOrder/set", order.data);
        }

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

