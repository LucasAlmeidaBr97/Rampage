package br.com.rampagestore.valid;


 import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

 @ControllerAdvice
 public class Validation extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
            HttpHeaders headers, HttpStatusCode status, WebRequest request) {

            Map<String, String> errors = new HashMap<>();
            ex.getBindingResult().getAllErrors().forEach((error) -> {

              String fieldName = ((FieldError) error).getField();
              String message = error.getDefaultMessage();
              errors.put(fieldName, message);
            });

          return new ResponseEntity<Object>(errors, HttpStatus.BAD_REQUEST);
      }

    public boolean validateCpf(String cpf) {
      cpf = cpf.replaceAll("[^0-9]", ""); // Remove caracteres não numéricos do CPF
      return validCpf(cpf); // Retorna true se o CPF for válido, false se for inválido
    }
    
    private boolean validCpf(String cpf) {
      if (cpf.length() != 11) {
        return false;
      }
    
      if (cpf.chars().allMatch(c -> c == cpf.charAt(0))) {
        return false;
      }
    
      int total = 0;
      for (int i = 0; i < 9; i++) {
        total += (cpf.charAt(i) - '0') * (10 - i);
      }
      int firstDigit = (total * 10) % 11;
      if (firstDigit == 10) firstDigit = 0;
        if (firstDigit != (cpf.charAt(9) - '0')) {
          return false;
        }
    
      total = 0;
      for (int i = 0; i < 10; i++) {
        total += (cpf.charAt(i) - '0') * (11 - i);
      }
      int secondDigit = (total * 10) % 11;
      if (secondDigit == 10) secondDigit = 0;
        return secondDigit == (cpf.charAt(10) - '0');
    }

    public String formatCpf(String cpf) {
      return String.format("%s.%s.%s-%s",
              cpf.substring(0, 3),
              cpf.substring(3, 6),
              cpf.substring(6, 9),
              cpf.substring(9, 11));
    }

}
  