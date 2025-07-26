package com.Momentum.Momentum.jwt.services;
/*
import com.Momentum.Momentum.usuario.GoogleUser;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GooglePublicKeysManager;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.http.javanet.NetHttpTransport;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

import org.springframework.stereotype.Service;

@Service
public class GoogleTokenVerifierService {

    private final GoogleIdTokenVerifier verifier;

    public GoogleTokenVerifierService() {
        verifier = new GoogleIdTokenVerifier.Builder(
                new NetHttpTransport(),
                JacksonFactory.getDefaultInstance()
        )
                .setAudience(Collections.singletonList("TU_CLIENT_ID_DE_GOOGLE")) // <- muy importante
                .build();
    }

    public GoogleUser verify(String idTokenString) {
        try {
            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();

                String email = payload.getEmail();
                String givenName = (String) payload.get("given_name");
                String familyName = (String) payload.get("family_name");
                String picture = (String) payload.get("picture"); // opcional

                return new GoogleUser(email, givenName, familyName, picture);
            }
        } catch (GeneralSecurityException | IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}*/

