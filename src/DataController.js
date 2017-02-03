import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; 

//import 'whatwg-fetch'; //for polyfill

var BASE_URI = 'https://api.spotify.com';

var controller = {
  search: function(searchQuery) {    
    var endPoint = '/v1/search';
    var uri = BASE_URI + endPoint + '?q='+searchQuery + '&type=track'; //+ '&api_key='+apiKey;
    console.log(uri);
    return fetch(uri) 
      .then(function(res) { return res.json() })
      .then(function(data) {
        ReactDOM.render(
          <App data={data} />, 
          document.querySelector('#root')
        );
        return data;
      })
  },
};


export default controller; //export object