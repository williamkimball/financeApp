import axios from 'axios';

export const apiCalls = {

    async getData (section) {

      let results = await axios.get(`http://localhost:50297/api/${section}`).then( response => {return response.data});
      return await results
    },
  
    getSpecificData (section, id) {
      return  axios.get(`http://localhost:50297/api/${section}/${id}`).then(response => {let results = response.data;  return results});
    },
  
    addData (section, body) {
      return axios.post(`http://localhost:50297/api/${section}`, body);
    },
  
    deleteData (section, id) {
      return axios.delete(`http://localhost:50297/api/${section}/${id}`);
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

  

  