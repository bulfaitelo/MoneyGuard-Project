require('./bootstrap');
window.$ = window.jQuery = require('jquery');
window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('home-dash-small-graph', require('./components/DashboardSmallCard.vue').default);
Vue.component('home-dash-month-info', require('./components/DashboardMonthInfo.vue').default);
// Vue.component('chart-vue', require('./components/ChartTest.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
});


require('bootstrap');
require('moment/moment');
require('@fortawesome/fontawesome-free');
require('icheck-bootstrap');
require('overlayscrollbars/js/jquery.overlayScrollbars');
import Chart from 'chart.js';
require('flot');
require('sparklines/source/sparkline');
require('jquery-knob-chif');
require('datatables.net');
require('datatables.net-bs4/js/dataTables.bootstrap4');
require('admin-lte');
