global.__APPROOT= require('app-root-path');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const session = require('express-session');
const useragent = require('express-useragent');
const formData = require('express-form-data');
const os = require("os");
const conf = require(__APPROOT  + '/config');

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const initRouter = require('./routes/init');

const api = require(__APPROOT + '/api');




const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(useragent.express());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// SASS
app.use(sassMiddleware({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	indentedSyntax: true, // true = .sass and false = .scss
	sourceMap: true
}));
// SESSION
app.use(session({
	secret: conf.get('session:secret'),
	resave : conf.get('session:resave'),
	saveUninitialized : conf.get('session:saveUninitialized'),
	key: conf.get('session:key'),
	cookie: conf.get('session:cookie')
}));
// FORM DATA
app.use(formData.parse({
	uploadDir: os.tmpdir(),
	autoClean: true
}));
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());
app.use(cookieParser());

// Временно
app.use((req, res, next)=>{
	req.session.user= { id_visitor : 1 };
	next();
});


app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);

app.use('/', indexRouter);
app.use('/admin', adminRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
