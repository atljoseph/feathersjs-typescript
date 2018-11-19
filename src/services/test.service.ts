// Initializes the `users` service on path `/users`
import * as createService from 'feathers-memory'; 

export function testService() {
    const app = this;
    const paginate = app.get('paginate');
  
    const options = {
      name: 'test',
      paginate
    };
  
    // Initialize our service with any options it requires
    app.use('/test', createService(options));
  
    // Get our initialized service so that we can register hooks and filters
    const service = app.service('test');
  };
  