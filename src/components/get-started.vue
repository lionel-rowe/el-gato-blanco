<template>
  <section class="hero is-dark is-fullheight-with-navbar welcome">
    <div class="container is-fluid">
      <div class="content has-text-centered">
        <div>
          <div class="hero-outer">
            <div class="hero-inner">
              <h1 class="title is-1 hero-title">{{ title }}</h1>
              <p class="hero-paragraph">{{ message }}</p>
              <button
                @click="goToNewOrder"
                class="button is-success is-large au-target"
              >{{ 'create order' | titleCase }}</button>
            </div>
            <div v-if="loading" class="loading">Loading...</div>
            <div v-if="error" class="error">{{ error }}</div>

            <div class="hero-bg"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { fetchJSON } from '@/utils/fetch-json';

const createOrder = async (): Promise<FetchResponse<IOrder>> => {
  const options = {
    method: "POST",
    body: { lineItems: [] }
  };

  return await fetchJSON("/api/orders", options);
};

export default {
  props: {
    title: String,
    message: String
  },

  data: () => ({
    orderId: "",
    error: "",
    loading: false
  }),

  methods: {
    goToNewOrder: async function() {
      await this.createOrder();

      if (this.orderId) {
        this.$router.push({ name: "orders", params: { id: this.orderId } });
      }
    },

    createOrder: async function() {
      this.error = "";
      this.orderId = "";
      this.loading = true;

      try {
        const { res, data } = await createOrder();

        this.loading = false;

        this.orderId = data.id;
      } catch (e) {
        this.error = e.toString();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.welcome {
  background: #000 !important;
  .hero-outer {
    position: relative;
    height: calc(100vh - 52px);
    padding: 80px 0;
    .hero-inner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      color: #000;
      width: 100vw;
      padding: 0 30px;
      .hero-title,
      .hero-paragraph {
        color: #fff;
      }
    }
    .hero-bg {
      background: url(/el-gato-blanco.jpg);
      opacity: 0.5;
      height: 100vh;
      width: 100vw;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-size: cover;
      pointer-events: none;
    }
  }
}
</style>
