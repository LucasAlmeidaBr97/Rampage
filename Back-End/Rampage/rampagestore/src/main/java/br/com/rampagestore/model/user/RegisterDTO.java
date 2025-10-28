package br.com.rampagestore.model.user;



public record RegisterDTO(String name, String birthDate, String gender, String cpf, String email, String password, UserRole role) {
    
}

