import { ProductRepository } from "../repositories/ProductRepository";
import { CartRepository } from "../repositories/CartRepository";
import { ProductUseCase } from "../../application/use-cases/products/productUseCase";
import { CartUseCase } from "../../application/use-cases/carts/cartUseCase";
import { ProductController } from "../../presentation/products/productController";
import { CartController } from "../../presentation/carts/cartsController";
import { ProductRoutes } from "../../presentation/products/productRoutes";
import { CartRoutes } from "../../presentation/carts/cartsRoutes";

export class DependencyContainer {
  private static instance: DependencyContainer;

  private readonly productRepository: ProductRepository;
  private readonly cartRepository: CartRepository;

  private readonly productUseCase: ProductUseCase;
  private readonly cartUseCase: CartUseCase;

  private readonly productController: ProductController;
  private readonly cartController: CartController;

  private readonly productRoutes: ProductRoutes;
  private readonly cartRoutes: CartRoutes;

  private constructor() {
    // Inicializar repositorios
    this.productRepository = new ProductRepository();
    this.cartRepository = new CartRepository();

    // Inicializar casos de uso
    this.productUseCase = new ProductUseCase(this.productRepository);
    this.cartUseCase = new CartUseCase(this.cartRepository);

    // Inicializar controladores
    this.productController = new ProductController(this.productUseCase);
    this.cartController = new CartController(this.cartUseCase);

    // Inicializar rutas
    this.productRoutes = new ProductRoutes(this.productController);
    this.cartRoutes = new CartRoutes(this.cartController);
  }

  public static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }

  public getProductRoutes(): ProductRoutes {
    return this.productRoutes;
  }

  public getCartRoutes(): CartRoutes {
    return this.cartRoutes;
  }
}
