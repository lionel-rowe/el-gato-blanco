interface ICategory {
  id: string;
  name: string;
  description: string;
  createdOn: string;
  lastUpdated: string;
  products: IProductId[];
  retired: boolean;
}

/**
 * This is the model that the API expects when
 * updating a category.
 */
interface ICategoryUpdate {
  name: string;
  description: string;
}

interface ICategoryId {
  id: string;
}
