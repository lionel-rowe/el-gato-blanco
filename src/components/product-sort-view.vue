<template>
  <div>
    <div class="header-with-aside">
      <h2 class="title">Tapas</h2>
      <div class="select">
        <label for="sort-selector">Sort by</label>
        <select id="sort-selector" v-model="sortType">
          <option value="name" selected>Name (A–Z)</option>
          <option value="price">Price (low–high)</option>
        </select>
      </div>
    </div>
    <div class="tabs is-medium">
      <ul>
        <template v-for="category in categories">
          <li :key="category.id" :class="category.id === currentCategoryId ? 'is-active' : ''">
            <a
              :href="'#' + category.name.toLowerCase()"
              :title="category.description"
              @click="e => selectCategory(e, category.id)"
            >{{category.name}}</a>
          </li>
        </template>
      </ul>
    </div>
    <div class="columns flex-wrap">
      <template v-for="product in filteredAndSortedProducts">
        <ProductCard :key="product.id" :product="product"></ProductCard>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import ProductCard from "@/components/product-card.vue";

const _sortBy = (prop: PropToSortBy, products: IProduct[]): IProduct[] => {
  const sortFunctions: SortFunctionMap = {
    price: (a, b) => a.price - b.price,
    name: (a, b) => a.name.localeCompare(b.name),
  };

  return [...products].sort(sortFunctions[prop]);;
};

export default {
  components: {
    ProductCard
  },

  props: {
    products: {
      type: Array as () => IProduct[]
    },
    categories: {
      type: Array as () => ICategory[]
    },
  },

  data: function() {
    return {
      currentCategoryId: this.categories && this.categories[0] && this.categories[0].id,
      sortType: 'name'
    };
  },

  computed: {
    filteredAndSortedProducts(): IProduct[] {
      return _sortBy(this.sortType,
      this.products
        .filter(product => product.category.id === this.currentCategoryId)
      );
    }
  },

  methods: {
    selectCategory(e: Event, id: string ) {
      e.preventDefault();
      this.currentCategoryId = id;
    },
  }
};
</script>

<style scoped lang="scss">
.select {
  display: flex;
  align-items: baseline;

  label {
    padding-right: 10px;
  }
}
.select {
  display: flex;
  align-items: center;
  label {
    padding-right: 10px;
  }
}

.flex-wrap {
  flex-wrap: wrap;
}

</style>

