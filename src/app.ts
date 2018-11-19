
import * as path from 'path'; 

// import * as favicon from 'serve-favicon'; 
const favicon = require('serve-favicon');

import * as compress from 'compression';
import * as helmet from 'helmet';  
import * as cors from 'cors';   

import * as feathers from '@feathersjs/feathers';  
import * as configuration from '@feathersjs/configuration';  
import * as express from '@feathersjs/express';  
import * as socketio from '@feathersjs/socketio';  

import logger from './logger';
import middleware from './middleware';
import services from './services'; 
import hooks from './hooks';
import channels from './channels';

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Host the public folder
app.use('/', express.static(app.get('public')));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(hooks);

export default app;
