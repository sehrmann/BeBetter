import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

$(function() {
  if (document.getElementById('dashboard')){
    ReactDOM.render(
      <h1>Boo yaa</h1>,
      document.getElementById('dashboard')
    );
  }
});
