import { ProductsService } from './../products/products.service';
export declare class SeedService {
    private readonly productsService;
    constructor(productsService: ProductsService);
    runSeed(): Promise<string>;
    private insertNewProducts;
}
