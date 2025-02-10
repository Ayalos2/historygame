<template>
    <div>
      <h1 class="text-center">Mais Favoritados</h1>
      <div class="card-grid">
        <cardComponent
          v-for="(game, index) in paginatedGames" 
          :key="index"
          :titulo="game.name"
          :descricao="game.summary"
          :image-src="game.coverUrl"
          @click="detalharJogos(game.slug, game.id)"
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
      <!-- Adicionando a seção de comentários -->
      <section class="comments-section">
        <h2>Últimos Comentários</h2>
        <cardComment 
        v-for="(review, index) in reviews" 
        :key="index"
        :stars="review.stars"
        :title="review.title"
        :comment="review.comment"
        :userPhotoURL="review.userPhotoURL"
        :userName="review.userName"
        :timestamp="review.timestamp"
        @click="detalharJogos(review.slug,review.gameID)"
      />
      </section>
    </div>
  </template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import cardComponent from '@/components/cardComponent.vue';
import cardComment from '@/components/cardComment.vue';
import DAOService from '@/services/DAOService';
import { useRouter } from 'vue-router';


const daoService = new DAOService();
const games = ref([]);
const currentPage = ref(1);
const pageSize = ref(6);
const router = useRouter();
const ordenacao = 'favoritados';
const reviews = ref([]);

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

const getGames = async () => {
  try {
    games.value = await daoService.getAll(ordenacao);
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

const detalharJogos = (slug, id) => {
  router.push({ name: "DetalheJogos", params: { slug, id } });
};

const loadLastReview = async () => {
  console.log('Carregando primeira página de reviews...');
  try {
    reviews.value = await daoService.loadLastestReviews();
  } catch (error) {
    console.error("Erro ao carregar reviews:", error);
  }
};

onMounted(() => {
  getGames();
  loadLastReview();
});
</script>

  
<style scoped>
body {
  font-family: 'Arial', sans-serif;
}

.container {
  padding: 20px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 colunas */
  grid-template-rows: repeat(2, auto); /* 2 linhas */
  gap: 20px;
  max-width: 80%; /* Reduzir a largura máxima da grade */
  margin: 0 auto; /* Centralizar a grade na página */
}

.card-grid > * {
  max-width: 95%; /* Ajustar a largura dos cards */
  margin: 0 auto; /* Centralizar os cards dentro das colunas */
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
