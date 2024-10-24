package EshopProject.EshopBackend.controller;

import EshopProject.EshopBackend.model.Cart;
import EshopProject.EshopBackend.model.Product;
import EshopProject.EshopBackend.repository.CartRepository;
import EshopProject.EshopBackend.repository.ProductRepository;
import EshopProject.EshopBackend.repository.UserRepository;
import EshopProject.EshopBackend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartRepository cartRepository;

    @PostMapping
    public Cart createCart(@RequestBody Cart cart) {
        System.out.println("Creating cart for user: " + cart.getUser().getId());
        return cartService.saveCart(cart);
    }

    @PutMapping("/{cartId}/addProduct/{productId}")
    public Cart addProductToCart(@PathVariable Long cartId, @PathVariable Long productId) {
        Cart existingCart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart with id " + cartId + " not found"));

        Product productToAdd = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product with id " + productId + " not found"));

        Set<Product> productItems = existingCart.getProductItems();
        if (productItems == null) {
            productItems = new HashSet<>();
        }
        productItems.add(productToAdd);

        existingCart.setProductItems(productItems);

        return cartRepository.save(existingCart);
    }

    @PutMapping("/{cartId}/removeProduct/{productId}")
    public Cart removeProductFromCart(@PathVariable Long cartId, @PathVariable Long productId) {
        // Fetch the cart by its ID
        Cart existingCart = cartService.getCartById(cartId);
        if (existingCart == null) {
            throw new RuntimeException("Cart with id " + cartId + " not found.");
        }

        // Fetch the product to remove
        Product productToRemove = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product with id " + productId + " not found"));

        // Get current product items in the cart
        Set<Product> productItems = existingCart.getProductItems();
        System.out.println("Current product items in cart: " + productItems);

        // Check if the product is in the cart and remove it
        if (productItems != null && productItems.contains(productToRemove)) {
            productItems.remove(productToRemove);
        } else {
            throw new RuntimeException("Product with id " + productId + " is not part of the cart.");
        }

        existingCart.setProductItems(productItems);
        return cartService.saveCart(existingCart);
    }

    @GetMapping("/{userId}")
    public Cart getCartByUserId(@PathVariable Long userId) {
        return cartService.getCartByUser(userId);
    }

    @PutMapping("/{cartId}/emptyCart")
    public Cart emptyCart(@PathVariable Long cartId) {
        return cartService.emptyCart(cartId);
    }
}
