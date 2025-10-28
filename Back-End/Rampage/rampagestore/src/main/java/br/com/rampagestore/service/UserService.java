package br.com.rampagestore.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;

import br.com.rampagestore.model.user.RegisterDTO;
import br.com.rampagestore.model.user.User;
import br.com.rampagestore.model.user.UserAddress;
import br.com.rampagestore.model.user.UserResponse;
import br.com.rampagestore.model.user.UserRole;
import br.com.rampagestore.repository.AddresRepository;
import br.com.rampagestore.repository.UserRepository;

@Service
public class UserService {

@Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired 
    private UserRepository userRepository;

    @Autowired
    private AddressService addressService;


    //Método para o usuário visualizar as proprias informações
  //  public ResponseEntity<?> selectUserInfos(Long id){
   //     List<UserAddress> userAddresses = addressService.selectAllAddresses(id);
  //  }     

    
    //Método para editar dados do cliente
      public ResponseEntity<?> editConsumer(long id,RegisterDTO changedData){
            Optional<User> optionalUser = userRepository.findById(id);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            User user = optionalUser.get();
            user.setName(changedData.name());
            LocalDate userBirth = LocalDate.parse(changedData.birthDate(), formatter);
            user.setBirthDate(userBirth);
            user.setGender(changedData.gender());
            userRepository.save(user);
            String encryptedPassword = passwordEncoder.encode(changedData.password());
            user.setPassword(encryptedPassword);
            return ResponseEntity.ok().build();
        }

    ///Método de Cadastro de cliente e endereço de cobrança 
    public ResponseEntity<?> registerNewConsumer(RegisterDTO data, UserAddress userAddress){
        if(this.userRepository.findByEmail(data.email()) != null)
            return ResponseEntity.badRequest().build();
        if(this.userRepository.findByCpf(data.cpf()) != null){
            return ResponseEntity.badRequest().build();
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate userBirth = LocalDate.parse(data.birthDate(), formatter);
        String userCPF = data.cpf().replaceAll("\\D", "");
        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        
        User newUser = new User(data.name(), userBirth, userCPF, data.email(), encryptedPassword, data.gender(), UserRole.CONSUMER, true);
        this.userRepository.save(newUser);
        long userId = newUser.getId();
        userAddress.setIdUser(userId);
        addressService.registerNewAddres(userAddress);
        return ResponseEntity.ok("OK");
    }


     //###############################                       ###############################
    //############################### METODOS DO BACKOFFICE ###############################
    //###############################                       ###############################



    //Método de Atualizar usuários do BackOffice
    public ResponseEntity<?> updateUsersBackOffice(long id, RegisterDTO data) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User existingUser = (User) userRepository.findByCpf(data.cpf());
            if(existingUser != null && existingUser.getId() != id ){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message","Erro ao atualizar! " 
                + "Já existe um usuário registrado com este CPF." 
                + "Verifique o CPF informado ou Contacte o Administrador do Sistema"));     
            }
            User user = optionalUser.get();
            user.setName(data.name());
            user.setCpf(data.cpf());
    
            if (data.password() != null && !data.password().isEmpty()) {
                String encryptedPassword = passwordEncoder.encode(data.password());
                user.setPassword(encryptedPassword);
            }
    
            // Verifica se o usuário logado é o mesmo que está sendo atualizado
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String currentUserEmail = authentication.getName();
            String message = "Usuário atualizado com sucesso";
            if (user.getEmail().equals(currentUserEmail)) {
                message+= ". Exceto o grupo, pois o usuário está logado no momento.";
            } else {
                user.setRole(data.role());
            }
            userRepository.save(user);
            return ResponseEntity.ok(Collections.singletonMap("message", message));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }
    }

    //Método Registrar funcionarios
    public ResponseEntity<?> registerUserBackOffice(RegisterDTO data){
        if(this.userRepository.findByEmail(data.email()) != null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", "Já existe um usuário registrado com este Email"));
        }
        if(this.userRepository.findByCpf(data.cpf()) != null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", "Já existe um usuário registrado com este CPF"));     
        }

        UserRole role = data.role();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate userBirth = LocalDate.parse(data.birthDate(), formatter);
        String userCPF = data.cpf().replaceAll("\\D", "");
        String encryptedPassword = passwordEncoder.encode(data.password());
        User newUser = new User(data.name(), userBirth, userCPF, data.email(), encryptedPassword, data.gender(), role, true);
        this.userRepository.save(newUser);
        return ResponseEntity.status(HttpStatus.OK).body(Collections.singletonMap("message", "Cadastro realizado com sucesso!"));
    }

    public ResponseEntity<?> getUserById(Long id) {

          User user = userRepository.findById(id).orElse(null);
          if (user == null)
              return ResponseEntity.notFound().build();

          return ResponseEntity.ok(user);

    }

    public ResponseEntity<?> editUserSite(User user) {
          User obj = userRepository.findById(user.getId()).orElse(null);
          if (obj == null){
              return new ResponseEntity<>(HttpStatus.NOT_FOUND);
          }

        obj.setName(user.getName());
        obj.setBirthDate(user.getBirthDate());
        obj.setGender(user.getGender());

        if (!user.getPassword().isBlank())
            obj.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(obj);

        return ResponseEntity.ok().build();
    }
}
