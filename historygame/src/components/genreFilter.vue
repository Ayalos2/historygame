<template>
    <div class="genre-card">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold">Categorias</h3>
        <button @click="toggleCategories" class="focus:outline-none text-white">
          <span v-if="showCategories">▲</span>
          <span v-else>▼</span>
        </button>
      </div>
  
      <div v-show="showCategories" class="categories-list">
        <button
          v-for="(games, genre) in genres"
          :key="genre"
          @click="selectGenre(genre)"
          class="category-button"
  >
          {{ genre }} ({{ games.length }})
        </button>
      </div>
    </div>
</template>
  
<script>
  import DAOService from "@/services/DAOService";
  
  export default {
    name: "GenreFilter",
    data() {
      return {
        genres: {},
        selectedGenre: null,
        gamesBySelectedGenre: [],
        showCategories: true
      };
    },
    mounted() {
      this.loadGenres();
    },
    methods: {
      async loadGenres() {
        const dao = new DAOService();
        this.genres = await dao.getGamesByGenre();
      },
      toggleCategories() {
        this.showCategories = !this.showCategories;
      },
      selectGenre(genre) {
        this.selectedGenre = genre;
        this.gamesBySelectedGenre = this.genres[genre];
        this.$emit('genre-selected', {
            genre: genre,
            games: this.genres[genre]
        });
       },
       clearSelection() {
        this.selectedGenre = null;
        this.gamesBySelectedGenre = [];
        this.$emit('genre-selected', {
            genre: null,
            games: []
        });
       },
      goToGame(slug, id) {
        this.$router.push({ name: "DetalheJogos", params: { slug, id } });
      }
    }
  };
</script>
  
<style scoped>
  .genre-card {
    background-color: #000;
    color: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
    min-width: 240px;
    margin-top: 20px;
  }
  
  .category-button {
    background-color: #1f1f1f;
    color: #fff;
    padding: 10px 16px;
    border: 1px solid #444;
    border-radius: 8px;
    cursor: pointer;
    text-align: left;
    transition: background-color 0.2s ease, transform 0.1s ease;
  }
  
  .category-button:hover {
    background-color: #333;
    transform: translateY(-1px);
  }
  
  .game-button {
    background-color: #2a2a2a;
    color: #fff;
    padding: 10px 16px;
    border: 1px solid #555;
    border-radius: 8px;
    cursor: pointer;
    text-align: left;
    transition: background-color 0.2s ease, transform 0.1s ease;
  }
  
  .game-button:hover {
    background-color: #444;
    transform: translateY(-1px);
  }

  .categories-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.games-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
}

.games-list li {
  list-style: none;
}
</style>