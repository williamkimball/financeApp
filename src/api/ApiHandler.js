import axios from "axios";

export const apiCalls = {
  async getData(section) {
    let results = await axios
      .get(`http://localhost:50297/api/${section}`)
      .then(response => {
        return response.data;
      });
    return await results;
  },

  getSpecificData(section, id) {
    return axios
      .get(`http://localhost:50297/api/${section}/${id}`)
      .then(response => {
        let results = response.data;
        return results;
      });
  },

  addData(section, body) {
    return axios.post(`http://localhost:50297/api/${section}`, body);
  },

  deleteData(section, id) {
    console.log(section, id);
    return axios.delete(`http://localhost:50297/api/${section}/${id}`);
  },

  editData(section, id, body) {
    return fetch(`http://localhost:50297/api/${section}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(body)
    });
  },

  getTransactions(data) {
    var data = JSON.stringify({
      "access_token": "access-sandbox-913c6392-87de-4889-abe3-9cb25c7463be",
      "secret": "6df1781bcc8b64c765c0c95adcba76",
      "client_id": "5bb9386199b2670011f77142",
      "start_date": "2000-01-01",
      "end_date": "2018-09-04"
    });
    return fetch(`http://localhost:6060/transactions/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: data
    }).then(function(response) {
      return response.json();
    })
 
    // var xhr = new XMLHttpRequest();
    
    // xhr.addEventListener("readystatechange", function () {
    //   if (this.readyState === 4) {
    //    return this.responseText
    //   }
    // });
    
    // // xhr.open("POST", "https://droplets-server.herokuapp.com/transactions/get");
    // xhr.open("POST", "http://localhost:6060/transactions/get");
    // xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.send(data);
}};
