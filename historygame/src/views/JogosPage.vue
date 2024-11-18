<template>
  <div>
    <h1 class="text-center">Buscar Todos os Jogos</h1>
    <div class="search-container d-flex justify-content-between align-items-center mb-4">
      <input type="text" class="form-control search-input" placeholder="Pesquisar...">
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-dark">PC</button>
        <button type="button" class="btn btn-dark">Console</button>
        <button type="button" class="btn btn-dark">Web</button>
        <button type="button" class="btn btn-dark">Mobile</button>
      </div>
    </div>
    <div class="d-flex justify-content-around flex-wrap">
      <cardComponent
        v-for="(game, index) in paginatedGames"
        :key="index"
        :titulo="game.name"
        :descricao="game.summary"
      />
    </div>
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="previousPage">Previous</a>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import cardComponent from '@/components/cardComponent.vue';

</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
}

.container {
  padding: 20px;
}

.search-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  margin-right: 10px;
}

.btn-group .btn {
  margin-right: 5px;
  background: black;
  color: white;
  background-color: black;
  border: 1px solid white;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 10px;
}

.btn-group .btn:hover {
  opacity: 0.7;
}
</style>
