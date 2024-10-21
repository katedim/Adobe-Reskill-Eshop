package EshopProject.EshopBackend.controller;

import EshopProject.EshopBackend.service.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("rest/auth")
public class AuthenticationController {

    @Autowired
    private UserDetailService userDetailsService;

    @GetMapping("/welcome")
    public String welcome() {
        return "Hey! Welcome";
    }


    @GetMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestHeader("Authorization") String authHeader) {
        try {
            String[] credentials = new String(Base64.getDecoder().decode(authHeader.split(" ")[1])).split(":");
            String username = credentials[0];
            String password = credentials[1];


            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if (!new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder().matches(password, userDetails.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            Map<String, String> response = new HashMap<>();
            response.put("username", userDetails.getUsername());
            response.put("role", userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.joining(",")));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Login failed"));
        }
    }
}
