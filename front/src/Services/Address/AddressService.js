import authService from "../../auth/AuthService";
import CrudService from "../CRUDService";

class AddressService extends CrudService {
  static _instance = null;

  constructor() {
    super("/address-controller");

    if (AddressService._instance) return AddressService._instance;

    AddressService._instance = this;
  }

  async getAddressByIdUser(id){
    return await this.doGetById("/selecionar-todos-enderecos", id);
  }

  async getAddressSelected(){
    return JSON.parse(localStorage.getItem('addressSelected'));

  }

  async setAddressSelected(add){
    localStorage.setItem('addressSelected', JSON.stringify(add));
  }

  async definirPadrao(add){
    const data = {
      id: add.id,
      idUser: authService.getIdUser()
    }
    return await this.doPut("/change-standard", data);
  }

}

const addressService = new AddressService();
export default addressService;
