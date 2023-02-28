import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/theme.scss'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";

import { HandleDirective as Slicksort } from 'vue-slicksort';

library.add(fas)

createApp(App)
    .use(router, Slicksort)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')