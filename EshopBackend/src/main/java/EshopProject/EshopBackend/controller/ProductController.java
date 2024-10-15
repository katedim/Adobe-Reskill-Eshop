package EshopProject.EshopBackend.controller;


import EshopProject.EshopBackend.model.Product;
import EshopProject.EshopBackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/products")
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

    @PutMapping("/products/{productId}")
    public Product updateProduct(@RequestBody Product product, @PathVariable("productId") Long productId) {
        return productService.updateProduct(product, productId);
    }

    @DeleteMapping("/products/{productId}")
    public String deleteProductById(@PathVariable("productId") Long productId) {
        productService.deleteProductById(productId);
        return "Deleted Successfully";
    }
}
