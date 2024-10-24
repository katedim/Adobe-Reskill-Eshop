package EshopProject.EshopBackend.service;

import EshopProject.EshopBackend.model.appUser;
import EshopProject.EshopBackend.model.Product;
import EshopProject.EshopBackend.repository.ProductRepository;
import EshopProject.EshopBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public appUser createUser(appUser user) {
        return userRepository.save(user);
    }

    @Override
    public List<appUser> getUsersList() {
        try {
            List<appUser> userList = new ArrayList<>();
            userRepository.findAll().forEach(userList::add);

            return userList.isEmpty() ? null : userList;
        } catch (Exception ex) {
            return null;
        }
    }

    @Override
    public Optional<appUser> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    @Override
    public appUser updateUser(appUser user, Long userId) {
        Optional<appUser> optionalUser = userRepository.findById(userId);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User with ID " + userId + " not found");
        }

        appUser currentUser = optionalUser.get();

        if (Objects.nonNull(user.getUsername()) && !"".equalsIgnoreCase(user.getUsername())) {
            currentUser.setUsername(user.getUsername());
        }

        if (Objects.nonNull(user.getPassword()) && !"".equalsIgnoreCase(user.getPassword())) {
            currentUser.setPassword(user.getPassword());
        }

        if (Objects.nonNull(user.getEmail()) && !"".equalsIgnoreCase(user.getEmail())) {
            currentUser.setEmail(user.getEmail());
        }

        if (Objects.nonNull(user.getFirstname()) && !"".equalsIgnoreCase(user.getFirstname())) {
            currentUser.setFirstname(user.getFirstname());
        }

        if (Objects.nonNull(user.getLastname()) && !"".equalsIgnoreCase(user.getLastname())) {
            currentUser.setLastname(user.getLastname());
        }

        return userRepository.save(currentUser);
    }

    @Override
    public void deleteUserById(Long userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public appUser getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public appUser addFavoriteProduct(Long userId, Long productId) {
        Optional<appUser> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User with ID " + userId + " not found");
        }

        Optional<Product> productOptional = productRepository.findById(productId);
        if (productOptional.isEmpty()) {
            throw new RuntimeException("Product with ID " + productId + " not found");
        }

        appUser user = userOptional.get();
        Product product = productOptional.get();

        if (!user.getFavoriteProducts().contains(product)) {
            user.getFavoriteProducts().add(product);
        }

        return userRepository.save(user);
    }

    @Override
    public appUser removeFavoriteProduct(Long userId, Long productId) {
        Optional<appUser> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User with ID " + userId + " not found");
        }

        Optional<Product> productOptional = productRepository.findById(productId);
        if (productOptional.isEmpty()) {
            throw new RuntimeException("Product with ID " + productId + " not found");
        }

        appUser user = userOptional.get();
        Product product = productOptional.get();

        user.getFavoriteProducts().remove(product);

        return userRepository.save(user);
    }

    @Override
    public List<Product> getFavoritesByUserId(Long userId) {
 
        appUser user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            return user.getFavoriteProducts();
        }
        return Collections.emptyList();
    }

}
