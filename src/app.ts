import express, { Application } from 'express';
import EmailsRoutes from './modules/email/routes/email.routes';
import DnaRoutes from './modules/dna/routes/dna.routes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

const app: Application = express();

mongoose.connection.once('open', () => {
  console.log('mongo connected');
  app.use(EmailsRoutes);
  app.use(DnaRoutes);
});

// for images remote access (emails)
app.use(express.static('./'));
app.use(bodyParser.json({ limit: '500mb' }));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Credentials');
    next();
})

app.listen(5000);