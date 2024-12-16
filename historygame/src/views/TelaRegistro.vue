<template>
    <div class="register-container">
      <h1>Registrar</h1>
      <form @submit.prevent="handleRegister">
        <label for="username">Usuário</label>
        <input type="text" id="username" v-model="username" required>
        
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required>
        
        <label for="password">Senha</label>
        <input type="password" id="password" v-model="password" required>
        
        <label for="confirm-password">Confirmar Senha</label>
        <input type="password" id="confirm-password" v-model="confirmPassword" required>
        
        <button  type="submit">Registrar</button>
      </form>
    </div>
  </template>
  
  <script>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const email = ref('');
const password = ref('');
const handleRegister = () => {
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
        console.log("Registrado com sucesso");
    })
    .catch((error) => {
        console.log(error.code);
        alert(error.message);
    });

}

  </script>
  
  <style scoped>
  
  .register-container {
    background-color: #fff; /* Fundo cinza escuro */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 300px;
    text-align: center;
    margin: 0 auto;
    margin-top: 70px;
    margin-bottom: 120px;
  }
  
  h1 {
    margin-bottom: 20px;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 5px;
    text-align: left;
  }
  
  input {
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    color: #000;
  }
  
  button {
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #000;
    color: #fff;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #333;
  }
  
  </style>
  