const express = require('express');
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");
const multer = require("multer");
require("dotenv").config();
const routeAdmin = require("./routes/admin/index.route");
const route = require("./routes/client/index.route");
const database = require("./config/database");
const app = express();
const port = process.env.PORT;
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
const systemConfig = require("./config/system");
const cookieParser = require('cookie-parser');
database.connect();
app.set("views",`${__dirname}/views`);
app.set("view engine","pug");
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser("JHGJKLKLGFLJK"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

app.locals.prefixAdmin = systemConfig.prefixAdmin;

routeAdmin(app);
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});