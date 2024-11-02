import { createVuetify } from "vuetify/lib/framework.mjs";
import { aliases, mdi } from "vuetify/iconsets/mdi"
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify ({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: { mdi },
    },

    theme: {
        defaultTheme: 'light'
    }
})