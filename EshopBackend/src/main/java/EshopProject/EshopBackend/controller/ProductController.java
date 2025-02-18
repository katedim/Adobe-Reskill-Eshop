package EshopProject.EshopBackend.controller;


import EshopProject.EshopBackend.model.Product;
import EshopProject.EshopBackend.repository.ProductRepository;
import EshopProject.EshopBackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/admin/products")
    public Product createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    @GetMapping("/allProducts")
    public List<Product> getAllProducts() {
        return productService.getProductsList();
    }

    @GetMapping("/products/{productId}")
    public Optional<Product> getProduct(@PathVariable("productId") Long productId) {
        return productService.getProductById(productId);
    }

    @PutMapping("/admin/products/{productId}")
    public Product updateProduct(@RequestBody Product product, @PathVariable("productId") Long productId) {
        return productService.updateProduct(product, productId);
    }

    @DeleteMapping("/admin/products/{productId}")
    public ResponseEntity<String> deleteProductById(@PathVariable("productId") Long productId) {
        if (!productRepository.existsById(productId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
        }
        productService.deleteProductById(productId);
        return ResponseEntity.ok("Product deleted successfully");
    }

    @GetMapping("/products/categories")
    public ResponseEntity<Set<String>> getProductCategories() {
        Set<String> categories = productService.getUniqueCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/products/category/{category}")
    public List<Product> getProductsByCategory(@PathVariable("category") String category) {
        List<Product> allProducts = productService.getProductsList();
        return productService.filterProductsByCategory(allProducts, category);
    }

}
