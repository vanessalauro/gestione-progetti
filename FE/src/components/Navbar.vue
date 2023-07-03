<template>
    <nav class="navbar">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">Logo</router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item">Home</router-link>
          <router-link to="/about" class="navbar-item">About</router-link>
          <router-link to="/services" class="navbar-item">Services</router-link>
          <router-link to="/contact" class="navbar-item">Contact</router-link>
        </div>
        <div class="navbar-end">
          <router-link to="/login" class="navbar-item">Login</router-link>
          <router-link to="/register" class="navbar-item">Register</router-link>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
  }
  </script>
  
  <style>
  .navbar {
    background-color: #f1f1f1;
    padding: 10px;
  }
  
  .navbar-brand {
    font-weight: bold;
  }
  
  .navbar-item {
    margin-right: 10px;
    text-decoration: none;
    color: #333;
  }
  
  .navbar-item:hover {
    color: #000;
  }
  
  .navbar-start {
    margin-right: auto;
  }
  
  .navbar-end {
    margin-left: auto;
  }
  </style>
  