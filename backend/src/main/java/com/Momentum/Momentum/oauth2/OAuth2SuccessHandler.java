package com.Momentum.Momentum.oauth2;

import com.Momentum.Momentum.jwt.services.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        Usuario user = (Usuario) authentication.getPrincipal();
        String jwt = jwtService.generateToken(user);

        // Redirigir al frontend con el token (por query param, o podrías usar cookie)
        String redirectUrl = "http://localhost:3000/oauth2-success?token=" + jwt;
        response.sendRedirect(redirectUrl);
    }
}

