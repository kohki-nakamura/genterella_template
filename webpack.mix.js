let mix = require('laravel-mix');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// paths to clean
var pathsToClean = [
    'public/js',
    'public/css',
    'public/js/admin',
    'public/css/admin',
    'public/js/jquery-ui',
    'public/css/auth',
    'public/ckeditor/plugins/citetag',
    'public/ckeditor/plugins/inserthtml',
    'public/ckeditor/plugins/adlink',
];

// the clean options to use
var cleanOptions = {};

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
    'resources/js/admin/globals.js'
], 'public/js/app.js').version();

mix.styles([
    'node_modules/font-awesome/css/font-awesome.css',
    'node_modules/pace-progress/themes/blue/pace-theme-minimal.css',
    'node_modules/jquery-ui-dist/jquery-ui.css',
], 'public/css/app.css').version();

mix.copy([
    'node_modules/font-awesome/fonts/',
], 'public/css/fonts');

mix.babel([
    'node_modules/jquery-ui-dist/jquery-ui.js',
    'node_modules/jquery-ui/ui/i18n/datepicker-ja.js',
], 'public/js/jquery-ui/jquery-ui.js').version();

mix.styles([
    'node_modules/jquery-ui-dist/jquery-ui.css',
], 'public/js/jquery-ui/jquery-ui.css').version();

mix.copyDirectory('node_modules/jquery-ui-dist/images',
    'public/js/jquery-ui/images');

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
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/bootstrap-progressbar/bootstrap-progressbar.js',
    'node_modules/pace-progress/pace.js',
    'node_modules/fastclick/lib/fastclick.js',
    'node_modules/nprogress/nprogress.js',
    'node_modules/icheck/icheck.js',
    'node_modules/datatables/media/js/jquery.dataTables.min.js',
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
    'node_modules/pdfmake/build/pdfmake.min.js',
    'node_modules/pdfmake/build/vfs_fonts.js',
    'resources/js/admin/globals.js',
    'node_modules/gentelella/build/js/custom.js'
], 'public/js/admin/app.js').version();

mix.styles([
    'node_modules/jquery-ui-dist/jquery-ui.css',
    'node_modules/bootstrap/dist/css/bootstrap.css',
    'node_modules/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.css',
    'node_modules/gentelella/vendors/animate.css/animate.css',
    'node_modules/gentelella/build/css/custom.css',
    'node_modules/font-awesome/css/font-awesome.css',
    'node_modules/nprogress/nprogress.css',
    'node_modules/icheck/skins/flat/green.css',
    'node_modules/pace-progress/themes/blue/pace-theme-minimal.css',
    'node_modules/datatables/media/css/jquery.dataTables.min.css',
    'node_modules/datatables.net-bs/css/dataTables.bootstrap.min.css',
    'node_modules/datatables.net-buttons-bs/css/buttons.bootstrap.min.css',
    'node_modules/datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.min.css',
    'node_modules/datatables.net-responsive-bs/css/responsive.bootstrap.min.css',
    'node_modules/datatables.net-scroller-bs/css/scroller.bootstrap.min.css',
    'resources/css/app.css',
], 'public/css/admin/app.css').version();


mix.copy([
    'node_modules/gentelella/vendors/bootstrap/dist/fonts',
], 'public/css/fonts');

mix.copy([
    'node_modules/bootstrap/dist/css/bootstrap.css.map',
], 'public/css/admin')

mix.babel([
    'node_modules/select2/dist/js/select2.full.js',
    'resources/js/admin/users/edit.js',
], 'public/js/admin/users/edit.js').version();

mix.babel([
    'node_modules/select2/dist/js/select2.full.js',
    'resources/js/admin/categories/edit.js',
], 'public/js/admin/categories/edit.js').version();

mix.babel([
    'node_modules/select2/dist/js/select2.full.js',
    'resources/js/admin/tags/edit.js',
], 'public/js/admin/tags/edit.js').version();

mix.babel([
    'node_modules/select2/dist/js/select2.full.js',
    'resources/js/admin/nurseries/edit.js',
], 'public/js/admin/nurseries/edit.js').version();

mix.babel([
    'node_modules/select2/dist/js/select2.full.js',
    'resources/js/admin/nurseries/index.js',
], 'public/js/admin/nurseries/index.js').version();

mix.babel([
    'node_modules/select2/dist/js/select2.full.js',
    'resources/js/admin/nursery_capacities/edit.js',
], 'public/js/admin/nursery_capacities/edit.js').version();

mix.babel([
    'node_modules/select2/dist/js/select2.full.js',
    'resources/js/admin/writers/edit.js',
], 'public/js/admin/writers/edit.js').version();

mix.babel([
    'node_modules/select2/dist/js/select2.full.js',
    'resources/js/admin/permissions/operationedit.js',
], 'public/js/admin/permissions/operationedit.js').version();

