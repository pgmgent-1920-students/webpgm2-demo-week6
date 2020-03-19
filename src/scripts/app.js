// load css
import '../styles/main.css';

// navigo router
import Navigo from 'navigo';
import nunjucks from 'nunjucks';

// controllers
import TripsController from './TripsController';
import PagesController from './PagesController';

const app = {

  init() {
    // location of templates for nunjucks
    nunjucks.configure('templates', { autoescape: true });

    // cache DOM elements
    this.cacheDOMElements();

    // initiate router
    this.initRouter(window.location.origin, true, '#!');
    
    // instantiate controllers
    this.controllers = {
      trips: new TripsController(this.$wrapper, this.router),
      pages: new PagesController(this.$wrapper, this.router),
    };

    // declare all routes
    this.routes();
  },

  initRouter(root, useHash, hash) {
    this.router = new Navigo(root, useHash, hash); // initiate router
    this.router.updatePageLinks(); // detects data-navigo attribute and translate links to routed links
  },

  cacheDOMElements() {
    this.$wrapper = document.getElementById('template-wrapper');
  },

  routes() {
    this.router.on({
      '/': () => { this.controllers.pages.home(); },
      'trips': () => { this.controllers.trips.index();},
      'trips/add': () => { this.controllers.trips.add(); },
      'trips/edit/:id': (params) => { this.controllers.trips.edit(params); },
      'trips/delete/:id': (params) => { this.controllers.trips.delete(params); },
    }).resolve();
  }
}

app.init();


