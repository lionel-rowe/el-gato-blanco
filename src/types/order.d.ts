/**
 * Order Status
 * 0 = Created.
 * 1 = Paid.
 * 2 = Cancelled.
 */
type OrderStatus = 0 | 1 | 2;

type CurrencyCode = "gbp" | "eur" | "usd" | "cny";

type CurrencyMap = { [key in CurrencyCode]: ICurrency };

type SortFunctionMap = {
  [key in PropToSortBy]: (a: IProduct, b: IProduct) => number
};

type PropToSortBy = "price" | "name";

interface IOrder {
  id: string;
  createdOn: string;
  lastUpdated: string;
  orderStatus: OrderStatus;
  orderTotal: number;
  lineItems: ILineItem[];
  dirty: boolean;
}

interface ILineItem {
  product: ILineItemProduct;
  quantity: number;
  subTotal: number;
}

interface ILineItemProduct {
  id: string;
  category: ILineItemProductCategory;
  description: string;
  name: string;
  price: number;
}

interface ILineItemProductCategory {
  id: string;
  name: string;
  description: string;
}

/**
 * This is the model that the API expects when
 * updating the order.
 */
interface IOrderUpdate {
  lineItems: ILineItemUpdate[];
}

interface ILineItemUpdate {
  product: IProductId;
  quantity: number;
}

interface ICurrency {
  symbol: string;
}

interface ICurrencyOptions {
  currencyCode?: CurrencyCode;
  locale?: string | undefined;
}
