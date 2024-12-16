<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <label for="username">Usuário</label>
      <input type="text" id="username" v-model="email" required>
      
      <label for="password">Senha</label>
      <input type="password" id="password" v-model="password" required>
      
      <button type="submit">Entrar</button>
    </form>
    <a href="#" class="forgot-password">Esqueceu a senha?</a>
  </div>
</template>

<script>
import { ref } from "vue";
import { auth } from "../services/firebaseConfig";
import { signInWithEmailAndPassword } from 'firebase/auth';

export default {
  setup() {
    const email = ref('');
    const password = ref('');

    const handleLogin = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        console.log(userCredential.user);
      } catch (error) {
        console.log(error.code);
        alert(error.message);
      }
    };

    return {
      email,
      password,
      handleLogin
    };
  }
};
</script>

  <style scoped>
  
  .login-container {
    background-color: #ffff; 
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

  .forgot-password { 
    margin-top: 10px; 
    display: block; 
    color: black; 
    text-decoration: none; 
    font-size: 14px; 
    } 
    .forgot-password:hover { 
        text-decoration: underline; 
    }
  </style>
  