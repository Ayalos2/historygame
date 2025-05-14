package br.com.ifpe.historygame.config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
@Configuration
public class IGDBConfig {

    @Value("${igdb.api.client-id}")
    private String clientId;

    @Value("${igdb.api.bearer-token}")
    private String bearerToken;

    @Value("${igdb.api.url}")
    private String apiUrl;

    public String getClientId() {
        return clientId;
    }

    public String getBearerToken() {
        return bearerToken;
    }

    public String getApiUrl() {
        return apiUrl;
    }
}
