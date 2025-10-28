import CrudService from "../CRUDService";

class SiteService extends CrudService {
  constructor() {
    super("/site");
  }

  getProductByID = async (productId) => {
    return await fetch(`${this._path}/product-by-id?id=${productId}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => {
        window.alert("Erro ao buscar Produto.");
        console.error(err);
      });
  };

  doGet = async (urlEndpoint) => {
    return await fetch(this._path + urlEndpoint)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => alert("Erro ao buscar."));
  };

  getViaCepApi = async (cep) => {
    return await this.doGet(`/get-cep?cep=${cep}`);
  };
}

const siteService = new SiteService();
export default siteService;
