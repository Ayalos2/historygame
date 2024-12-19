<template>
  <div>
    <!-- Seção Principal -->
    <div class="container">
      <div class="image-section">
        <img :src="fullImageUrl" :alt="game.name" />
      </div>

      <!-- Seção de Detalhes -->
      <div class="text-section">
        <h1>{{ game.name }}</h1>
        <p><b>Descrição</b></p>
        <p>{{ game.summary }}</p>

        <!-- Box de Avaliação -->
        <div class="rating-box">
          <button class="review-button">Avalie o jogo</button>
        </div>

        <!-- 5 Estrelas de Avaliação e Ícones ao lado -->
        <div class="rating-stars">
          <span class="star">⭐</span>
          <span class="star">⭐</span>
          <span class="star">⭐</span>
          <span class="star">⭐</span>
          <span class="star">⭐</span>

          <!-- Ícones de Avaliação ao lado das Estrelas -->
          <div class="stats">
            <div class="stat">
              <span class="icon">❤️</span>
              <p>{{ game.likes }}</p>
            </div>
            <div class="stat">
              <span class="icon">🎮</span>
              <p>{{ game.plays }}</p>
            </div>
            <div class="stat">
              <span class="icon">⏳</span>
              <p>{{ game.waits }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Seção Sobre -->
    <div class="about-section">
      <div class="header">
        <h1>SOBRE</h1>
      </div>
      <table class="info-table">
        <thead>
          <tr>
            <th>Desenvolvedora</th>
            <th>Editora</th>
            <th>Gêneros</th>
            <th>Modo de jogo</th>
            <th>Perspectiva do jogador</th>
            <th>Temas</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ game.developer }}</td>
            <td>{{ game.publisher }}</td>
            <td>{{ game.genres }}</td>
            <td>{{ game.gameModes }}</td>
            <td>{{ game.perspective }}</td>
            <td>{{ game.themes }}</td>
          </tr>
        </tbody>
      </table>
      <div class="history-section">
        <h2>História</h2>
        <p>{{ game.story }}</p>
      </div>
    </div>

    <!-- Seção de Avaliações de Usuários -->
    <div class="about-section">
      <div class="header">
        <h1>Avaliações de Usuários</h1>
      </div>
      <div class="reviews-container">
        <div class="review-card" v-for="review in game.reviews" :key="review.id">
          <img :src="review.profileImg" :alt="review.username" class="profile-img" />
          <div class="review-content">
            <h3>{{ review.username }}</h3>
            <div class="stars">
              <span class="star" v-for="n in review.stars" :key="n">⭐</span>
            </div>
            <p>{{ review.comment }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import DAOService from '@/services/DAOService'; // Ajuste o caminho conforme necessário

const daoService = new DAOService();

export default {
  name: 'DetalhesPage',
  setup() {
    const game = ref({});
    const route = useRoute();
    const gameId = computed(() => route.params.id);

    const fullImageUrl = computed(() => {
      let url = game.value.cover ? (game.value.cover.startsWith('//') ? 'https:' + game.value.cover : game.value.cover) : '../assets/semimagem.png';
      console.log(url);
      return url.replace('t_thumb', 't_cover_big');
    });

    const getGameDetails = async (id) => {
      try {
        game.value = await daoService.getById(id);
      } catch (error) {
        console.error('Erro ao buscar detalhes do jogo:', error);
      }
    };

    onMounted(() => {
      getGameDetails(gameId.value);
    });

    return { game, fullImageUrl };
  }
};
</script>
  
  <style scoped>
  .container {
    display: flex;
    max-width: 1200px;
    margin: 20px auto;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .image-section img {
    width: 300px;
    height: auto;
    object-fit: cover;
  }
  
  .text-section {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .text-section h1 {
    margin: 0 0 10px;
    color: #555;
  }
  
  .text-section p {
    margin: 5px 0;
    color: #555;
  }
  
  /* Box de Avaliação */
  .rating-box {
    margin-top: 20px;
  }
  
  .review-button {
    width: 200px;
    padding: 12px;
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    text-align: center;
  }
  
  .review-button:hover {
    background-color: #333;
  }
  
  /* Estrelas de Avaliação */
  .rating-stars {
    margin-top: 20px;
    display: flex;
    gap: 5px;
  }
  
  .star {
    font-size: 24px;
    color: #000;
  }
  
  /* Box de Estatísticas ao lado das Estrelas */
  .stats {
    display: flex;
    gap: 20px;
    margin-left: 20px;
  }
  
  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .stat .icon {
    font-size: 30px;
    color: #000;
  }
  
  .stat p {
    margin: 0;
    font-size: 14px;
    color: #555;
  }
  
  /* Seção Sobre */
  .about-section {
    width: 90%;
    max-width: 1200px;
    margin: 20px auto;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .header {
    background-color: #000;
    color: #fff;
    text-align: center;
    padding: 10px 0;
  }
  
  .header h1 {
    margin: 0;
    font-size: 24px;
  }
  
  .info-table {
    width: 100%;
    border-collapse: unset;
    text-align: left;
    margin: 20px 0;
  }
  
  .info-table th,
  .info-table td {
    border: none;
    padding: 10px;
  }
  
  .info-table th {
    background-color: #fff;
    text-transform: uppercase;
    font-size: 14px;
  }
  
  .info-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .history-section {
    padding: 20px;
  }
  
  .history-section h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .history-section p {
    font-size: 16px;
    color: #555;
  }
  
  /* Estilo dos Quadrados de Avaliação de Usuários */
  .reviews-container {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .review-card {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 250px;
    text-align: center;
  }
  
  .profile-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  
  .review-content {
    color: #555;
  }
  
  .review-content h3 {
    margin: 10px 0;
    font-size: 18px;
  }
  
  .review-content .stars {
    display: flex;
    gap: 5px;
    justify-content: center;
  }
  
  .review-content p {
    margin-top: 10px;
    font-size: 14px;
  }
  </style>
  