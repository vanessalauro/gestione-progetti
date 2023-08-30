<template>
    <footer class="footer">
      <div class="container-footer">
        <div class="footer-text">
          &copy; 2023 Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  </template>

<script>
export default {
  name: 'Footer'
}
</script>

<style>
.footer {
  background-color: #f2f2f2;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.container-footer {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-text {
  text-align: center;
  margin-top: 10px;
  color: #666;
  font-size: 9px;
}
</style>