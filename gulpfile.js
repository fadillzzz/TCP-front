var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    typescript = require('gulp-typescript'),
    assets = {
        css: {
            src: [
                'bower_components/normalize.css/normalize.css',
                'bower_components/font-awesome/css/font-awesome.css',
                'styles/*.scss'
            ],
            dst: 'public/styles',
            file: 'style.css'
        },
        js: {
            src: [
                'ts/**/*.ts'
            ],
            deps: [
                'node_modules/es6-shim/es6-shim.js',
                'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
                'node_modules/angular2/bundles/angular2-polyfills.js',
                'node_modules/systemjs/dist/system.src.js',
                'node_modules/rxjs/bundles/Rx.js',
                'node_modules/angular2/bundles/angular2.js',
                'node_modules/angular2/bundles/router.js'
            ],
            depsFile: 'deps.js',
            dst: 'public/scripts',
        },
        fonts: {
            src: [
                'fonts/*',
                'bower_components/font-awesome/fonts/*'
            ],
            dst: 'public/fonts'
        },
        images: {src: 'images/*', dst: 'public/images'},
        templates: {src: 'templates/*', dst: 'public/templates'},
    };

gulp.task('css', function() {
    return gulp.src(assets.css.src)
               .pipe(concat(assets.css.file))
               .pipe(sass())
               .pipe(minifyCss())
               .pipe(gulp.dest(assets.css.dst));
});

gulp.task('images', function () {
    return gulp.src(assets.images.src)
               .pipe(gulp.dest(assets.images.dst));
});

gulp.task('templates', function () {
    return gulp.src(assets.templates.src)
               .pipe(gulp.dest(assets.templates.dst));
});

gulp.task('fonts', function () {
    return gulp.src(assets.fonts.src)
               .pipe(gulp.dest(assets.fonts.dst));
});

var tsProject = typescript.createProject({
                    target: 'es5',
                    module: 'system',
                    moduleResolution: 'node',
                    emitDecoratorMetadata: true,
                    experimentalDecorators: true,
                    removeComments: false,
                    noImplicitAny: false,
                    sortOutput: true
                });

gulp.task('js', function () {
    gulp.src(assets.js.deps)
        .pipe(concat(assets.js.depsFile))
        .pipe(uglify()).pipe(gulp.dest(assets.js.dst));

    var tsResult = gulp.src(assets.js.src)
                       .pipe(typescript(tsProject));

    return tsResult.js.pipe(uglify())
                      .pipe(gulp.dest(assets.js.dst));
});

gulp.task('watch', ['js', 'css', 'images', 'templates', 'fonts'], function () {
    gulp.watch(assets.js.src, ['js']);
    gulp.watch(assets.css.src, ['css']);
    gulp.watch(assets.images.src, ['images']);
    gulp.watch(assets.templates.src, ['templates']);
    gulp.watch(assets.fonts.src, ['fonts']);
});
