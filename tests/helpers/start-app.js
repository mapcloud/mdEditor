import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';
import registerModalAssertHelpers from './modal-asserts';

export default function startApp(attrs) {
  let attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  return Ember.run(() => {
    let application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
    registerModalAssertHelpers();
    return application;
  });

}