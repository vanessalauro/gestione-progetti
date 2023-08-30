<template>
    <div class="register-container">
        <div class="register-form">
            <h2>Registrazione</h2>
            <form @submit.prevent="onSubmit">
                <div class="row mb-2">
                    <div class="col-sm-10 m-auto">
                        <input type="text" class="form-control" id="nome" v-model="nome" placeholder="Nome" required />
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col-sm-10 m-auto">
                        <input type="text" class="form-control" id="cognome" v-model="cognome" placeholder="Cognome" required />
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col-sm-10 m-auto">
                        <input type="text" class="form-control" id="username" v-model="username" placeholder="Username" required />
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col-sm-10 m-auto">
                        <input type="email" class="form-control" id="email" v-model="email" placeholder="Email" required />
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col-sm-10 m-auto">
                        <input type="password" class="form-control" id="password" v-model="password" placeholder="Password" required />
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col-sm-10 m-auto">
                        <input type="password" class="form-control" id="confirmPassword" placeholder="Conferma password" v-model="confirmPassword"
                            required />
                    </div>
                </div>
                <button type="submit" :disabled="checkFields()" class="btn btn-primary w-100">Registrati</button>
            </form>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            nome: "",
            cognome: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        };
    },
    methods: {
        checkFields() {
            return this.nome === "" || this.cognome === "" || this.username === "" || this.email === "" || this.password === "" || this.confirmPassword === "";
        },
        onSubmit() {
            // Validate the form
            /* if (this.nome === "" || this.cognome === "" || this.username === "" || this.email === "" || this.password === "" || this.confirmPassword === "") {
                alert("Please fill out all required fields.");
                return;
            }*/

            // Check if passwords match
            if (this.password !== this.confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            // Dati di login inseriti dall'utente (es. username e password)
            const userData = {
                nome: this.nome,
                cognome: this.cognome,
                username: this.username,
                email: this.email,
                password: this.password
            };

            console.log("registrer: ", userData);

            // Opzioni di configurazione della richiesta
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            };

            // Register the user
            axios.post("http://127.0.0.1:3000/register", requestOptions)
                .then((response) => {
                    // Redirect the user to the login page
                    this.$router.push("/login");
                })
                .catch((error) => {
                    console.log(error);
                    alert("There was an error registering your account. Please try again later.");
                });
        },
    },
};
</script>
  
<style>
.register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #ddf4f4;
}

.register-form {
    width: 40%;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.register-title {
    color: #3498db;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    /*display: block;*/
    font-weight: bold;
    margin-bottom: 5px;
}

.form-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>