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
  }
});

const maxLength = 100; // Limite de caracteres

const truncatedDescricao = computed(() => {
  return props.descricao && props.descricao.length > maxLength
    ? props.descricao.substring(0, maxLength) + '...'
    : props.descricao;
});

const fullImageUrl = computed(() => {
  return props.imageSrc.startsWith('//') ? 'https:' + props.imageSrc : props.imageSrc;
});
</script>

<style scoped>
.custom-card {
  width: 325px;
  height: 459px;
}

.card-img-top {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-body {
  padding: 15px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
