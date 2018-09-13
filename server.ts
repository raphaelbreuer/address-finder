require('dotenv').config();
import * as express from 'express';
import * as bodyParser from 'body-parser';
const app = express();
const path = require('path');
const cors=require('cors');
import { authRouter } from './authRoutes';
import { router } from './routes';
import { checkToken } from './utils/tokens';
require('es6-object-assign/auto');
var obj = Object.assign({}, { foo: 'bar' });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/auth', authRouter);
app.use('/api',checkToken,router);

if (process.env.PROD) {
    app.use(express.static(path.join(__dirname, './ryb-enterprise/build')));
    app.get('*', (req, res, next) => {
        res.sendFile(path.join(__dirname, './ryb-enterprise/build/index.html'));
    });
}
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server is running on port ${port}`));