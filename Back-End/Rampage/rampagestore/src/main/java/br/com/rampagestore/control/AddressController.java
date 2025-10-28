package br.com.rampagestore.control;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.rampagestore.model.user.UserAddress;
import br.com.rampagestore.service.AddressService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/address-controller")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AddressController {


    @Autowired
    private AddressService addressService;

    @GetMapping("selecionar_endereço_faturamento/{id}")//id do cliente
    public ResponseEntity<?> selectBillingAddress(@PathVariable Long id) {
        return addressService.selectBillingdAddres(id);
    }

    //Seleciona todos os endereços de entrega
    @GetMapping("selecionar_endereços/{id}")//id do cliente
    public ResponseEntity<?> selectAllAddress(@PathVariable Long id) {
        return addressService.selectAllDeliveryAdrress(id);
    }

    @GetMapping("/selecionar-todos-enderecos")//id do cliente
    public ResponseEntity<?> selectAllAddressByIdUser(@RequestParam(name = "id") Long id) {
        return addressService.selectAllAdrress(id);
    }


    @GetMapping("/indicate_billing_address/{id}")//id do endereço q sera alterado
    public ResponseEntity<?> indicateBillingAddress(@PathVariable Long id) {
        return addressService.selectBillingdAddres(id);
    }

    //Indicar endereço padrão de entrega
    @GetMapping("/indicate-standard-addres/{id}")//id do endereço q sera alterado
    public ResponseEntity<?> indicateStandardAddres(@PathVariable Long id) {
        return addressService.selectStandardAddres(id);
    }

    //Registrar novo Endereço
    @PostMapping("/register-address")
    public ResponseEntity<?> registerAddres(@RequestBody UserAddress userAddress) {
        return addressService.registerNewAddres(userAddress);
    }

    //Indicar todos endereço de entrega
    @GetMapping("/indicate-all-delivery-address")
    public ResponseEntity<?> indicateAllDeliveryAddress(@RequestParam(name = "id") Long userId) {
        return addressService.selectAllDeliveryAdrress(userId);
    }

    @PutMapping("/change-standard")
    public ResponseEntity<?> changeStandard(@RequestBody UserAddress userAddress) {
        return addressService.changeStandard(userAddress.getId(), userAddress.getIdUser());
    }

    @GetMapping("/get-address")
    public ResponseEntity<?> getAdressById(@RequestParam(name = "id") Long id) {
        return addressService.getAdressById(id);
    }
}
