package com.Momentum.Momentum.oauth2;

import com.Momentum.Momentum.usuario.Usuario;
import com.Momentum.Momentum.usuario.UsuarioRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final UsuarioRepository usuarioRepository;

    public CustomOAuth2SuccessHandler(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        String email = ((org.springframework.security.oauth2.core.user.DefaultOAuth2User) authentication.getPrincipal())
                .getAttribute("email");

        Optional<Usuario> optionalUsuario = usuarioRepository.findByEmail(email);

        if (optionalUsuario.isPresent()) {
            Usuario user = optionalUsuario.get();

            // Si el rol ya fue seleccionado, redirigimos normalmente a la app
            if (user.getRole() != null) {
                response.sendRedirect("/"); // Cambiá esto al path real de tu frontend (ej: /home)
            } else {
                // Si aún no eligió un rol, lo redirigimos a la pantalla de selección
                response.sendRedirect("/select-role"); // Ruta en tu frontend donde elige RUNNER o COACH
            }
        }
    }
}

