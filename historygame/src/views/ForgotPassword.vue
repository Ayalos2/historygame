<template>
    <div class="forgot-password-container">
      <h1>Redefinir Senha</h1>
      <form @submit.prevent="handleForgotPassword">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required>
        <button type="submit" class="submit-button">Enviar Email de Redefinição</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { auth } from '@/services/firebaseConfig';
  import { sendPasswordResetEmail } from 'firebase/auth';
  
  export default {
    name: 'ForgotPassword',
    setup() {
      const email = ref('');
  
      const handleForgotPassword = async () => {
        try {
          await sendPasswordResetEmail(auth, email.value);
          console.log("Password reset email sent successfully.");
          alert("Email de redefinição de senha enviado com sucesso.");
        } catch (error) {
          console.log("SendPasswordResetEmail encountered an error: ", error);
          alert("Erro ao enviar o email de redefinição de senha: " + error.message);
        }
      };
  
      return {
        email,
        handleForgotPassword
      };
    }
  };
  </script>
  
  <style>
  /* Estilos baseados na tela de login */
  
  .forgot-password-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f4f4f4;
  }
  
  h1 {
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
  }
  
  label {
    color: #555;
    font-size: 14px;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .submit-button {
    width: 100%;
    padding: 10px;
    background-color: #4285F4; /* Azul Google */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .submit-button:hover {
    background-color: #357ae8; /* Azul mais escuro no hover */
  }
  </style>
  