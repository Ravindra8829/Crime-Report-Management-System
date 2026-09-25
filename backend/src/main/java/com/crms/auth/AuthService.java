package com.crms.auth;

import com.crms.auth.dto.LoginRequest;
import com.crms.auth.dto.LoginResponse;
import com.crms.user.User;
import com.crms.user.UserRepository;
import com.crms.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    public LoginResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtUtil.generateToken(userDetails);

        User user = userRepository.findByUsername(loginRequest.getUsername()).orElse(null);
        Long id = user != null ? user.getId() : null;
        String fullName = user != null ? user.getFullName() : userDetails.getUsername();
        String role = (user != null && user.getRole() != null) ? user.getRole().getName() : "USER";

        return new LoginResponse(token, id, userDetails.getUsername(), fullName, role);
    }
} 