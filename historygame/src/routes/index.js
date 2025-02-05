import {createRouter, createWebHashHistory} from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import FavoritosPage from '@/views/FavoritosPage.vue';
import JogosPage from '@/views/JogosView.vue';
import SobrePage from '@/views/SobrePage.vue';
import TelaLogin from '@/views/TelaLogin.vue';
import TelaRegistro from '@/views/RegistroView.vue';
import ForgotPassword from '@/views/ForgotPassword.vue';
import DetalhesPage from '@/views/DetalhesPage.vue';
import ProfileView from '@/views/ProfileView.vue';
import Comment from '../components/commentComponent.vue'


const routes = [
  { path: '/', component: HomePage },
  { path: '/jogos', component: JogosPage},
  { path: '/favoritos', component: FavoritosPage },
  { path: '/sobre', component: SobrePage},
  { path: '/login', component: TelaLogin},
  { path: '/registro', component: TelaRegistro},
  {path: '/recuperarsenha', component: ForgotPassword},
  {path:'/jogo/:slug/:id', name:"DetalheJogos" ,component: DetalhesPage},
  {path: '/perfil', component: ProfileView },
  {path: '/comentario', component: Comment}


];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
