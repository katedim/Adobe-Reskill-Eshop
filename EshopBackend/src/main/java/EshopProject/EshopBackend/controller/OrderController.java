package EshopProject.EshopBackend.controller;

import EshopProject.EshopBackend.model.Order;
import EshopProject.EshopBackend.model.Product;
import EshopProject.EshopBackend.model.appUser;
import EshopProject.EshopBackend.repository.OrderRepository;
import EshopProject.EshopBackend.repository.ProductRepository;
import EshopProject.EshopBackend.repository.UserRepository;
import EshopProject.EshopBackend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/order")
    public Order createOrder(@RequestBody Order order) {
        System.out.println("Creating order for user: " + order.getUser().getId());
        System.out.println("Number of products: " + (order.getProductItems() != null ? order.getProductItems().size() : 0));

        // Find the user by ID
        appUser user = userRepository.findById(order.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        order.setUser(user);

        // Check if productItems is null or empty
        Set<Product> productItems = new HashSet<>();
        if (order.getProductItems() != null) {
            for (Product product : order.getProductItems()) {
                Product existingProduct = productRepository.findById(product.getId())
                        .orElseThrow(() -> new RuntimeException("Product with id " + product.getId() + " not found"));
                productItems.add(existingProduct);
            }
        }

        // Set the productItems for the order
        order.setProductItems(productItems);

        // Save the order
        return orderRepository.save(order);
    }

    @GetMapping("/allOrders")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/order/{userId}")
    public List<Order> getOrdersByUserId(@PathVariable Long userId) {
        return orderService.findOrdersByUserId(userId);
    }

    @PutMapping("/admin/updateOrder/{orderId}")
    public Order updateOrder(@RequestBody Order order,@PathVariable("orderId") Long orderId) {
        return orderService.updateOrder(order);

    }


}
