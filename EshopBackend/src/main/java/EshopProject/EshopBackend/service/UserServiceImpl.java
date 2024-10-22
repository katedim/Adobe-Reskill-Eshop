package EshopProject.EshopBackend.service;

import EshopProject.EshopBackend.model.appUser;
import EshopProject.EshopBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;


    @Override
    public appUser createUser(appUser user) {
        return userRepository.save(user);
    }

    @Override
    public List<appUser> getUsersList() {
        try{
            List<appUser> userList = new ArrayList<>();
            userRepository.findAll().forEach(userList::add);

            if(userList.isEmpty()) {
                return null;
            }
            else {
                return userList;
            }
        }
        catch (Exception ex) {
            return null;
        }
    }

    @Override
    public Optional<appUser> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

//    TBD
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

    public appUser getUserByUsername(String username) {
        return userRepository.findByUsername(username);  // Assuming this method exists in your repository
    }
}
