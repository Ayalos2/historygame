import {createRouter, createWebHashHistory} from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import FavoritosPage from '@/views/FavoritosPage.vue';
import JogosPage from '@/views/JogosPage.vue';
import SobrePage from '@/views/SobrePage.vue';
import TelaLogin from '@/views/TelaLogin.vue';
import TelaRegistro from '@/views/TelaRegistro.vue';
import ForgotPassword from '@/views/ForgotPassword.vue';
import DetalhesPage from '@/views/DetalhesPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/jogos', component: JogosPage},
  { path: '/favoritos', component: FavoritosPage },
  { path: '/sobre', component: SobrePage},
  { path: '/login', component: TelaLogin},
  { path: '/registro', component: TelaRegistro},
  {path: '/recuperarsenha', component: ForgotPassword},
  {path:'/jogo/:id', name:"DetalheJogos" ,component: DetalhesPage}


];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
