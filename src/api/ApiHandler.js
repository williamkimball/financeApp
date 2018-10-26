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

  getTransactions(data, type) {

    data = JSON.stringify(data)

    let getType = ""

    if (type === "transactions"){
      getType = "transactions/get"
      data = data.slice(0, -1); 
      data += ', "start_date": "2000-01-01", "end_date": "2018-09-04"}'
      console.log(data)
    }



    return fetch(`http://localhost:6060/${getType}`, {
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
