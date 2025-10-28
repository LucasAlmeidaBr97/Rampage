import authService from "../auth/AuthService";

class CrudService {

  constructor(urlControllerEndpoint) {
    this.url = "http://localhost:8080";
    this._path = this.url + urlControllerEndpoint;
    this._token = authService.getToken();
    this._headers = {
      Authorization: `Bearer ${this._token}`,
      // Authorization: `Bearer ${this._token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  async doGet(urlEndpoint) {
    return await fetch(
      this._path + urlEndpoint,
      {
        method: 'GET',
        headers: this._headers
      }
    )
      .then((response) => {
        console.log(this._headers);
        
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data); // Log dos dados recebidos
        return data;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        return null;
      });
  }

  async doPost(urlEndpoint, data) {
    return await fetch(this._path + urlEndpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: this._headers,
    })
      .then((response) => {
        if (response.status === 403) {
          throw new Error("Falha no requisição.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        return data;
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        return null;
      });
  }

  async doPut(urlEndpoint, data) {
    return await fetch(this._path + urlEndpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: this._headers,
    })
      .then((response) => {
        if (response.status === 403) {
          throw new Error("Falha no requisição.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        return data;
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        return null;
      });
  }

  async doGetById(urlEndpoint, id) {    
    return await fetch(
      `${this._path}${urlEndpoint}?id=${id}`,
      {
        method: "GET",
        headers: this._headers,
      }
    )
      .then((response) => {
        if (response.status === 403) {
          throw new Error("Falha no requisição.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        return data;
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        return null;
      });
  }

  
  async doDelete(urlEndpoint, id) {    
    return await fetch(
      `${this._path}${urlEndpoint}?id=${id}`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    )
      .then((response) => {
        if (response.status === 403) {
          throw new Error("Falha no requisição.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        return data;
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        return null;
      });
  }

}

export default CrudService;
