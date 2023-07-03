<template>
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <img src="/assets/logo.png" alt="Logo" />
          </div>
          <div class="footer-links">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div class="footer-text">
          &copy; 2023 Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  </template>

<script>
export default {
  name: 'Footer',
}
</script>

<style>
.footer {
  background-color: #f2f2f2;
  padding: 20px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-logo img {
  height: 40px;
}

.footer-links {
  display: flex;
}

.footer-links a {
  margin-right: 10px;
  text-decoration: none;
  color: #333;
}

.footer-text {
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}
</style>