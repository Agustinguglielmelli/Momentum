package com.Momentum.Momentum.jwt.services;

import com.Momentum.Momentum.usuario.AuthProvider;
import com.Momentum.Momentum.usuario.Usuario;
import com.Momentum.Momentum.usuario.UsuarioRepository;
import com.Momentum.Momentum.jwt.dtos.LoginUserDto;
import com.Momentum.Momentum.jwt.dtos.RegisterUserDto;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {
    private final UsuarioRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            UsuarioRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Usuario signup(RegisterUserDto input) {
        Usuario user = new Usuario();
        user.setUsername(input.getUsername());
        user.setEmail(input.getEmail());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setProfilePicture(input.getProfilePicture());
        user.setRole(input.getRole());

        return userRepository.save(user);
    }

    public Usuario authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return userRepository.findByEmail(input.getEmail())
                .orElseThrow();
    }
    public Usuario findOrCreateGoogleUser(GoogleUser googleUser) {
        Optional<Usuario> existingUser = userRepository.findByEmail(googleUser.getEmail());

        if (existingUser.isPresent()) {
            Usuario user = existingUser.get();

            if (user.getAuthProvider() != null && user.getAuthProvider() != AuthProvider.GOOGLE) {
                throw new RuntimeException("El usuario ya existe con otro método de autenticación.");
            }

            return user; // usuario existente con login por Google
        }

        // Si no existe, lo creamos como usuario nuevo
        Usuario newUser = new Usuario();
        newUser.setEmail(googleUser.getEmail());
        newUser.setUsername(googleUser.getEmail()); // o podrías generar uno a partir del nombre
        newUser.setAuthProvider(AuthProvider.GOOGLE);
        newUser.setPassword(null); // no se necesita password para Google
        newUser.setRole(Role.USER); // o el rol por defecto que uses
        newUser.setProfilePicture(null); // podrías usar uno por defecto o extraerlo de Google

        return userRepository.save(newUser);
    }

    }