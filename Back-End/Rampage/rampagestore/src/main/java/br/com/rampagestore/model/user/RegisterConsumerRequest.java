package br.com.rampagestore.model.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterConsumerRequest {
    private RegisterDTO registerDTO;
    private UserAddress userAddress;


}
