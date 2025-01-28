import {createApp} from 'vue';
import App from './App.vue';
import router from './routes';
import './assets/styles/global.css' 

createApp(App).use(router).mount('#app')