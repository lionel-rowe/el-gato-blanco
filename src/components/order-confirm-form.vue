<template>
  <form @submit="pay">
    <OrderTable :interactive="false" :order="order" />

    <div class="control currency-input">
      <div class="currency-symbol">£</div>
      <input
        autofocus
        @input="validate"
        class="input"
        type="text"
        inputmode="decimal"
        required
        :pattern="DECIMAL_PATTERN.source"
        v-model="$v.paymentAmountPoundsAsString.$model"
      />
    </div>

    <p v-if="changeDueMessage">
      <font-awesome-icon class="checkmark" v-if="!$v.$invalid" aria-hidden="true" icon="check"></font-awesome-icon>
      {{changeDueMessage}}
    </p>

    <div class="controls">
      <button type="submit" class="button is-success">Pay</button>
      <button type="button" @click="cancel" class="button" data-test="cancel-order">Close</button>
    </div>
  </form>
</template>

<script lang="ts">
import { required, helpers, minValue } from "vuelidate/lib/validators";

import OrderTable from "@/components/order-table.vue";

const DECIMAL_PATTERN = /^(?:\d*(?:\.\d{1,2})?|\.\d{1,2}|\d*\.)?$/;

export default {
  components: {
    OrderTable
  },

  props: {
    order: {
      type: Object as () => IOrder
    },
    confirm: Function,
    cancel: Function
  },

  validations() {
    return {
      paymentAmountPoundsAsString: {
        required,
        fitsPattern: helpers.regex("", DECIMAL_PATTERN),
        minValue: minValue(this.order.orderTotal / 100)
      }
    };
  },

  data: () => ({
    paymentAmountPoundsAsString: "",
    formatValidatedPaymentAmountPoundsAsString: "",
    DECIMAL_PATTERN,
    changeDueMessage: ""
  }),

  computed: {
    paymentAmount: function() {
      const [preDp, postDp] = this.paymentAmountPoundsAsString
        .split(".")
        .map(Number);

      let out = 0;

      out += preDp * 100;
      if (postDp) {
        out += Math.floor(
          +postDp
            .toString()
            .padEnd(2, "0")
            .slice(0, 2)
        );
      }

      return out;
    }
  },

  methods: {
    pay(e: Event) {
      e.preventDefault();

      if (!this.$v.$invalid) {
        this.confirm({
          paymentAmount: this.paymentAmount,
          order: this.order
        });
      } else {
        (e.currentTarget as HTMLFormElement).reportValidity();
      }
    },

    validate(e: Event) {
      const paymentValidationObj = this.$v.paymentAmountPoundsAsString as any;
      const currentTarget = e.currentTarget as HTMLInputElement;

      if (
        paymentValidationObj.fitsPattern &&
        +paymentValidationObj.$model <= 9999999999
      ) {
        this.formatValidatedPaymentAmountPoundsAsString =
          paymentValidationObj.$model;
      } else {
        paymentValidationObj.$model = this.formatValidatedPaymentAmountPoundsAsString;
      }

      if (paymentValidationObj.minValue && paymentValidationObj.required) {
        this.changeDueMessage = `Change due: ${this.$options.filters.currencyFormat(
          this.paymentAmount - this.order.orderTotal
        )}`;
        currentTarget.setCustomValidity("");
      } else {
        this.changeDueMessage = `Amount must be at least ${this.$options.filters.currencyFormat(
          this.order.orderTotal
        )}`;
        currentTarget.setCustomValidity(this.changeDueMessage);
      }

      this.$v.$touch;
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/global.scss";

.currency-input {
  display: flex;

  .currency-symbol {
    padding: 0 10px 0 0;
    font-size: 1.5em;
    color: #333;
  }
}

.checkmark {
  color: $success;
}

.controls {
  margin: 1.5rem 0 0 0;
  display: flex;
  justify-content: flex-end;
  button {
    margin-left: 1.5rem;
  }
}
</style>
