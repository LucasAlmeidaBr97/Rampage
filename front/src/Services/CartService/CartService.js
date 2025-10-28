class CartService {
  static _instance = null;

  constructor() {
    if (CartService._instance) {
      return CartService._instance;
    }
    CartService._instance = this;

    this._products = this.getCart().products || [];
    this._freight = this.getCart().freight || new Freight();
    this._objCart = new Cart(this._products, this._freight);
  }

  getCart() {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : { products: [], freight: {} };
  }

  async getItems() {
    return this._products;
  }

  addItem(product) {
    const item = this._products.find((p) => p.id === product.id);
    if (item) {
      item.quantityOrdered !== 0 ? item.quantityOrdered += product.quantityOrdered : item.quantityOrdered += 1;
    } else {
      if (product.quantityOrdered === 0)
        product.quantityOrdered = 1; 
      this._products.push(product);
    }
    alert("Produto adicionado com sucesso.");
    this.saveCart();
  }

  async removeItem(product) {
    const indexToRemove = this._products.findIndex(
      (item) => item.id === product.id
    );
    if (indexToRemove !== -1) {
      this._products.splice(indexToRemove, 1);
      this.saveCart();
    }
    if(this.getItems()){
      this.setFreight({deliveryTime: '', price: 0});
    }
  }

  getFreight() {
    return this._freight;
  }

  setFreight(freight) {
    this._freight = freight;
    this.saveCart();
  }

  getPaymentMethod(){
    return JSON.parse(localStorage.getItem('paymentMethod'));
  }

  setPaymentMethod(method){
    localStorage.setItem('paymentMethod', JSON.stringify(method));    
  }

  decreaseQuantity(product) {
    const item = this._products.find((p) => p.id === product.id);
    if (item && item.quantityOrdered > 1) {
      item.quantityOrdered -= 1;
      if (item.quantityOrdered === 0) {
        this.removeItem(item);
      }
      this.saveCart();
    }
  }

  attQuantity(product, qtd) {
    const item = this._products.find((p) => p.id === product.id);
    if (item) {
      item.quantityOrdered = qtd;
      if (qtd === 0) {
        this.removeItem(item);
      }
      this.saveCart();
    }
  }

  getTotalPrice() {
    let total = this._products.reduce((total, product) => {
      return total + product.productPrice * product.quantityOrdered;
    }, 0);

    if (this._freight?.price) total += this._freight.price;

    return total;
  }

  getSubTotalPrice() {
    return this._products.reduce((total, product) => {
      return total + product.productPrice * product.quantityOrdered;
    }, 0);
  }

  saveCart() {
    this._objCart.products = this._products;
    this._objCart.freight = this._freight;
    localStorage.setItem("cart", JSON.stringify(this._objCart));
  }

  cleanCart() {
    localStorage.removeItem("cart");
    this._products = [];
    this._freight = {};
  }
}

class Cart {
  constructor(productsArray = [], freight = {}) {
    this.products = productsArray;
    this.freight = freight;
  }
}

class Freight {
  constructor(deliveryTime = "", price = 0) {
    this.deliveryTime = deliveryTime;
    this.price = price;
  }
}

const cartService = new CartService();
export default cartService;
