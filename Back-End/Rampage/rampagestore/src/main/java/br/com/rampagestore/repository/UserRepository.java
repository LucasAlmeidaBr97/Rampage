package br.com.rampagestore.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import br.com.rampagestore.model.user.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    

    List<User> findByNameContainingIgnoreCase(String kayword);
    
    UserDetails findByEmail(String email);

    UserDetails findByCpf(String cpf);

    List<User> findAll();

    Optional<User> findById(long id);

    List<User> findByNameContaining(String term);

    User findByEmailAndStatus(String email, boolean status);
}
