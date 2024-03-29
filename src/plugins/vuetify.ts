import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi'

    },
    theme: {
        themes: {
            light: {
                primary: colors.cyan.darken3,
                success: colors.cyan.darken1
            }
        }
    }

})