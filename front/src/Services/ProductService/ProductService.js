import CrudService from "../CRUDService";

class ProductService extends CrudService {
  static instance = null;

  constructor() {
    super("/product-controller");

    if (ProductService.instance) return ProductService.instance;
    ProductService.instance = this;
  }

  getProductByTerm = async (term) => {
    return await fetch(
      `${this._path}/produtos_contem_palavra?term=${encodeURIComponent(term)}`,
      {
        headers: { Authorization: `Bearer ${this._token}` },
      }
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => alert("Erro ao buscar produtos."));
  };

  doPostMultiPartFile = async (urlEndpoint, data) => {
    return await fetch(`${this._path}${urlEndpoint}`, {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${this._token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => alert("Erro ao fazer requisição."));
  };

  doPutMultiPartFile = async (urlEndpoint, data) => {
    return await fetch(`${this._path}${urlEndpoint}`, {
      method: "PUT",
      body: data,
      headers: {
        Authorization: `Bearer ${this._token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => alert("Erro ao fazer requisição."));
  };

  editProductWithImages = async (data) => {
    return await this.doPut("/edit-product", data)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => alert("Erro ao fazer requisição."));
  };

  changeStatusProduct = async (id) => {
    return await this.doPut("/mudar_status_produto?id="+id, '')
    .catch((err) => alert("Erro ao fazer requisição.", err));
  };
}

const productService = new ProductService();
export default productService;
