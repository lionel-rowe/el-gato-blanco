interface IProduct {
  id: string;
  category: IProductCategory;
  description: string;
  name: string;
  price: number;
  retired: boolean;
}

interface IProductCategory {
  id: string;
  name: string;
  description: string;
}

interface IProductUpdate {
  name: string;
  description: string;
  price: number;
  category: ICategoryId;
}

interface IProductId {
  id: string;
}
