package br.com.rampagestore.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.rampagestore.model.user.UserAddress;
import br.com.rampagestore.repository.AddresRepository;

@Service
public class AddressService {

    @Autowired
    private AddresRepository addresRepository;


    //Método para selecionar todos os endereços
    public List<UserAddress> selectAllAddresses(Long id) {
        List<UserAddress> addresses = addresRepository.findAllByIdUser(id);
        return addresses;
    }

    //Metodo para selecionar endereços de cobrança 
    public ResponseEntity<?> selectBillingyAdrress(Long userId) {
        UserAddress userAddress = addresRepository.findByIdUserAndBillingAddressTrue(userId);
        return ResponseEntity.ok().body(userAddress);
    }

     //Método selecionar todos os endereços de entrega
     public ResponseEntity<?> selectAllDeliveryAdrress(Long userId) {
        List<UserAddress> addresses = addresRepository.findAllByIdUserAndDeliveryAddressTrueOrderByStandardDesc(userId);
        return ResponseEntity.ok().body(addresses);
    }

      //Método selecionar qual é o endereço de cobrança
      public ResponseEntity<?> selectBillingdAddres(long addresId){
        UserAddress billingUserAddress = addresRepository.findById(addresId);
        List<UserAddress> addresses = addresRepository.findAllByIdUser(billingUserAddress.getIdUser());
        if (!addresses.isEmpty()) {
            for (UserAddress usAd : addresses) {
                usAd.setBillingAddress(false);
                addresRepository.save(usAd);
            }
        }
        billingUserAddress.setBillingAddress(true);
        addresRepository.save(billingUserAddress);
        return ResponseEntity.ok().build();
    }
    

    //Método selecionar qual é o endereço de entrega padrão
    public ResponseEntity<?> selectStandardAddres(long addresId){
        UserAddress standardUserAddress = addresRepository.findById(addresId);
        List<UserAddress> addresses = addresRepository.findAllByIdUser(standardUserAddress.getIdUser());
        if (!addresses.isEmpty()) {
            for (UserAddress usAd : addresses) {
                usAd.setStandard(false);
                addresRepository.save(usAd);
            }
        }
        standardUserAddress.setStandard(true);
        addresRepository.save(standardUserAddress);
        return ResponseEntity.ok().build();
    }


    //Método Adicionar novo endereço
     public ResponseEntity<?> registerNewAddres(UserAddress userAddress){
        List<UserAddress> addresses = addresRepository.findAllByIdUser(userAddress.getIdUser());

        try {
            if (!addresses.isEmpty()) {
                userAddress.setBillingAddress(false);
                userAddress.setDeliveryAddress(true);
                userAddress.setStandard(false);
                userAddress.setStatus(true);
            } else {
                userAddress.setBillingAddress(true);
                userAddress.setDeliveryAddress(true);
                userAddress.setStandard(true);
                userAddress.setStatus(true);
            }

            UserAddress retorno = addresRepository.save(userAddress);
            return new ResponseEntity<>(retorno, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Erro ao salvar endereço: " + e.getMessage());
        }
    }

    public ResponseEntity<?> selectAllAdrress(Long id) {
        List<UserAddress> addresses = addresRepository.findAllByIdUserOrderByBillingAddressDescStandardDesc(id);
        return ResponseEntity.ok(addresses);
    }

    public ResponseEntity<?> changeStandard(Long id, Long idUser) {
        UserAddress add = addresRepository.findByIdUserAndStandardTrue(idUser);
        if (add != null){
            add.setStandard(false);
            addresRepository.save(add);
        }

        UserAddress addStandard = addresRepository.findById(id).orElse(null);
        if (addStandard != null){
            addStandard.setStandard(true);
            addresRepository.save(addStandard);
        }
        else {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> getAdressById(Long id) {
        UserAddress address = addresRepository.findById(id).orElse(null);
        return ResponseEntity.ok(address);
    }
}
