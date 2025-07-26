package com.Momentum.Momentum.oauth2;

import com.Momentum.Momentum.usuario.role.Role;
import com.Momentum.Momentum.usuario.Usuario;
import com.Momentum.Momentum.usuario.UsuarioRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UsuarioRepository usuarioRepository;

    public CustomOAuth2UserService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = new DefaultOAuth2UserService().loadUser(userRequest);

        String email = oauth2User.getAttribute("email");
        String givenName = oauth2User.getAttribute("given_name");
        String familyName = oauth2User.getAttribute("family_name");
        String picture = oauth2User.getAttribute("picture");

        Optional<Usuario> optionalUser = usuarioRepository.findByEmail(email);

        Usuario user;
        if (optionalUser.isPresent()) {
            user = optionalUser.get();
        } else {
            user = new Usuario();
            user.setEmail(email);
            user.setUsername(givenName + " " + familyName);
            user.setProfilePicture(picture);
            user.setAuthProvider(AuthProvider.GOOGLE);
            user.setPassword(UUID.randomUUID().toString()); // Ignorado para login social
            user.setRole(Role.RUNNER); // Valor default
            usuarioRepository.save(user);
        }

        return new CustomOAuth2User(oauth2User, user);
    }

}
