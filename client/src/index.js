import React from 'react';
import ReactDOM from "react-dom/client";
import { UserProvider } from './components/usercontext';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
  <App />
</UserProvider>,
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
