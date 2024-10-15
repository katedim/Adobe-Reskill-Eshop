package EshopProject.EshopBackend.service;

import EshopProject.EshopBackend.model.appUser;
import EshopProject.EshopBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<appUser>  user = Optional.ofNullable(userRepository.findByUsername(username));
        if (user.isPresent()) {
            var userObj = user.get();
            return User.builder()
                    .username(userObj.getUsername())
                    .password(userObj.getPassword())
                    .roles(getRoles(userObj))
                    .build();
        }
        else {
            throw  new UsernameNotFoundException("Not found: " + username);
        }
    }

    private String[] getRoles(appUser user) {
        if (user.getRole() == null) {
            return new String[] {"USER"};
        }

        return user.getRole().split(",");
    }
}
