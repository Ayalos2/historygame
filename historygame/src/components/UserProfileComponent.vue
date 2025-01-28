// src/components/UserProfile.vue
<template>
  <div class="user-profile">
    <img src="caminho/para/imagem-de-perfil.jpg" alt="Perfil" />
    <h2>Nome do Usuário</h2>
    <p>Descrição ou Bio</p>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
};
</script>

<style scoped>
.user-profile {
  text-align: center;
  margin-bottom: 20px;
}

.user-profile img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}
</style>
