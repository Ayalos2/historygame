<template>
  <div>
    <h1 class="text-center">Buscar Todos os Jogos</h1>
    <div class="search-container d-flex justify-content-between align-items-center mb-4">
      <input 
        type="text" 
        class="form-control search-input" 
        placeholder="Pesquisar..." 
        v-model="searchTerm" 
        @input="getGames(searchTerm)">
      <div class="btn-group" role="group">
        <button v-show="false" type="button" class="btn btn-dark">PC</button>
        <button v-show="false" type="button" class="btn btn-dark">Console</button>
        <button v-show="false" type="button" class="btn btn-dark">Web</button>
        <button v-show="false" type="button" class="btn btn-dark">Mobile</button>
      </div>
    </div>
    <div class="card-grid">
      <cardComponent
        v-for="(game, index) in paginatedGames" 
        :key="index"
        :titulo="game.name"
        :descricao="game.summary"
        :image-src="game.coverUrl"
        @click="detalharJogos(game.slug,game.id)"
      />
    </div>
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="previousPage">Previous</a>
        </li>
        <li class="page-item" v-if="currentPage > 2">
          <a class="page-link" href="#" @click.prevent="changePage(1)">1</a>
        </li>
        <li class="page-item" v-if="currentPage > 3">
          <span class="page-link">...</span>
        </li>
        <li class="page-item" v-for="page in pagesToShow" :key="page" :class="{ active: currentPage === page }">
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" v-if="currentPage < totalPages - 2">
          <span class="page-link">...</span>
        </li>
        <li class="page-item" v-if="currentPage < totalPages - 1">
          <a class="page-link" href="#" @click.prevent="changePage(totalPages)">{{ totalPages }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import cardComponent from '@/components/cardComponent.vue';
import DAOService from '@/services/DAOService';
import { useRouter } from 'vue-router';


const daoService = new DAOService();
const games = ref([]);
const currentPage = ref(1);
const pageSize = ref(9);
const searchTerm = ref('');
const router = useRouter();
const ordenacao = 'id';


const totalPages = computed(() => {
  return Math.ceil(games.value.length / pageSize.value);
});

const paginatedGames = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return games.value.slice(start, end);
});

const pagesToShow = computed(() => {
  const startPage = Math.max(currentPage.value - 1, 1);
  const endPage = Math.min(currentPage.value + 1, totalPages.value);
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});

const searchGamesByName = async (name) => { 
  try { 
    const gamesList = await daoService.getByName(name); 
    return gamesList; 
  } catch (error) { 
    console.error('Erro ao buscar jogos:', error); 
    return []; 
  } 
};

const getGames = async (name = '') => {
  try {
    games.value = name ? await searchGamesByName(name) : await daoService.getAll(ordenacao);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const detalharJogos = (slug,id) => {
  router.push({name:"DetalheJogos", params: {slug,id}})
}

onMounted(() => {
  getGames();
});
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

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
}

.page-item {
  margin: 0 5px;
}

.page-link {
  color: black;
  text-decoration: none;
}

.page-link:hover {
  text-decoration: underline;
}

.page-item.active .page-link {
  font-weight: bold;
}
</style>
