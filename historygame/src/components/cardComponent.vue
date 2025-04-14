<template>
  <div class="card mb-3 custom-card">
    <img :src="fullImageUrl" class="card-img-top" alt="Imagem do Jogo">
    <div class="card-body">
      <h5 class="card-title">{{ titulo }}</h5>
      <p class="card-text">{{ truncatedDescricao }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  titulo: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true,
    default: ''
  },
  imageSrc: {
    type: String,
    required: true,
    default: ''
  },
  cliques:{
    type: String,
    required: true,
  }
});

const maxLength = 100; // Limite de caracteres

const truncatedDescricao = computed(() => {
  return props.descricao && props.descricao.length > maxLength
    ? props.descricao.substring(0, maxLength) + '...'
    : props.descricao;
});

const fullImageUrl = computed(() => {  
  let url = props.imageSrc && props.imageSrc.trim() !== '' ? 'https:' + props.imageSrc : require('../assets/jogosSemImagem.jpg');
  return url.replace('t_thumb', 't_cover_big');
});

</script>

<style scoped>
.custom-card {
  width: 325px;
  height: 459px;
}

.card-img-top {
  width: 200px; /* Largura fixa */
  height: auto; /* Altura automática para manter a proporção */
  object-fit: cover; /* Ajuste para cobrir todo o container sem distorcer */
  display: block; /* Exibe a imagem como bloco para permitir a centralização */
  margin: 0 auto; /* Centraliza horizontalmente */
  margin-top: 10px;
}

.card-body {
  padding: 15px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
