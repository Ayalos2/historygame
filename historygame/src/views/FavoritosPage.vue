<template>
  <div>
  <div class="profile-container d-flex justify-content-center align-items-center mb-4">
    <div class="profile-pic-box">
      <img :src="user?.photoURL || defaultAvatar" alt="Foto de Perfil" class="profile-pic" />
    </div>
    <div class="profile-info-box">
      <div class="profile-info">
        <h2 type="text" class="edit-input">{{ username }}</h2>
        <p class="profile-description">Counter-Striker Player e Casual Gamer.</p>
      </div>
    </div>
  </div>
  <div>
    <h1 class="text-center">Meus Jogos</h1>
    <div class="search-container d-flex justify-content-between align-items-center mb-4">
      <input 
        type="text" 
        class="form-control search-input" 
        placeholder="Pesquisar..." 
        v-model="searchTerm" 
        >
    </div>
    <div class="btn-group d-flex justify-content-center mb-4" role="group">
      <button type="button" @click="getUserGames('favoritados',searchTerm)" class="btn btn-dark">Favoritos</button>
      <button type="button" @click="getUserGames('jogados',searchTerm)" class="btn btn-dark">Jogados</button>
      <button type="button" @click="getUserGames('desejados',searchTerm)" class="btn btn-dark">Lista de Desejos</button>
    </div>
    <div class="card-grid">
      <cardComponent
        v-for="(game, index) in paginatedGames" 
        :key="index"
        :titulo="game.name"
        :descricao="game.summary"
        :image-src="game.coverUrl"
        @click="detalharJogos(game.slug,game.id)"
        class="card-component"
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
</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import cardComponent from '@/components/cardComponent.vue';
import DAOService from '@/services/DAOService';
import { useRouter } from 'vue-router';
import { getAuth } from "firebase/auth";



const daoService = new DAOService();
const games = ref([]);
const currentPage = ref(1);
const pageSize = ref(6);
const searchTerm = ref('');
const router = useRouter();

const username = ref("");
const user = ref(null);
const defaultAvatar = require('@/assets/default_avatar.jpg');

const auth = getAuth();
const currentUser = auth.currentUser;

if (currentUser) {
  const profile = currentUser.providerData[0] || {};
  username.value = profile.displayName || "Usuário Anônimo";
  user.value = profile;
} else {
  console.warn("Usuário não autenticado");
  router.push('/login');
}



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

const getUserGames = async (field,name='') => {
  try {
    games.value = await daoService.getuserGames(field,currentUser.uid,name);
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
  getUserGames('favoritados');
});

</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
}

.container {
  padding: 20px;
}

.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.profile-pic-box {
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  margin-right: 20px;
}

.profile-pic {
  width: 150px; /* Ajuste o tamanho conforme necessário */
  height: 150px; /* Ajuste o tamanho conforme necessário */
}

.profile-info-box {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 30px;
  background-color: #f9f9f9;
}

.profile-info {
  display: flex;
  flex-direction: column;
}

.profile-name {
  font-size: 2em; /* Ajuste o tamanho conforme necessário */
  margin: 0;
}

.profile-description {
  margin: 0;
  color: gray;
  font-size: 1.2em; /* Ajuste o tamanho conforme necessário */
}

.search-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  flex: 0.5;
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
  justify-content: center;
  margin: 0 50px; /* Aumenta as margens laterais */
}

.card-component {
  width: 300px; /* Ajuste a largura conforme necessário */
  margin: 0 auto;
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
