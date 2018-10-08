import axios from 'axios';

class apiCalls {
    static getData = section => {
      return axios.get(`http://localhost5001/api/${section}`);
    };
  
    static getSpecificData = (section, id) => {
      return axios.get(`http://localhost5001/api/${section}/${id}`);
    };
  
    static addData = (section, body) => {
      return axios.post(`http://localhost5001/api/${section}`, {
        body: JSON.stringify(body)
      });
    };
  
    static deleteData = (section, id) => {
      return fetch(`http://localhost5001/api/${section}/${id}`, {
        method: "DELETE"
      });
    };
  
    static editData = (section, id, body) => {
      return fetch(`http://localhost5001/api/${section}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(body)
      });
    };
  
  }
  
  module.exports = apiCalls;
  