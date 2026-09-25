package com.crms.user;

import com.crms.role.Role;
import com.crms.role.RoleRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Test
    void createUserEncodesPasswordBeforeSaving() {
        User user = new User();
        user.setPassword("plain-password");
        when(passwordEncoder.encode("plain-password")).thenReturn("encoded-password");
        when(userRepository.save(user)).thenReturn(user);

        User result = userService.createUser(user);

        assertSame(user, result);
        assertEquals("encoded-password", user.getPassword());
        verify(userRepository).save(user);
    }

    @Test
    void updateUserCopiesFieldsAndEncodesProvidedPassword() {
        User existing = new User();
        User details = new User();
        details.setFullName("Updated Name");
        details.setEmail("updated@example.com");
        details.setPhone("555-0100");
        details.setRole(new Role());
        details.setIsActive(false);
        details.setPassword("new-password");
        when(userRepository.findById(7L)).thenReturn(Optional.of(existing));
        when(passwordEncoder.encode("new-password")).thenReturn("encoded-new-password");
        when(userRepository.save(existing)).thenReturn(existing);

        User result = userService.updateUser(7L, details);

        assertSame(existing, result);
        assertEquals("Updated Name", existing.getFullName());
        assertEquals("updated@example.com", existing.getEmail());
        assertEquals("555-0100", existing.getPhone());
        assertSame(details.getRole(), existing.getRole());
        assertFalse(existing.getIsActive());
        assertEquals("encoded-new-password", existing.getPassword());
    }

    @Test
    void updateUserLeavesPasswordUnchangedWhenNoPasswordProvided() {
        User existing = new User();
        existing.setPassword("existing-password");
        User details = new User();
        details.setPassword("");
        when(userRepository.findById(7L)).thenReturn(Optional.of(existing));
        when(userRepository.save(existing)).thenReturn(existing);

        userService.updateUser(7L, details);

        assertEquals("existing-password", existing.getPassword());
        verifyNoInteractions(passwordEncoder);
    }

    @Test
    void getUsersByRoleRequiresAnExistingRole() {
        Role role = new Role();
        when(roleRepository.findByName("ADMIN")).thenReturn(Optional.of(role));
        when(userRepository.findByRole(role)).thenReturn(List.of());

        assertTrue(userService.getUsersByRole("ADMIN").isEmpty());
        verify(userRepository).findByRole(role);
    }

    @Test
    void getUsersByRoleThrowsWhenRoleDoesNotExist() {
        when(roleRepository.findByName("UNKNOWN")).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> userService.getUsersByRole("UNKNOWN"));

        assertEquals("Role not found", exception.getMessage());
        verifyNoInteractions(userRepository);
    }
}
