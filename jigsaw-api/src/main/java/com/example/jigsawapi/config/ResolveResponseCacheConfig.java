package com.example.jigsawapi.config;

import com.example.jigsawapi.dto.ResolveResponse;
import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import java.time.Duration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ResolveResponseCacheConfig {

    @Bean
    public Cache<String, ResolveResponse> resolveResponseCache(
            @Value("${jigsaw.cache.resolve.maximum-size:500}") long maximumSize,
            @Value("${jigsaw.cache.resolve.expire-after-access-hours:24}") long expireAfterAccessHours) {
        return Caffeine.newBuilder()
                .maximumSize(maximumSize)
                .expireAfterAccess(Duration.ofHours(expireAfterAccessHours))
                .recordStats()
                .build();
    }
}
