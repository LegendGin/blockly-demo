// Load gulp
var gulp = require('gulp');

// Load plugins
var rename = require('gulp-rename');
var template = require('gulp-template');
var activeModule, htmlMsg;


// 英文
gulp.task('en_html', function () {
    return gulp.src('views/' + activeModule + '/default.html')
        .pipe(template(htmlMsg.en_html_data))
        .pipe(rename("index.html"))
        .pipe(gulp.dest('views/' + activeModule + '/'));
});

// 简体中文
gulp.task('hans_html', function () {
    return gulp.src('views/' + activeModule + '/default.html')
        .pipe(template(htmlMsg.hans_html_data))
        .pipe(rename("index-hans.html"))
        .pipe(gulp.dest('views/' + activeModule + '/'));
});

// 繁体
gulp.task('hant_html', function () {
    return gulp.src('views/' + activeModule + '/default.html')
        .pipe(template(htmlMsg.hant_html_data))
        .pipe(rename("index-hant.html"))
        .pipe(gulp.dest('views/' + activeModule + '/'));
});

// 日文
gulp.task('ja_html', function () {
    return gulp.src('views/' + activeModule + '/default.html')
        .pipe(template(htmlMsg.ja_html_data))
        .pipe(rename("index-ja.html"))
        .pipe(gulp.dest('views/' + activeModule + '/'));
});

gulp.task('airblock', function () {
    activeModule = 'airblock';
    htmlMsg = require('./views/' + activeModule + '/html_msg.json');
    gulp.start('en_html', 'hans_html', 'hant_html');
});

gulp.task('makeblockhd', function () {
    activeModule = 'makeblockhd';
    htmlMsg = require('./views/' + activeModule + '/html_msg.json');
    gulp.start('en_html', 'hans_html', 'hant_html', 'ja_html');
});

gulp.task('makeblockNeuron', function () {
    activeModule = 'makeblockNeuron';
    htmlMsg = require('./views/' + activeModule + '/html_msg.json');
    gulp.start('en_html', 'hans_html', 'hant_html');
});

gulp.task('all', function() {
    gulp.start('makeblockhd', 'neuron', 'makeblockNeuron');
});


// Default task
gulp.task('default', function() {
    gulp.start('makeblockhd');
});

// all task
gulp.task('all', function() {
    gulp.start('makeblockhd', 'makeblockNeuron', 'airblock');
});
