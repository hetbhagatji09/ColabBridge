package com.example.apigateway.Util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {


    public static final String SECRET = "42fd281ad04c98138f1556dc95b9a535da7036974cdcca8d1c57f508689bb98e9f31fdcace377d432dfcfd90195a566e69d15a9bbd9de6d50262502eea823001ab7aa1209903ffa4b5767b169cd99f485efcf6dad4152eb80f4b9198c0707838251abaf4e278652039a0277715674b39e26f7121cd6777c57a349223f37a120fbed63e87154bbe72000906cdbc7edbaaffd8455eb8e40f3d56c00d33c6ea3bc6fceb45223df570a3404a159a023253e38c91bb2fc22fdfcb6386c90b82e745ba7239c5bbd437d6af4bca600bf8dee44ee6c5f7bcb75984f3dbb499707415f96d0dd09249d8ab235b8a9df3faed75c02b22946feb714127d5bedf3d3c4a369d80";


    public void validateToken(final String token) {
        Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token);
    }



    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
