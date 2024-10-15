package EshopProject.EshopBackend.repository;

import EshopProject.EshopBackend.model.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<Product, Long> {
}
