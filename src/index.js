import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "~src/App.vue";
import store from "~vuex/store";

import Home from "~containers/Home/HomeContainer";
import Episode from "~containers/Episode/EpisodeContainer";

import "~styles/common.scss";

const routes = [
    {
        path: "/",
        component: Home,
        name: "Home",
        meta: { title: "KKBOX podcast" },
    },
    {
        path: "/episode/:id",
        component: Episode,
        name: "Episode",
        meta: { title: "KKBOX podcast" },
    },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});

router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next()
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
