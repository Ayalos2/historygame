<template>
    <div class="profile-container">
        <div class="profile-header">
            <!-- Verifique se a foto está disponível, caso contrário, use um avatar padrão -->
            <img :src="user?.photoURL || defaultAvatar" alt="User Profile Picture" class="profile-picture" />
            <input type="text" v-model="username" @input="checkChanges" class="edit-input username" />
            <textarea v-model="bio" @input="checkChanges" class="edit-input bio"></textarea>
        </div>
        <div class="profile-details">
            <h2>Detalhes do Usuário</h2>
            <p>
                <strong>Nome:</strong>
                <input type="text" v-model="username" @input="checkChanges" class="edit-input" />
            </p>
            <p>
                <strong>Email:</strong>
                <input type="email" v-model="email" @input="checkChanges" class="edit-input" />
            </p>
            <p>
                <strong>Data de Registro:</strong>
                <input
                    disabled
                    type="text"
                    v-model="registrationDate"
                    class="edit-input"
                />
            </p>
        </div>
        <button @click="saveProfile" :disabled="!isChanged" class="save-button">Salvar</button>
        <p v-if="saved" class="confirmation-message">Perfil salvo com sucesso!</p>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getAuth } from "firebase/auth";

export default {
  setup() {
    const username = ref("");
    const email = ref("");
    const bio = ref("");
    const name = ref("");
    const registrationDate = ref("");
    const user = ref(null);
    const saved = ref(false);
    const isChanged = ref(false);
    const defaultAvatar = require('@/assets/default_avatar.jpg');

    // Função para carregar os dados do usuário
    const loadUserProfile = () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        const profile = currentUser.providerData[0] || {};
        username.value = profile.displayName || "Usuário Anônimo";
        email.value = profile.email || "E-mail não informado";
        user.value = profile;
        registrationDate.value= currentUser.metadata.creationTime;
      } else {
        console.warn("Usuário não autenticado");
      }
    };

    // Carrega os dados ao montar o componente
    onMounted(() => {
      loadUserProfile();
    });

    const checkChanges = () => {
      // Verifica alterações (adicione lógica aqui se necessário)
      isChanged.value = true;
    };

    const saveProfile = () => {
      // Lógica de salvar (simulação)
      saved.value = true;
      isChanged.value = false;

      setTimeout(() => {
        saved.value = false;
      }, 2000);
    };

    return {
      username,
      email,
      bio,
      name,
      registrationDate,
      user,
      saved,
      isChanged,
      checkChanges,
      saveProfile,
      defaultAvatar
    };
  },
};
</script>

<style scoped>
    .profile-container {
    font-family: Arial, sans-serif;
    color: #000;
    background-color: #fff;
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
    border: 1px solid #000;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .profile-header {
    text-align: center;
    }

    .profile-picture {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 2px solid #000;
    }

    .edit-input {
    width: calc(100% - 40px);
    padding: 10px;
    margin: 10px 20px;
    border: 1px solid #000;
    border-radius: 5px;
    background-color: #fff;
    font-size: 16px;
    }

    .username {
    font-size: 24px;
    text-align: center;
    }

    .bio {
    font-size: 14px;
    color: #555;
    text-align: center;
    }

    .profile-details {
    margin-top: 20px;
    }

    .profile-details h2 {
    font-size: 20px;
    margin-bottom: 10px;
    border-bottom: 1px solid #000;
    }

    .profile-details p {
    font-size: 16px;
    margin: 5px 0;
    }

    .save-button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #000;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    }

    .save-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    }

    .confirmation-message {
    text-align: center;
    font-size: 14px;
    color: green;
    }
</style>
