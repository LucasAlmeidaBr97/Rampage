package br.com.rampagestore.control;

import java.io.UnsupportedEncodingException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.rampagestore.config.securityconfig.TokenService;
import br.com.rampagestore.model.user.AuthenticationDTO;
import br.com.rampagestore.model.user.LoginReponseDTO;
import br.com.rampagestore.model.user.RegisterConsumerRequest;
import br.com.rampagestore.model.user.RegisterDTO;
import br.com.rampagestore.model.user.User;
import br.com.rampagestore.model.user.UserAddress;
import br.com.rampagestore.model.user.UserRole;
import br.com.rampagestore.repository.UserRepository;
import br.com.rampagestore.service.UserService;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserService userService;

    @GetMapping("/validate-token")
    public ResponseEntity<?> validateTokenUser(@RequestParam(name = "token") String token) throws UnsupportedEncodingException {
        String retorno = tokenService.validateToken(token);
        boolean valid = !retorno.isEmpty();
        Message message = new Message(valid);
        System.out.println(message);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/login_consumer")
    public ResponseEntity<?> loginConsumer(@RequestBody @Valid AuthenticationDTO data) throws IllegalArgumentException, UnsupportedEncodingException {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateToken((User) auth.getPrincipal());
        UserRole role = ((User) auth.getPrincipal()).getRole();
        Long id = ((User) auth.getPrincipal()).getId();

        return ResponseEntity.ok(new LoginReponseDTO(token, role, id));
    }


    //Alteração de dados do cliente
    @PutMapping("/update_consumer/{id}")
    public ResponseEntity<?> updateConsumer(@PathVariable Long id, @RequestBody @Valid RegisterDTO data) {
        return userService.editConsumer(id, data);
    }

    //Registro de cliente
    @PostMapping("/register_consumer")
    public ResponseEntity<?> registerConsumer(@RequestBody @Valid RegisterConsumerRequest request) {
        RegisterDTO data = request.getRegisterDTO();
        UserAddress userAddress = request.getUserAddress();
        return userService.registerNewConsumer(data, userAddress);
    }


    //###############################                       ###############################
    //############################### METODOS DO BACKOFFICE ###############################
    //###############################                       ###############################


    //Login do BackOffice
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthenticationDTO data) throws IllegalArgumentException, UnsupportedEncodingException {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateToken((User) auth.getPrincipal());
        UserRole role = ((User) auth.getPrincipal()).getRole();
        Long id = ((User) auth.getPrincipal()).getId();
        System.out.println(role);
        return ResponseEntity.ok(new LoginReponseDTO(token, role, id));
    }

    @GetMapping("/listarUsuarios")
    public Iterable<User> listingUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/get-user")
    public ResponseEntity<?> getUserById(@RequestParam(name = "id") Long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/edit-user-site")
    public ResponseEntity<?> editUserSite(@RequestBody User user) {
        return userService.editUserSite(user);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/nomeContem")
    public Iterable<User> nameContain(@RequestParam String term) {
        return userRepository.findByNameContaining(term);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/mudarStatus")
    public ResponseEntity<?> changeStatus(@RequestBody User user) {
        User changeUser = (User) userRepository.findByEmail(user.getEmail());
        if (changeUser == null) {
            return ResponseEntity.notFound().build();
        }
        changeUser.setStatus(!changeUser.isStatus());
        userRepository.save(changeUser);
        return ResponseEntity.ok().build();
    }

    //Atualizar usuário do BackOffice
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/updateUser/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody @Valid RegisterDTO data) {
        return userService.updateUsersBackOffice(id, data);
    }

    @PreAuthorize("hasRole('ADMIN')")
    //Registro de Funcionarios
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterDTO data) {
        return userService.registerUserBackOffice(data);
    }


}

class Message {
    private String message;
    private boolean valid;

    public Message(boolean valid) {
        this.valid = valid;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    @Override
    public String toString() {
        return "Message{" +
                "message='" + message + '\'' +
                ", valid=" + valid +
                '}';
    }
}
