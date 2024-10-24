package EshopProject.EshopBackend.service;

import EshopProject.EshopBackend.model.Cart;
import EshopProject.EshopBackend.model.appUser;
import EshopProject.EshopBackend.repository.CartRepository;
import EshopProject.EshopBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Cart saveCart(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public Cart getCartByUser(Long userId) {
        appUser user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return cartRepository.findByUser(user);
    }

    @Override
    public Cart getCartById(Long cartId) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        return optionalCart.orElseThrow(() -> new RuntimeException("Cart with id " + cartId + " not found"));
    }

    @Override
    public Cart emptyCart(Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found with id " + cartId));

        if (cart.getProductItems() != null && !cart.getProductItems().isEmpty()) {
            cart.getProductItems().clear();
            cartRepository.save(cart);
        }
        return cart;
    }

}
