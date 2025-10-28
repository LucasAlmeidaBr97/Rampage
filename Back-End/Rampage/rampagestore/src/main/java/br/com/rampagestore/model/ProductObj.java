package br.com.rampagestore.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class ProductObj {

    //Atributos 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String productName;
    private String productDetai;
    private BigDecimal productPrice;//preço
    private double avaliation;
    private boolean status;
    private int amount;//quantidade
    private LocalDateTime createdAt;//data de criação
    
    //Construtor para ser usado no metodo de update
    public ProductObj(long id, String productName, String productDetai, BigDecimal productPrice, double avaliation,
            boolean status, int amount, LocalDateTime createdAt) {
        this.id = id; // Define o id manualmente
        this.productName = productName;
        this.productDetai = productDetai;
        this.productPrice = productPrice;
        this.avaliation = avaliation;
        this.status = status;
        this.amount = amount;
        this.createdAt = createdAt;
    }

    //Contrutor(contém somente os atributos que não são gerados automaticamente, exlucindo a data e o id) 
    public ProductObj(String productName, String productDetai, BigDecimal productPrice, double avaliation,
        boolean status, int amount) {
        this.productName = productName;
        this.productDetai = productDetai;
        this.productPrice = productPrice;
        this.avaliation = avaliation;
        this.status = status;
        this.amount = amount;
    }
    
    public ProductObj(){
        
    }

    //Métodos acessores 
    public String getProductName() {
        return productName;
    }

    public void setId(long id){
        this.id = id;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductDetai() {
        return productDetai;
    }

    public void setProductDetai(String productDetai) {
        this.productDetai = productDetai;
    }

    public BigDecimal getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(BigDecimal productPrice) {
        this.productPrice = productPrice;
    }

    public double getAvaliation() {
        return avaliation;
    }
    
    public void setAvaliation(double avaliation) {
        this.avaliation = avaliation;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public long getId() {
        return id;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }


    //Método que passa automaticamente a data que o produto foi criado
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "[Nome: "+productName+", Detalhes: "+productDetai+", Preço: "
                +productPrice+", Avalição: "+avaliation+", Quantidade: "+amount+"]";
    }

}
