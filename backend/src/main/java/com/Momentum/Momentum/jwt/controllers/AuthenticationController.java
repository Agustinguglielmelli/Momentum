package com.Momentum.Momentum.jwt.controllers;

import com.Momentum.Momentum.jwt.dtos.GoogleLoginDto;
import com.Momentum.Momentum.usuario.GoogleUser;
import com.Momentum.Momentum.usuario.Usuario;
import com.Momentum.Momentum.jwt.dtos.LoginUserDto;
import com.Momentum.Momentum.jwt.dtos.RegisterUserDto;
import com.Momentum.Momentum.jwt.services.AuthenticationService;
import com.Momentum.Momentum.jwt.services.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    private final GoogleTokenVerifierService googleTokenVerifierService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService,
                                    GoogleTokenVerifierService googleTokenVerifierService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.googleTokenVerifierService = googleTokenVerifierService;
    }

    @PostMapping("/signup")
    public ResponseEntity<Usuario> register(@RequestBody RegisterUserDto registerUserDto) {
        Usuario registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        Usuario authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }
    @PostMapping("/google")
    public ResponseEntity<LoginResponse> authenticateWithGoogle(@RequestBody GoogleLoginDto googleLoginDto) {
        // 1. Verificar el token de Google
        GoogleUser googleUser = googleTokenVerifierService.verify(googleLoginDto.getToken());

        if (googleUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // 2. Buscar o registrar el usuario
        Usuario usuario = authenticationService.findOrCreateGoogleUser(googleUser);

        // 3. Generar JWT
        String jwtToken = jwtService.generateToken(usuario);

        // 4. Devolver el token como en /login
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }

}