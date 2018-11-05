const gulp = require('gulp');
const browserSync = require('browser-sync'); // Сервер
const gulpIf = require('gulp-if'); // Позволяет использовать особый синтаксис IF ELSE в GULP
const minify = require('gulp-minify'); // Минификация JS
const babel = require('gulp-babel'); // Преобразование нового синтаксиса JS в старый
const concat = require('gulp-concat'); // Объеденяет все файлы JS в 1
const sourcemaps = require('gulp-sourcemaps'); // Необходимо для отладки скриптов - чтобы понимать где произошла ошибка
const sass = require('gulp-sass'); // CSS преероцессор
const autoprefixer = require('gulp-autoprefixer'); // Добавляет вендорные префиксы CSS
const csso = require('gulp-csso'); // Минификация CSS

gulp.task('serve', ['js', 'css'], () => {
	browserSync.init({
			port: 3001,
			server: {
				baseDir: "./views"
			}
	});
	gulp.watch('./block/**/*.js', ['js']);
	gulp.watch('./block/**/*.sass', ['css']);
	gulp.watch('./assets/**/*.sass', ['css']);
});

// JS
gulp.task('js', () => {
	return gulp.src(['./block/**/*.js'])
		.pipe(babel({presets: ['@babel/env']}))
		.pipe(sourcemaps.init())
		.pipe(concat('app.js'))
		.pipe(minify({ext : {
				src : '-debug.js',
				min : '.js'
			}
			}))
		.pipe(sourcemaps.write())
	.pipe(gulp.dest('./public/js/'));
});

// SASS
gulp.task('css', () => {
	setTimeout( () => {
		return gulp.src(['./assets/style.sass'])
			.pipe(sass())
			.pipe(sourcemaps.init())
			//.pipe(autoprefixer())
			//.pipe(csso())
			.pipe(sourcemaps.write())
		.pipe(gulp.dest('./public/css/'));
	},500 );
});

gulp.task('default', ['serve']);