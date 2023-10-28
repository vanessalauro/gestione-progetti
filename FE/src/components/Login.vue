<template>
  <!--<div class="login-container">
    <div class="login-form">
      <h2 class="login-title">Accesso</h2>
      <form>
        <div class="row">
          <div class="col-sm-12 m-auto">
            <input id="username" v-model="username" class="form-control" type="text" placeholder="Username" />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 m-auto">
            <input id="password" v-model="password" class="form-control" type="password" placeholder="Password" />
          </div>
        </div>
        <button @click="login()" :disabled="checkFields()" class="btn btn-primary">Accedi</button>
        <p class="mt-3">Se non sei ancora registrato, <router-link to="/register">clicca qui</router-link></p>
      </form>
    </div>
  </div>-->
  <!--<Alert />-->
  <!--<div class="container-login">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card-login">
          <div class="card-header-login">Login</div>
          <div class="card-body-login">
            <form action="/login" method="post">
              <div class="form-group row">
                <div class="col-sm-12">
                  <span class="input-group-text"><i class="mdi mdi-account"></i></span>
                  <input id="username" v-model="username" class="form-control" type="text" placeholder="Username" />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-12">
                  <span class="input-group-text"><i class="mdi mdi-lock"></i></span>
                  <input id="password" v-model="password" class="form-control" type="password" placeholder="Password" />
                </div>
              </div>
              <div class="form-group row">
                <button @click="login()" :disabled="checkFields()" class="btn btn-primary w-100">Accedi</button>
                <p class="mt-3">Se non sei ancora registrato, <router-link to="/register">clicca qui</router-link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>-->
  <div class="login-container">
    <div class="login-form">
      <h2>Login</h2>
      <form action="/login" method="post">
        <div class="row mb-2">
          <div class="col-sm-10 m-auto">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  <i class="mdi mdi-account"></i>
                </span>
              </div>
              <input id="username" v-model="username" class="form-control" type="text" placeholder="Username"
                aria-describedby="basic-addon1">
            </div>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-sm-10 m-auto">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  <i class="mdi mdi-lock"></i>
                </span>
              </div>
              <input id="password" v-model="password" class="form-control" type="password" placeholder="Password"
                aria-describedby="basic-addon1">
            </div>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-sm-10 m-auto">
            <button @click="login()" :disabled="checkFields()" class="btn btn-primary w-100">Accedi</button>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-sm-10 m-auto">
            <p class="mt-3">Se non sei ancora registrato, <router-link to="/register">clicca qui</router-link></p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    checkFields() {
      return this.username === '' || this.password === '';
    },
    login() {
      // Dati di login inseriti dall'utente (es. username e password)
      const userData = {
        username: this.username,
        password: this.password,
      };

      console.log(userData);

      // Opzioni di configurazione della richiesta
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      event.preventDefault();

      // Effettua la chiamata API al percorso '/api/login'
      axios.post('http://127.0.0.1:3000/login', requestOptions)
        .then(response => {
          // console.log('response: ', response);
          const userLogged = {
            token: response.data.token,
            username: userData.username,
            password: userData.password
          }
          localStorage.setItem('username', userLogged.username);
          localStorage.setItem('password', userLogged.password);
          localStorage.setItem('Authorization', 'Bearer ' + userLogged.token);
          this.$router.push("/container/dashboard");
          console.log($router)
        })
        .catch(error => {
          // Si è verificato un errore durante la richiesta
          console.log(error);
        });
    }
  }
};
</script>

<style>
/*.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
}

.login-form {
  width: 30%;
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
  display: block;
  font-weight: bold;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}*/

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ddf4f4;

}

.login-form {
  width: 30%;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(202, 202, 202, 0.678);
  text-align: center;
}
</style>