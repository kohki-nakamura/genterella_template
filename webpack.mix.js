let mix = require('laravel-mix');
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// paths to clean
// var pathsToClean = [
//     'public/js',
//     'public/css',
//     'public/js/admin',
//     'public/css/admin',
//     'public/js/jquery-ui',
//     'public/css/auth',
//     'public/ckeditor/plugins/citetag',
//     'public/ckeditor/plugins/inserthtml',
//     'public/ckeditor/plugins/adlink',
// ];

// the clean options to use
// var cleanOptions = {};

// mix.webpackConfig({
//     plugins: [
//         new CleanWebpackPlugin({pathsToClean, cleanOptions})
//     ]
// });

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

/*
 |--------------------------------------------------------------------------
 | Core
 |--------------------------------------------------------------------------
 |
 */

mix.babel([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/pace-progress/pace.js',
], 'public/js/app.js').version();

mix.styles([
    'node_modules/font-awesome/css/font-awesome.css',
    'node_modules/pace-progress/themes/blue/pace-theme-minimal.css',
    'node_modules/jquery-ui-dist/jquery-ui.css',
], 'public/css/app.css').version();

mix.copy([
    'node_modules/font-awesome/fonts/',
], 'public/css/fonts');

/*
 |--------------------------------------------------------------------------
 | Auth
 |--------------------------------------------------------------------------
 |
 */


mix.styles('resources/css/auth/login.css', 'public/css/auth/login.css').version();
mix.styles('resources/css/auth/register.css', 'public/css/auth/register.css').version();
mix.styles('resources/css/auth/passwords.css', 'public/css/auth/passwords.css').version();

mix.styles([
    'node_modules/bootstrap/dist/css/bootstrap.css',
    'node_modules/gentelella/vendors/animate.css/animate.css',
    'node_modules/gentelella/build/css/custom.css',
], 'public/css/auth/auth.css').version();


/*
 |--------------------------------------------------------------------------
 | Admin
 |--------------------------------------------------------------------------
 |
 */

mix.babel([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
], 'public/js/admin/app.js').version();

mix.styles([
    'node_modules/jquery-ui-dist/jquery-ui.css',
    'node_modules/bootstrap/dist/css/bootstrap.css',
    'node_modules/font-awesome/css/font-awesome.css',
], 'public/css/admin/app.css').version();

mix.babel([
    'resources/vendors/gentelella/build/js/custom.js'
], 'public/js/admin/custom.js').version();

mix.styles([
    'resources/vendors/gentelella/build/css/custom.css',
    'node_modules/gentelella/vendors/animate.css/animate.css',
], 'public/css/admin/custom.css').version();

mix.babel([
    'node_modules/fastclick/lib/fastclick.js',
    'node_modules/nprogress/nprogress.js',
    'resources/vendors/Chart.js/dist/Chart.min.js',
    'resources/vendors/gauge.js/dist/gauge.min.js',
    'node_modules/bootstrap-progressbar/bootstrap-progressbar.min.js',
    'node_modules/icheck/icheck.js',
    'resources/vendors/skycons/skycons.js',
    'node_modules/jquery.flot/jquery.flot.js',
    'node_modules/jquery.flot/jquery.flot.pie.js',
    'node_modules/jquery.flot/jquery.flot.time.js',
    'node_modules/jquery.flot/jquery.flot.stack.js',
    'node_modules/jquery.flot/jquery.flot.resize.js',
    'node_modules/flot-orderbars/js/jquery.flot.orderBars.js',
    'node_modules/flot-spline/js/jquery.flot.spline.min.js',
    'node_modules/flot.curvedlines/curvedLines.js',
    'resources/vendors/DateJS/build/date.js',
    'node_modules/jqvmap/dist/jquery.vmap.js',
    'node_modules/jqvmap/dist/maps/jquery.vmap.world.js',
    'node_modules/jqvmap/examples/js/jquery.vmap.sampledata.js',
    'node_modules/moment/min/moment.min.js',
    'node_modules/bootstrap-daterangepicker/daterangepicker.js',
], 'public/js/admin/dashboard.js').version();

mix.styles([
    'node_modules/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css',
    'node_modules/jqvmap/dist/jqvmap.min.css',
    'node_modules/bootstrap-daterangepicker/daterangepicker.css',
], 'public/css/admin/dashboard.css').version();

mix.babel([
    'node_modules/fastclick/lib/fastclick.js',
    'node_modules/nprogress/nprogress.js',
    'node_modules/icheck/icheck.js',
    'node_modules/datatables.net/js/jquery.dataTables.min.js',
    'node_modules/datatables.net-bs/js/dataTables.bootstrap.min.js',
    'node_modules/datatables.net-buttons/js/dataTables.buttons.min.js',
    'node_modules/datatables.net-buttons-bs/js/buttons.bootstrap.min.js',
    'node_modules/datatables.net-buttons/js/buttons.flash.min.js',
    'node_modules/datatables.net-buttons/js/buttons.html5.min.js',
    'node_modules/datatables.net-buttons/js/buttons.print.min.js',
    'node_modules/datatables.net-fixedheader/js/dataTables.fixedHeader.min.js',
    'node_modules/datatables.net-keytable/js/dataTables.keyTable.min.js',
    'node_modules/datatables.net-responsive/js/dataTables.responsive.min.js',
    'node_modules/datatables.net-responsive-bs/js/responsive.bootstrap.js',
    'node_modules/datatables.net-scroller/js/dataTables.scroller.min.js',
    'node_modules/jszip/dist/jszip.min.js',
    'resources/vendors/pdfmake/build/pdfmake.min.js',
    'resources/vendors/pdfmake/build/vfs_fonts.js',
], 'public/js/admin/table.js').version();

mix.styles([
    'resources/vendors/datatables.net/1.10.20/css/jquery.dataTables.min.css',
    'node_modules/nprogress/nprogress.css',
    'node_modules/icheck/skins/flat/green.css',
    'node_modules/datatables.net-bs/css/dataTables.bootstrap.min.css',
    'node_modules/datatables.net-buttons-bs/css/buttons.bootstrap.min.css',
    'node_modules/datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.min.css',
    'node_modules/datatables.net-responsive-bs/css/responsive.bootstrap.min.css',
    'node_modules/datatables.net-scroller-bs/css/scroller.bootstrap.min.css',
], 'public/css/admin/table.css').version();

/*
 |--------------------------------------------------------------------------
 | Frontend
 |--------------------------------------------------------------------------
 |
 */
