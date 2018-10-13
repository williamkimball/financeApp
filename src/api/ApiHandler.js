import axios from 'axios';

export const apiCalls = {
  methods: {
    getData (section) {
      console.log("I ran")
      return axios.get(`http://localhost:50297/api/${section}`);
    },
  
    getSpecificData (section, id) {
      return axios.get(`http://localhost:50297/api/${section}/${id}`);
    },
  
    addData (section, body) {
      return axios.post(`http://localhost:50297/api/${section}`, {
        body: JSON.stringify(body)
      });
    },
  
    deleteData (section, id) {
      return fetch(`http://localhost:50297/api/${section}/${id}`, {
        method: "DELETE"
      });
    },
  
    editData (section, id, body) {
      return fetch(`http://localhost:50297/api/${section}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(body)
      });
    }
  }
  }
  

  