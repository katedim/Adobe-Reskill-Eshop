package EshopProject.EshopBackend.service;

import EshopProject.EshopBackend.model.Product;
import EshopProject.EshopBackend.model.appUser;
import EshopProject.EshopBackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public List<Product> getProductsList(){
        try{
            List<Product> productList = new ArrayList<>();
            productRepository.findAll().forEach(productList::add);

            if(productList.isEmpty()) {
                return null;
            }
            else {
                return productList;
            }
        }
        catch (Exception ex) {
            return null;
        }
    }

    @Override
    public Optional<Product> getProductById(Long productId) {
        return productRepository.findById(productId);
    }

    @Override
    public Product updateProduct(Product product, Long productId) {

    Optional<Product> optionalProduct = productRepository.findById(productId);

    if (optionalProduct.isEmpty()) {
        throw new RuntimeException("Product with ID " + productId + " not found");
    }

    Product currentProduct = optionalProduct.get();

    if (Objects.nonNull(product.getProduct_name()) && !"".equalsIgnoreCase(product.getProduct_name())) {
        currentProduct.setProduct_name(product.getProduct_name());
    }

    if (Objects.nonNull(product.getProduct_description()) && !"".equalsIgnoreCase(product.getProduct_description())) {
        currentProduct.setProduct_description(product.getProduct_description());
    }

    if (Objects.nonNull(product.getProduct_category()) && !"".equalsIgnoreCase(product.getProduct_category())) {
        currentProduct.setProduct_category(product.getProduct_category());
    }

    if (Objects.nonNull(product.getProduct_price())) {
        currentProduct.setProduct_price(product.getProduct_price());
    }

    if (Objects.nonNull(product.getProduct_sale_price())) {
        currentProduct.setProduct_sale_price(product.getProduct_sale_price());
    }

    if (Objects.nonNull(product.getProduct_stock())) {
        currentProduct.setProduct_stock(product.getProduct_stock());
    }

    if (Objects.nonNull(product.getProduct_reviews()) && !"".equalsIgnoreCase(product.getProduct_reviews())) {
        currentProduct.setProduct_reviews(product.getProduct_reviews());
    }

    // Save the updated product back to the database
    return productRepository.save(currentProduct);
}


    @Override
    public void deleteProductById(Long productId) {
        if (productRepository.existsById(productId)) {
            productRepository.deleteById(productId);
        } else {
            throw new RuntimeException("Product with id " + productId + " not found");
        }
    }

    @Override
    public Set<String> getUniqueCategories() {
        List<Product> products = getProductsList();
        Set<String> uniqueCategories = new HashSet<>();

        for (Product product : products) {
            String category = product.getProduct_category();
            if (category != null) {
                uniqueCategories.add(category);
            }
        }
        return uniqueCategories;
    }

    @Override
    public List<Product> filterProductsByCategory(List<Product> allProducts, String category) {
        return allProducts.stream()
                .filter(product -> product.getProduct_category() != null &&
                        product.getProduct_category().equalsIgnoreCase(category))
                .collect(Collectors.toList());
    }

}
