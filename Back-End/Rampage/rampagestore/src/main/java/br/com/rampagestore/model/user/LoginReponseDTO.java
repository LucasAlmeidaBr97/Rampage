package br.com.rampagestore.model.user;

public record LoginReponseDTO<T>(String token, T userRole, Long id) {
    
}
