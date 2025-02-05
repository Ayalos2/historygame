import {createApp} from 'vue';
import App from './App.vue';
import router from './routes';
import './assets/styles/global.css' 

const fontAwesomeLink = document.createElement('link');
fontAwesomeLink.rel = 'stylesheet';
fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
document.head.appendChild(fontAwesomeLink);


createApp(App).use(router).mount('#app')