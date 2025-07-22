/**
 * Defines the data structure for a Product.
 * This ensures type safety throughout the application when dealing with product data.
 */
export interface Product {
  /** A unique numerical identifier for the product. */
  id: number;
  /** The name of the product. */
  name: string;
  /** A detailed description of the product. */
  description: string;
  /** The price of the product. */
  price: number;
  /** The category to which the product belongs (e.g., 'Electronics', 'Books'). */
  category: string;
  /** A URL pointing to an image of the product. */
  imageUrl: string;
  /** The number of items currently in stock. */
  stock: number;
  /** The average customer rating, on a scale of 1 to 5. */
  rating: number;
}
