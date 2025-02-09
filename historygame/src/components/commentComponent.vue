<template>
    <div class="modal">
      <div class="modal-content">
        <span class="close" @click="$emit('close')">&times;</span>
        <div class="review-form">
          <div class="review-form__header">
            <h3>Avalie</h3>
            <div class="review-form__stars">
              <span
                v-for="star in 5"
                :key="star"
                class="review-form__star"
                :class="{ active: star <= selectedStars }"
                @click="selectStar(star)"
              >
                <i class="fas fa-star" />
              </span>
            </div>
          </div>
          <div class="review-form__body">
            <div class="review-form__input-group">
              <label for="title">Título</label>
              <input
                type="text"
                id="title"
                v-model="reviewTitle"
                placeholder="Digite o título da sua avaliação"
              />
            </div>
            <div class="review-form__input-group">
              <label for="comment">Comentário</label>
              <textarea
                id="comment"
                v-model="reviewComment"
                placeholder="Digite o seu comentário"
              />
            </div>
          </div>
          <button class="review-form__button" @click="submitReview">Enviar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import { ref } from 'vue';
import { getAuth } from "firebase/auth";
import DAOService from '../services/DAOService.js'; // Ajuste o caminho conforme necessário

export default {
    props: {
        gameId: {
            type:String,
            required: true
        }
    },
  setup(props, { emit }) {
    const selectedStars = ref(0);
    const reviewTitle = ref("");
    const reviewComment = ref("");

    const daoService = new DAOService();

    const selectStar = (star) => {
      selectedStars.value = star;
      console.log(selectedStars.value);
    };

    const submitReview = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if(!user) {
            alert("Usuário não está logado");
            return;
        }
        console.log(props.gameId);
      const review = {
        userID: user.uid,
        userPhotoUrl: user.photoURL,
        userName: user.displayName, 
        gameID: props.gameId,
        stars: selectedStars.value,
        title: reviewTitle.value,
        comment: reviewComment.value
      };
      await daoService.saveReview(review);
      console.log("Avaliação enviada:", review);
      alert("Avaliação enviada com sucesso!");
      selectedStars.value = 0;
      reviewTitle.value = "";
      reviewComment.value = "";
      emit('close');
    };

    return {
      selectedStars,
      reviewTitle,
      reviewComment,
      selectStar,
      submitReview,
    };
  },
};
</script>
  
  <style scoped>
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1000;
  }
  
  .modal-content {
    background-color: #fefefe;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 600px;
    border-radius: 10px;
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  .review-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    margin: 0 auto;
  }
  
  .review-form__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .review-form__stars {
    display: flex;
    gap: 0.5rem;
  }
  
  .review-form__star {
    color: #ccc;
    cursor: pointer;
    font-size: 1.5rem;
    transition: color 0.2s ease;
  }
  
  .review-form__star.active {
    color: #ffc107;
  }
  
  .review-form__body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .review-form__input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .review-form__input-group input,
  .review-form__input-group textarea {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .review-form__input-group textarea {
    resize: vertical;
    min-height: 100px;
  }
  
  .review-form__button {
    padding: 0.75rem;
    background-color: #000;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .review-form__button:hover {
    background-color: #0056b3;
  }
  </style>
  