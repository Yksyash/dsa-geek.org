const express = require('express')
const session = require('express-session')
const cors = require('cors');

const app = express();

const {port,clientUrl,dbName,dbUsername,dbPassword,secretKey,rabbitmqUrl} = require('./config');
const attachDB = require ('./middlewares/mongodb')


app.use(cors({origin:[`${clientUrl}`]}));
app.use(attachDB);

const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin')
const commonRoutes = require('./routes/commonRoutes')



//Configure session middleware
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
  name:'myCookie',
}));

app.use('/user',userRoutes);
app.use('/admin',adminRoutes);
app.use(commonRoutes)

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
})