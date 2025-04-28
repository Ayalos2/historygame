<template>
  <div class="card mb-3 custom-card" @click="incrementClicks">
    <img :src="fullImageUrl" class="card-img-top" alt="Imagem do Jogo">
    <div class="card-body">
      <h5 class="card-title">{{ titulo }}</h5>
      <p class="card-text">{{ truncatedDescricao }}</p>
      <p><strong>Acessos: {{ cliques }}</strong></p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  titulo: { type: String, required: true },
  descricao: { type: String, required: true, default: '' },
  imageSrc: { type: String, required: true, default: '' },
  cliques: { type: Number, required: false, default: 0 } // <-- Aqui!
});

const maxLength = 100; // Limite de caracteres

const truncatedDescricao = computed(() => {
  return props.descricao && props.descricao.length > maxLength
    ? props.descricao.substring(0, maxLength) + '...'
    : props.descricao;
});

const fullImageUrl = computed(() => {  
  let url = props.imageSrc && props.imageSrc.trim() !== '' 
    ? 'https:' + props.imageSrc 
    : require('../assets/jogosSemImagem.jpg');
  return url.replace('t_thumb', 't_cover_big');
});
</script>


<style scoped>
.custom-card {
  width: 325px;
  height: 459px;
  cursor: pointer; /* Indica que o card é interativo */
}

.card-img-top {
  width: 200px;
  height: auto;
  object-fit: cover;
  display: block;
  margin: 0 auto;
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