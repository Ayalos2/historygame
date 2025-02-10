<template>
    <div class="review-container">
        <div class="rating">
            <span v-for="star in 5" :key="star" class="star" :style="{ color: star <= stars ? '#ffc107' : '#ddd' }">★</span>
        </div>

        <h2 class="review-title">{{ title }}</h2>
        <p class="review-text">{{ truncatedText }}</p>

        <div class="author-info">
            <img :src="userPhotoURL || require('@/assets/default_avatar.jpg')" alt="Author Image" class="author-image">            
            <span class="author-name">{{ userName }}</span>
            <span class="author-date">{{ data }}</span>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, computed } from 'vue';

    const props = defineProps({
        stars: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true,
            default: ''
        },
        userPhotoURL: {
            type: String,
            required: true,
            default: '@/assets/default_avatar.jpg'
        },
        userName: {
            type: String,
            required: true
        },
        timestamp: {
            type: String,
            required: true
        }
    });

    const maxLength = 100; // Limite de caracteres

    const truncatedText = computed(() => {
        return props.comment && props.comment.length > maxLength
            ? props.comment.substring(0, maxLength) + '...'
            : props.comment;
    });

    const data = computed(() =>  {
        return props.timestamp.toDate().toLocaleString('pt-BR');
    });
</script>

<style>
    .review-container {
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
    }

    .rating {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    }

    .star {
    font-size: 24px;
    }

    .review-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 5px;
    }

    .review-text {
    font-size: 1rem;
    line-height: 1.5;
    }

    .author-info {
    display: flex;
    align-items: center;
    margin-top: 15px;
    }

    .author-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    }

    .author-name {
    font-weight: bold;
    }

    .author-date {
    color: #777;
    margin-left: 10px;
    }
</style>
  