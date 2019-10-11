const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')    
    .sass('resources/sass/app.scss', 'public/css');



mix.scripts([
    // SELECT2
    'node_modules/admin-lte/plugins/select2/js/select2.full.js',    
    // Bootstrap4 Duallistbox
    'node_modules/admin-lte/plugins/bootstrap4-duallistbox/jquery.bootstrap-duallistbox.min.js',   
    // MOMENT
    'node_modules/admin-lte/plugins/moment/moment.min.js',
    'node_modules/admin-lte/plugins/inputmask/min/jquery.inputmask.bundle.min.js',
    
    // Tempusdominus Bbootstrap 4
    'node_modules/admin-lte/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.js',   
    
    
    // date-range-picker
    'node_modules/admin-lte/plugins/daterangepicker/daterangepicker.js',
    
    // bootstrap color picker
    'node_modules/admin-lte/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js',
    
    // Bootstrap Switch    
    'node_modules/admin-lte/plugins/bootstrap-switch/js/bootstrap-switch.js',
    
    // Ion Slider
    'node_modules/admin-lte/plugins/ion-rangeslider/js/ion.rangeSlider.js',

    // Bootstrap slider
    'node_modules/admin-lte/plugins/bootstrap-slider/bootstrap-slider.js',



],  'public/js/components.js');