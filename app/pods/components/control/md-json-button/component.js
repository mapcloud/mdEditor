import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  classNames: ['btn', 'btn-xs', 'btn-primary'],
  attributeBindings: ['type'],
  type: 'button',

  text: 'Preview JSON',
  icon: 'binoculars',
  json: {},

  click() {
    this.set('preview', true);
  },
  actions: {
    close() {
      this.set('preview', false);
    }
  }
});
