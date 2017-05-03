import {RouterConfiguration, Router} from 'aurelia-router';

export class App {
  
  router:Router

  configureRouter(config, router){
      config.title = 'Aurelia';
		
      config.map([
         { route: ['','home'], name: 'home', moduleId:'./home', nav:true, title:'Home' },
         { route: ['test'],  name: 'test',  moduleId: './test',  nav: true, title:'Test' },
         { route: ['activity1'],  name: 'activity1',  moduleId: './activity1',  nav: true, title:'Activity1' },
         { route: ['activity2'],  name: 'activity2',  moduleId: './activity2',  nav: true, title:'Activity2' },
         { route: ['activity3'],  name: 'activity3',  moduleId: './activity3',  nav: true, title:'Activity3' },
         { route: ['activity5'],  name: 'activity5',  moduleId: './activity5',  nav: true, title:'Activity5' }
         
      ]);

      this.router = router;
   }
}
