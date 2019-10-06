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

mix.copyDirectory('vendor/twbs/bootstrap-sass/assets/fonts/bootstrap', 'public/fonts/bootstrap');

mix.scripts([
    // Pntify
    'node_modules/gentelella/vendors/pnotify/dist/pnotify.js',
    'node_modules/gentelella/vendors/pnotify/dist/pnotify.buttons.js',
    // SparLine
    'node_modules/gentelella/vendors/jquery-sparkline/dist/jquery.sparkline.js',
    // DateRangerPicker
    'node_modules/gentelella/vendors/moment/moment.js',
    'node_modules/gentelella/vendors/bootstrap-daterangepicker/daterangepicker.js',
    // colorpicker
    'node_modules/gentelella/vendors/mjolnic-bootstrap-colorpicker/dist/js/bootstrap-colorpicker.js',
    // imput masc
    'node_modules/gentelella/vendors/jquery.inputmask/dist/jquery.inputmask.bundle.js',    
    // switchery
    'node_modules/gentelella/vendors/switchery/dist/switchery.js'
],  'public/js/components.js');