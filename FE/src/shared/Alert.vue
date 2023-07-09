<template>
    <div v-if="isVisible" class="alert" :class="alertType">
      {{ message }}
      <button @click="closeAlert" class="close-button">×</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Alert',
    data() {
      return {
        isVisible: false,
        message: '',
        alertType: ''
      };
    },
    methods: {
      showAlert(message, type = 'info') {
        this.message = message;
        this.alertType = type;
        this.isVisible = true;
      },
      closeAlert() {
        this.isVisible = false;
        this.message = '';
        this.alertType = '';
      }
    }
  };
  </script>
  
<style scoped>
.alert {
    padding: 10px;
    border-radius: 5px;
}

.error {
    background-color: #f44336;
    color: #fff;
}

.warning {
    background-color: #ff9800;
    color: #fff;
}

.success {
    background-color: #4caf50;
    color: #fff;
}
</style>
  
