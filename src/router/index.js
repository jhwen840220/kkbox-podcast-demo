import { createRouter, createWebHashHistory } from "vue-router";

const Home = () =>
    import(/* webpackChunkName: "Home" */ "~containers/Home/HomeContainer");
const Episode = () =>
    import(
        /* webpackChunkName: "Episode" */ "~containers/Episode/EpisodeContainer"
    );

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
    next();
});

export default router;
