import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './components/Dashboard';

$(function() {
  if (document.getElementById('dashboard')){
    ReactDOM.render(
      < Dashboard />,
      document.getElementById('dashboard')
    );
  }
});
