<template>
  <div class="container is-fluid">
    <div class="section">
      <div v-if="loading" class="loading">Loading...</div>

      <div v-else-if="error" class="error">{{error}}</div>

      <div v-else class="columns is-desktop">
        <div class="column has-text-centered">
          <h1 class="title is-1">Payment Complete</h1>
          <h2 class="title is-4">Details</h2>
          <p>
            Amount paid:
            <strong>{{payment.amount | currencyFormat}}</strong>
            <br />Order total:
            <strong>{{payment.orderTotal | currencyFormat}}</strong>
            <br />Change:
            <strong>{{payment.change | currencyFormat}}</strong>
          </p>
          <p>
            <em>{{payment.date | dateTimeFormat('human') | titleCase}}</em>
          </p>

          <router-link to="/">
            <button class="button is-success is-large" click.delegate="goHome()">Home</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { fetchJSON } from "@/utils/fetch-json";

const getPaymentById = async (id: string): Promise<FetchResponse<IPayment>> => {
  try {
    return await fetchJSON(`/api/payments/${id}`);
  } catch (e) {
    console.error(e);

    return null;
  }
};

export default {
  data: () => ({
    loading: false,
    error: "",
    payment: null
  }),

  async created() {
    await this.fetchData();
  },
  watch: {
    // call the method again if the route changes
    $route: "fetchData"
  },

  methods: {
    async fetchData() {
      const { id } = this.$route.params;

      this.error = "";
      this.loading = true;
      const url = `/api/payments/${id}`;

      try {
        const { data: payment } = await getPaymentById(id);

        this.payment = payment;

        console.log(this.payment);

        this.loading = false;
      } catch (e) {
        this.error = e.toString();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

