<template>
  <div class="games-page">
    <div class="sidebar">
      <GenreFilter @genre-selected="handleGenreSelected" />
    </div>
    <div class="main-content">
      <h1 class="text-center mb-4">Buscar Todos os Jogos</h1>
      
      <div class="search-container d-flex justify-content-between align-items-center mb-4">
        <input 
          type="text" 
          class="form-control search-input" 
          placeholder="Pesquisar..." 
          v-model="searchTerm" 
          @input="getGames(searchTerm)">
      </div>

      <div class="card-grid">
        <cardComponent
          v-for="(game, index) in paginatedGames" 
          :key="index"
          :titulo="game.name"
          :descricao="game.summary"
          :image-src="game.coverUrl"
          :cliques="game.cliques"
          @click="detalharJogos(game.slug, game.id)"
        />
      </div>

      <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="previousPage">Anterior</a>
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
            <a class="page-link" href="#" @click.prevent="nextPage">Próximo</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import cardComponent from '@/components/cardComponent.vue';
import DAOService from '@/services/DAOService';
import { useRouter } from 'vue-router';
import GenreFilter from "@/components/genreFilter.vue";

const selectedGenre = ref(null);

const handleGenreSelected = (payload) => {
  selectedGenre.value = payload.genre;
  if (payload.genre) {
    games.value = payload.games;
    currentPage.value = 1;
  } else {
    getGames(); // volta a mostrar todos
  }
};
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
.games-page {
  display: flex;
  gap: 20px;
}

.sidebar {
  flex: 0 0 280px;
}

.main-content {
  flex: 1;
}

.search-input {
  flex: 1;
  background: linear-gradient(90deg, black 50%, gray 80%);
  color: black;
  border: none;
  padding: 10px;
  border-radius: 10px;
  outline: none; /* remove a borda azul padrão */
  transition: all 0.3s ease; /* transição suave para mudanças */
}

.search-input::placeholder {
  color: #555;
}

.search-input:focus {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.7); /* brilho ao redor */
  background: linear-gradient(90deg, gray, white, black); /* invertendo o degradê ao focar */
  color: black;
}


.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* igual homepage */
  grid-template-rows: repeat(2, auto); /* igual homepage */
  gap: 20px;
  max-width: 80%; /* igual homepage */
  margin: 0 auto; /* igual homepage */
}

.card-grid > * {
  max-width: 95%; 
  margin: 0 auto;
}

.pagination {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin-top: 20px;
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