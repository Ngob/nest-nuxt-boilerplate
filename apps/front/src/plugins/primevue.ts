import PrimeVue from "primevue/config";
import Button from "primevue/button";
import TieredMenu from "primevue/tieredmenu";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true });
  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.component("TieredMenu", TieredMenu);
  //other components that you need
});