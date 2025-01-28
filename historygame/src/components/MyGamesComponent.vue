// src/components/MyGames.vue
<template>
  <div class="my-games">
    <input type="text" placeholder="Pesquisar jogos..." />
    <div class="tabs">
      <button>Favoritos</button>
      <button>Jogados</button>
      <button>Lista de Desejo</button>
    </div>
    <div class="games-grid">
      <div class="game" v-for="game in games" :key="game.id">
        <img :src="game.image" :alt="game.title" />
        <h3>{{ game.title }}</h3>
      </div>
    </div>
    <div class="pagination">
      <button>&laquo;</button>
      <button>&raquo;</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyGames',
  data() {
    return {
      games: [
        { id: 1, image: 'caminho/para/dragonball.jpg', title: 'Dragon Ball Budokai Tenkaishi 3' },
        { id: 2, image: 'caminho/para/godofwar.jpg', title: 'God Of War' },
        { id: 3, image: 'caminho/para/godofwar2.jpg', title: 'God Of War 2' },
        { id: 4, image: 'caminho/para/spiderman.jpg', title: 'Spider-Man 2018' },
        { id: 5, image: 'caminho/para/supermario.jpg', title: 'Super Mario World' },
        { id: 6, image: 'caminho/para/sonic.jpg', title: 'Sonic Adventure' },
      ],
    };
  },
};
</script>

<style scoped>
.my-games {
  margin-top: 20px;
}

.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
}

.game img {
  width: 100%;
  height: auto;
}

.pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
