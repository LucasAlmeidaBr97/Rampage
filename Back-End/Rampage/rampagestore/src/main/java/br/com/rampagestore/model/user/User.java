package br.com.rampagestore.model.user;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import org.hibernate.validator.constraints.br.CPF;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserDetails {

    public User(String name, LocalDate birthDate, String cpf, String email, String password, String gender, UserRole role, boolean status) {
        this.name = name;
        this.birthDate = birthDate;
        this.cpf = formatCpf(cpf);
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.role = role;
        this.status = status;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "Informe um nome")
    @Pattern(regexp = "^(?=.*[a-zA-ZÀ-ÿ])(?=\\S)([a-zA-ZÀ-ÿ]{3,}\\s+){1,}[a-zA-ZÀ-ÿ]{3,}$", 
    message = "O nome deve conter pelo menos duas palavras, cada uma com no mínimo três letras.")
    private String name;

    @NotNull(message = "A data de nascimento é obrigatória")
    @Past(message = "A data de nascimento deve ser uma data no passado")
    private LocalDate birthDate;

    @NotBlank(message = "Informe um cpf")
    @CPF(message = "Informe um cpf valido")
    private String cpf;

    @Email(message = "Informe um email válido")
    @NotBlank(message = "Informe um email")
    private String email;

    @NotBlank(message = "Informe uma senha")
    private String password;
    
    private String gender;

    @NotNull(message = "Informe o papel do usuário")
    @Enumerated(EnumType.STRING)
    private UserRole role;

    private boolean status;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.role == UserRole.ADMIN) return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_STOKIST"));
        if(this.role == UserRole.STOKIST) return List.of(new SimpleGrantedAuthority("ROLE_STOKIST"));
        else return List.of(new SimpleGrantedAuthority("ROLE_CONSUMER"));
    }

    @Override
    public String getPassword(){
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    public String formatCpf(String cpf) {
        return String.format("%s.%s.%s-%s",
                cpf.substring(0, 3),
                cpf.substring(3, 6),
                cpf.substring(6, 9),
                cpf.substring(9, 11));
    }
}