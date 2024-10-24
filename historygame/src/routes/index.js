import {createRouter, createWebHashHistory} from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import FavoritosPage from '@/views/FavoritosPage.vue';
import JogosPage from '@/views/JogosPage.vue';
import SobrePage from '@/views/SobrePage.vue'


const routes = [
  { path: '/', component: HomePage },
  { path: '/jogos', component: JogosPage},
  { path: '/favoritos', component: FavoritosPage },
  { path: '/sobre', component: SobrePage},
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
