import Vue from "vue";

import titleCase from './title-case';
import dateTimeFormat from './date-time-format';
import currencyFormat from "./currency-format";
import truncateWithTitleSafeHtml from "./truncate-with-title-safe-html";

Vue.filter("titleCase", titleCase);
Vue.filter("dateTimeFormat", dateTimeFormat);
Vue.filter("currencyFormat", currencyFormat);
Vue.filter("truncateWithTitleSafeHtml", truncateWithTitleSafeHtml);
