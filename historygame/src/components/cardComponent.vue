<template>
  <div class="card mb-3 custom-card">
    <div class="card-body">
      <h5 class="card-title">{{ titulo }}</h5>
      <p class="card-text">{{ descricao }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cardComponent',
  props: {
    titulo: {
      type: String,
      required: true
    },
    descricao: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.custom-card {
  width: 325px;
  height: 459px;
}

.card-body {
  padding: 15px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
