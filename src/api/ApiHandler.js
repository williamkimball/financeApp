class apiCalls {
    static getData = section => {
      return fetch(`http://localhost5001/api/${section}`).then(e =>
        e.json()
      );
    };
  
    static getSpecificData = (section, id) => {
      return fetch(`http://localhost5001/api/${section}/${id}`).then(e =>
        e.json()
      );
    };
  
    static addData = (section, body) => {
      return fetch(`http://localhost5001/api/${section}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
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
  