/**
 * Representa un producto dentro del carrito
 */
export interface CartProduct {
  id_product: string;
  quantity: number;
}

/**
 * Representa un carrito de compras
 */
export interface Cart {
  id: string;
  products: CartProduct[];
  createdAt?: Date;
  updatedAt?: Date;
}
