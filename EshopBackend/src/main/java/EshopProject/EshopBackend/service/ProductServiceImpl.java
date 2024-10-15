package EshopProject.EshopBackend.service;

import EshopProject.EshopBackend.model.Product;
import EshopProject.EshopBackend.model.appUser;
import EshopProject.EshopBackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

//    TBD
    @Override
    public Product updateProduct(Product product, Long productId) {
        return null;
    }

    @Override
    public void deleteProductById(Long productId) {
        productRepository.deleteById(productId);
    }
}
