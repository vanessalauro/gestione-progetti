<template>
  <div class="login-container">
    <div class="login-form">
      <h2 class="login-title">Accesso</h2>
      <form>
        <div class="form-group">
          <label for="username">Username</label>
          <input id="username" v-model="username" type="text" placeholder="Username" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" v-model="password" type="password" placeholder="Password" />
        </div>
        <button @click="login()" class="login-button">Accedi</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      // Dati di login inseriti dall'utente (es. username e password)
      const userData = {
        username: this.username,
        password: this.password,
      };

      // Opzioni di configurazione della richiesta
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };

      // Effettua la chiamata API al percorso '/api/login'
      fetch('/api/login', requestOptions)
        .then(response => response.json())
        .then(data => {
          // La richiesta è stata eseguita con successo
          console.log(data);
          // Esegui le azioni necessarie in caso di successo
        })
        .catch(error => {
          // Si è verificato un errore durante la richiesta
          console.error(error);
          // Esegui le azioni necessarie in caso di errore
        });
    }
  }
};
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
}

.login-form {
  width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.login-title {
  color: #3498db;
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  /*display: block;*/
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #2980b9;
}

#username,
#password {
  padding: 10px;
}
</style>