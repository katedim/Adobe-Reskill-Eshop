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
        appUser currentUser = userRepository.findById(userId).get();

        if (Objects.nonNull(user.getUsername()) && !"".equalsIgnoreCase(user.getUsername())) {
            currentUser.setUsername(user.getUsername());
        }
        return userRepository.save(currentUser);
    }

    @Override
    public void deleteUserById(Long userId) {
        userRepository.deleteById(userId);
    }
}
