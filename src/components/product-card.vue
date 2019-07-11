<template>
  <div class="column is-4">
    <div class="card product-card-inner">
      <header class="card-header">
        <p class="card-header-title">{{product.name}} | {{product.category.name}}</p>
      </header>
      <div class="card-content">
        <div class="content">
          <div>
            <small v-html="$options.filters.truncateWithTitleSafeHtml(product.description, 100)"></small>
          </div>
          <div>
            <strong>{{product.price | currencyFormat}}</strong>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <div class="card-footer-item">
          <button class="unstyled" @click="addToOrder" data-test="add-item">
            <a>Add to Order</a>
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store/index";
import ProductCard from "@/components/product-card.vue";

export default {
  props: {
    product: {
      type: Object as () => IProduct
    }
  },

  computed: {
    // order: () => store.getters['currentOrder/order'],
  },

  data: () => ({}),

  methods: {
    addToOrder: function() {
      store.commit("currentOrder/addItem", this.product);
    },

    // removeFromOrder: function() {
    //   store.commit("currentOrder/removeItem", this.product);
    // },
  }
};
</script>

<style scoped lang="scss">
.product-card-inner {
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .card-content {
    flex: 1 1 100%;
    overflow-y: auto;
  }
}
</style>

