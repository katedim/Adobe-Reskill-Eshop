package EshopProject.EshopBackend.service;

import EshopProject.EshopBackend.model.Product;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface ProductService {

//    Create Product
    Product createProduct(Product product);

//    Get all Products
    List<Product> getProductsList();

//    Get Product By ID
    Optional<Product> getProductById(Long productId);

//    Edit Product
    Product updateProduct(Product product, Long productId);

//    Delete Product
    void deleteProductById(Long productId);

    Set<String> getUniqueCategories();
}
