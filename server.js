// Brings in all of the dependencies
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const compression = require("compression");
// initializing the application using express
const app = express();

// declared the PORT
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Set up our cookie session
const sess = {
	secret: "Super secret secret",
	cookie: {},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

// application will use the cookie session
app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
// we are using the public folder as our public directory
app.use(express.static(path.join(__dirname, "public")));

// we are using the controllers folder as the routes
app.use(routes);

// when we start the application sync up to the database and start the application
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log(`Now listening on PORT ${PORT} 🚀`));
});
