package br.com.rampagestore.service;

import br.com.rampagestore.model.user.User;
import br.com.rampagestore.model.user.UserRole;
import br.com.rampagestore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class VerificaDadosBanco implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        User user = userRepository.findByEmailAndStatus("Teste.Admin@example.com", true);
        if (user == null) {
            criaAdministradorPadrao();
            System.out.println("Primeiro usuário criado!");

        }
    }

    private void criaAdministradorPadrao(){
        String senhaEncriptada = new BCryptPasswordEncoder().encode("admin123");

        User usuario = new User();

        usuario.setName("Teste Admin");
        usuario.setEmail("Teste.Admin@example.com");
        usuario.setPassword(senhaEncriptada);
        usuario.setCpf("14391507021");
        usuario.setBirthDate(LocalDate.parse("2001-05-01"));
        usuario.setStatus(true);
        usuario.setRole(UserRole.ADMIN);

        userRepository.save(usuario);
    }
}

