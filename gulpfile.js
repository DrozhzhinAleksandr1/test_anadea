var gulp 			= require('gulp'), 
	browserSync 	= require('browser-sync'),
	concat 			= require('gulp-concat'),
	uglify 			= require('gulp-uglifyjs'),
	rename 			= require('gulp-rename'),
	cssnano 		= require('gulp-cssnano'),
	del 			= require('del'),
	autoprefixer 	= require('gulp-autoprefixer');

gulp.task('css', function(){
	return gulp.src(['!src/css/common.css','src/css/*.css'])
	.pipe(concat('common.css'))	
	.pipe(gulp.dest('src/css'))
});

gulp.task('js',function(){
	return gulp.src(['!src/js/common.js','src/js/**/*.js'])
	.pipe(concat('common.js'))
	.pipe(gulp.dest('src/js'))
});

gulp.task('BS',function(){
	browserSync({
		server:{
			baseDir: 'src'
		},
		notify: false
	});
});

gulp.task('clean',function(){
	return del.sync('dist');
});

gulp.task('watch', ['BS','css', 'js'] , function(){
	gulp.watch('src/css/**/*.css', ['css', browserSync.reload]);
	gulp.watch('src/**/*.+(php|html)', browserSync.reload);
	gulp.watch('src/js/**/*.js', ['js', browserSync.reload]);
});

gulp.task('build', ['clean', 'css', 'js'] ,function(){
var buildCss = gulp.src(['!src/css/common.css','src/css/**/*.css'])	
	.pipe(concat('common.css'))	
	.pipe(autoprefixer(['last 15 versions','> 1%', 'ie 8', 'ie 7'],{cascade:true}))
	.pipe(cssnano())
	.pipe(gulp.dest('dist/css'));
var buildJs = gulp.src('src/js/common.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
var buildImg = gulp.src('src/img/*')
	.pipe(gulp.dest('dist/img'));
var buildHtml = gulp.src('src/*.html')
	.pipe(gulp.dest('dist'));
});