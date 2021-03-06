import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('dashboard');
  this.route('export');
  this.route('import');
  this.route('translate');
  this.route('publish');
  this.route('help');
  this.route('settings');

  //records
  this.route('records');
  //record
  this.route('record', function () {
    this.route('new', function() {
      this.route('id', {
        path: '/:record_id'
      });
    });
    this.route('show', {
        path: ':record_id'
      },
      function () {
        this.route('edit', function () {
          this.route('metadata');
          this.route('keywords', function() {
            this.route('thesaurus', {
              path: 'thesaurus/:thesaurus_id'
            });
          });
          this.route('spatial', function() {
            this.route('extent', {
              path: 'extent/:extent_id'
            });
          });
          this.route('quality');
          this.route('distribution');
          this.route('associated');
          this.route('documents');
          this.route('coverages');
          this.route('grid');
        });
      }
    );
  });
  //contacts
  this.route('contacts');
  //contact
  this.route('contact', function () {
    this.route('new', function() {
      this.route('id', {
        path: '/:contact_id'
      });
    });

    this.route('show', {
      path: ':contact_id'
    }, function () {
      this.route('edit');
    });

  });
  //dictionary
  this.route('dictionaries');
  //dictionary
  this.route('dictionary', function () {
    this.route('new', function() {
      this.route('id', {
        path: '/:dictionary_id'
      });
    });
    this.route('show', {
      path: ':dictionary_id'
    }, function () {
      this.route('edit', function () {
        this.route('domains');
        this.route('entities');
      });
    });
  });

  this.route('not-found', {
    path: '/*path'
  });
  this.route('error');
});

export default Router;
