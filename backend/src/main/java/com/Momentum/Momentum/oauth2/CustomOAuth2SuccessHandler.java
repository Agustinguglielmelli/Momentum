package com.Momentum.Momentum.oauth2;

import com.Momentum.Momentum.jwt.services.JwtService;
import com.Momentum.Momentum.usuario.Usuario;
import com.Momentum.Momentum.usuario.UsuarioRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final UsuarioRepository usuarioRepository;
    private final JwtService jwtService;

    public CustomOAuth2SuccessHandler(UsuarioRepository usuarioRepository, JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.jwtService = jwtService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        DefaultOAuth2User oAuth2User = (DefaultOAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");

        Optional<Usuario> optionalUsuario = usuarioRepository.findByEmail(email);

        if (optionalUsuario.isPresent()) {
            Usuario user = optionalUsuario.get();

            // Generar el token JWT para el usuario
            String jwt = jwtService.generateToken(user);

            // Redirigir al frontend con el token como parámetro
            if (user.getRole() != null) {
                response.sendRedirect("http://localhost:3000?token=" + jwt); // Cambiar por URL real de tu frontend
            } else {
                response.sendRedirect("http://localhost:3000/select-role?token=" + jwt);
            }
        } else {
            // si usuario no existe, entonces redirige con error
            response.sendRedirect("http://localhost:3000/login?error=usuario_no_registrado");
        }
    }
}