mix.babel([
    'node_modules/select2/dist/js/select2.full.js',
    'resources/js/admin/articles/index.js',
], 'public/js/admin/articles/index.js').version();

mix.babel([
    'node_modules/select2/dist/js/select2.full.js',
    'resources/js/admin/features/index.js',
], 'public/js/admin/features/index.js').version();

mix.babel([
    'node_modules/select2/dist/js/select2.full.js',
    'resources/js/admin/article_pr_filterings/index.js'   
], 'public/js/admin/article_pr_filterings/index.js').version();

mix.babel([
    'node_modules/select2/dist/js/select2.full.js',
    'node_modules/jquery-lazyload/jquery.lazyload.js',
    'node_modules/clipboard/dist/clipboard.js',
    'resources/js/admin/common/getCdnImagePath.js',
    'resources/js/admin/common/getImageList.js',
    'resources/js/admin/articles/edit.js',
], 'public/js/admin/articles/edit.js').version();

mix.babel([
    'resources/ckeditor/lang/ja.js',
    'resources/ckeditor/lang/custom.js',
], 'public/ckeditor/lang/ja.js');

mix.copyDirectory('resources/ckeditor/plugins/citetag',
    'public/ckeditor/plugins/citetag');

mix.copyDirectory('resources/ckeditor/plugins/inserthtml',
    'public/ckeditor/plugins/inserthtml');

mix.copyDirectory('resources/ckeditor/plugins/adlink',
    'public/ckeditor/plugins/adlink');

mix.babel([
    'node_modules/select2/dist/js/select2.full.js',
    'resources/js/admin/pickups/index.js',
], 'public/js/admin/pickups/index.js').version();

mix.copy('resources/js/admin/common/jquery.selectlistactions.js', 'public/js/admin/common/').version();
mix.copy('resources/js/admin/nurseries/edit_image_order.js', 'public/js/admin/nurseries/').version();
mix.copy('resources/js/admin/articles/templates.js', 'public/js/admin/articles/').version();
mix.copy('resources/js/admin/nursery_massupdates/common.js', 'public/js/admin/nursery_massupdates/').version();
mix.copy('resources/js/admin/mail_subscriptions/common.js', 'public/js/admin/mail_subscriptions/').version();

// mix.babel([
//     'node_modules/select2/dist/js/select2.full.js',
//     'resources/js/admin/common/getCdnImagePath.js',
//     'resources/js/admin/common/getImageList.js',
//     'resources/js/admin/pickups/edit.js',
// ], 'public/js/admin/pickups/edit.js').version();

// mix.babel([
//     'node_modules/clipboard/dist/clipboard.js',
//     'resources/js/admin/nurseries/edit.js',
// ], 'public/assets/partner/js/nurseries/edit.js').version();

mix.styles([
    'node_modules/select2/dist/css/select2.css',
    'resources/css/admin/articles/index.css',
], 'public/css/admin/articles/index.css').version();

mix.styles([
    'node_modules/select2/dist/css/select2.css',
], 'public/css/admin/article_pr_filterings/index.css').version();

mix.styles([
    'node_modules/select2/dist/css/select2.css',
], 'public/css/admin/features/index.css').version();

mix.styles([
    'node_modules/select2/dist/css/select2.css',
    'resources/css/admin/articles/edit.css'
], 'public/css/admin/articles/edit.css').version();

mix.styles([
    'node_modules/select2/dist/css/select2.css',
], 'public/css/admin/pickups/index.css').version();

mix.styles([
    'node_modules/select2/dist/css/select2.css',
    'resources/css/admin/articles/edit.css',
], 'public/css/admin/pickups/edit.css').version();

mix.styles([
    'node_modules/select2/dist/css/select2.css',
], 'public/css/admin/users/edit.css').version();

mix.styles([
    'node_modules/select2/dist/css/select2.css',
], 'public/css/admin/categories/edit.css').version();

mix.styles([
    'node_modules/select2/dist/css/select2.css',
], 'public/css/admin/tags/edit.css').version();

mix.styles([
    'node_modules/select2/dist/css/select2.css',
], 'public/css/admin/nurseries/edit.css').version();

mix.styles([
    'resources/css/admin/writers/index.css',
], 'public/css/admin/writers/index.css').version();

mix.styles([
    'node_modules/select2/dist/css/select2.css',
], 'public/css/admin/writers/edit.css').version();

mix.styles([
    'node_modules/select2/dist/css/select2.css',
], 'public/css/admin/permissions/operationedit.css').version();

mix.styles([
    'node_modules/select2/dist/css/select2.css',
    'resources/css/admin/features/edit.css'
], 'public/css/admin/features/edit.css').version();

/*
 |--------------------------------------------------------------------------
 | Frontend
 |--------------------------------------------------------------------------
 |
 */
