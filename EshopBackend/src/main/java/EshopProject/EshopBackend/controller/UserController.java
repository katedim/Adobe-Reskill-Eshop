package EshopProject.EshopBackend.controller;

import EshopProject.EshopBackend.model.Product;
import EshopProject.EshopBackend.model.appUser;
import EshopProject.EshopBackend.service.ProductService;
import EshopProject.EshopBackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ProductService productService;

    @PostMapping("/users")
    public appUser createUser(@RequestBody appUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userService.createUser(user);
    }

    @GetMapping("/allUsers")
    public List<appUser> getAllUsers() {
        return userService.getUsersList();
    }

    @GetMapping("/users/{userId}")
    public Optional<appUser> getUser(@PathVariable("userId") Long userId) {
        return userService.getUserById(userId);
    }

    @PutMapping("/users/{userId}")
    public appUser updateUser(@RequestBody appUser user,@PathVariable("userId") Long userId) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userService.updateUser(user, userId);
    }

    @DeleteMapping("/users/{userId}")
    public String deleteUserById(@PathVariable("userId") Long userId) {
        userService.deleteUserById(userId);
        return "Deleted Successfully";
    }

    @PostMapping("/user/{userId}/favorite/add/{productId}")
    public ResponseEntity<appUser> addFavoriteProduct(@PathVariable Long userId, @PathVariable Long productId) {
        Optional<appUser> userOptional = userService.getUserById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Optional<Product> productOptional = productService.getProductById(productId);
        if (productOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        appUser user = userOptional.get();
        Product product = productOptional.get();

        if (!user.getFavoriteProducts().contains(product)) {
            user.getFavoriteProducts().add(product);
        }

        appUser updatedUser = userService.updateUser(user, user.getId());

        return ResponseEntity.ok(updatedUser);
    }

    // Remove a product from user's favorite list
    @DeleteMapping("/user/{userId}/favorite/delete/{productId}")
    public ResponseEntity<appUser> removeFavoriteProduct(@PathVariable Long userId, @PathVariable Long productId) {
        Optional<appUser> userOptional = userService.getUserById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Optional<Product> productOptional = productService.getProductById(productId);
        if (productOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        appUser user = userOptional.get();
        Product product = productOptional.get();

        if (user.getFavoriteProducts().contains(product)) {
            user.getFavoriteProducts().remove(product);
        }

        appUser updatedUser = userService.updateUser(user, user.getId());

        return ResponseEntity.ok(updatedUser);
    }


    @GetMapping("/user/{userId}/favorites")
    public ResponseEntity<List<Product>> getFavorites(@PathVariable Long userId) {
        List<Product> favorites = userService.getFavoritesByUserId(userId);
        return new ResponseEntity<>(favorites, HttpStatus.OK);
    }

}
