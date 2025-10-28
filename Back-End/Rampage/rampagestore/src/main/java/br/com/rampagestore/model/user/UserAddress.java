package br.com.rampagestore.model.user;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
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
@Table(name = "user_addresses")
public class UserAddress {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private long idUser;

    @NotBlank(message = "Informe um CEP")
    @Pattern(regexp = "\\d{5}-\\d{3}", message = "O CEP deve estar no formato XXXXX-XXX")
    private String cep;

    @NotBlank(message = "Informe um UF")
    private String uf;

    @NotBlank(message = "Informe a Cidade")
    private String city;

    @NotBlank(message = "Informe o Bairro")
    private String neighborhood;

    @NotBlank(message = "Informe a Rua")
    private String logradouro;

    @NotBlank(message = "Informe o numero da residência")
    private String number;

    private String complement;

    private boolean billingAddress;
    private boolean deliveryAddress;
    private boolean status;
    private boolean standard;




}
