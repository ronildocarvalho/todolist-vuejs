import Vue from 'vue';
import Home from './pages/Home';
import DetalheTarefa from './pages/DetalheTarefa';
import NotFound from './pages/NotFound';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home,
            meta: {
                title: 'Home'
            }
        },
        {
            path: '/detalhe',
            component: DetalheTarefa,
            name: 'detalhe',
            props: true,
            meta: {
                title: 'Detalhe'
            }
        },
        {
            path: '*',
            component: NotFound,
            meta: {
                title: '408'
            }
        }
    ]
});