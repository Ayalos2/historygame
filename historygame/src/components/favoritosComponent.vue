// src/components/MainContent.vue
<template>
  <div class="main-content">
    <UserProfile />
    <MyGames />
  </div>
</template>

<script>
import UserProfile from './UserProfile.vue';
import MyGames from './MyGames.vue';

export default {
  components: {
    UserProfile,
    MyGames,
  },
};
</script>

<style scoped>
.main-content {
  padding: 20px;
}
</style>
