/**
 * @module mdeditor
 * @submodule components-input
 */

import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Component.extend({
  classNames: ['md-select'],
  classNameBindings: ['formGroup'],
  formGroup: Ember.computed.notEmpty('label'),
  /**
   * A select list control for displaying and selecting options
   * provided in an array or promise array.
   *
   * @class md-select
   * @constructor
   */

  /**
   * An array or promise array containing the options for the
   * select list.
   * At a minimum the array elements should provide attributes for the
   * name value pairs displayed as select list options.
   * Tooltips may also be included.
   * Other attributes in the array elements will be ignored.
   *
   * @property objectArray
   * @type Array
   * @required
   */

  /**
   * The initial value of the select. Type must match the type of the attribute
   * identified by the valuePath option.
   *
   * @property value
   * @type Any
   * @required
   */
  value: null,

  /**
   * Name of the attribute in the objectArray to be used for the
   * select list's option value.
   *
   * @property valuePath
   * @type String
   * @required
   */

  /**
   * Name of the attribute in the objectArray to be used for the
   * select list's option name or display text.
   *
   * @property namePath
   * @type String
   * @required
   */

  /**
   * Indicates if icons should be rendered.
   *
   * @property icon
   * @type Boolean
   * @default false
   */
  icon: false,

  /**
   * Indicates if tooltips should be rendered for the options.
   *
   * @property tooltip
   * @type Boolean
   * @default false
   */
  tooltip: false,

  /**
   * Name of the attribute in the objectArray to be used for the
   * select list's tooltip.  If null, no tooltip will be
   * generated.
   *
   * @property tooltipPath
   * @type String
   * @default null
   */
  tooltipPath: null,

  /**
   * Whether to render a button to clear the selection.
   *
   * @property allowClear
   * @type Boolean
   * @default false
   */
  allowClear: false,

  /**
   * Whether to render the search input.
   *
   * @property searchEnabled
   * @type Boolean
   * @default true
   */
  searchEnabled: true,

  /**
   * Whether to disable the select.
   *
   * @property disabled
   * @type Boolean
   * @default false
   */
  disabled: false,

  /**
   * Whether to close the selection list after a selection has been made.
   *
   * @property closeOnSelect
   * @type Boolean
   * @default true
   */
  closeOnSelect: true,

  /**
   * The string to display when no option is selected.
   *
   * @property placeholder
   * @type String
   * @default 'Select one option'
   */
  placeholder: "Select one option",

  /**
   * Form label for select list
   *
   * @property label
   * @type String
   * @default null
   */
  label: null,

  ariaLabel: Ember.computed('label', function () {
    return this.get('label');
  }),

  /**
   * Indicates whether to allow the user to enter a new option
   * not contained in the select list.
   *
   * @property create
   * @type Boolean
   * @default false
   */
  create: false,

  /**
   * The component to render
   *
   * @property theComponent
   * @type Ember.computed
   * @return String
   */
  theComponent: Ember.computed('create', function () {
    return this.get('create') ? 'power-select-with-create' :
      'power-select';
  }),

  /**
   * Callback after value is updated, usually an action is passed.
   *
   * @method change
   */
  change() {},

  /**
   * The currently selected item in the codelist
   *
   * @property selectedItem
   * @type Ember.computed
   * @return PromiseObject
   */
  selectedItem: Ember.computed('value', function () {
    let value = this.get('value');

    return DS.PromiseObject.create({
      promise: this.get('codelist')
        .then(function (arr) {
          return arr.find((item) => {
            return item['codeId'] === value;
          });
        })
    });
  }),

  /**
   * codelist is an array of code objects re-mapped from the input 'objectArray'.
   * Values from the input object array are mapped according the path parameters
   * provided.
   *
   * @property codelist
   * @type Ember.computed
   * @return PromiseArray
   */
  codelist: Ember.computed('objectArray', function () {
    const objArray = this.get('objectArray');
    let inList = new Ember.RSVP.Promise(function (resolve, reject) {
      // succeed
      resolve(objArray);
      // or reject
      reject(new Error('Couldn\'t create a promise.'));
    });
    let codeId = this.get('valuePath');
    let codeName = this.get('namePath');
    let tooltip = this.get('tooltipPath');
    let outList = Ember.A();

    return DS.PromiseArray.create({
      promise: inList.then(function (arr) {
        arr.forEach(function (item) {
          let newObject = {
            codeId: item.get(codeId),
            codeName: item.get(codeName),
            tooltip: false
          };
          if(tooltip) {
            newObject.tooltip = item.get(tooltip);
          }
          outList.pushObject(newObject);
        });

        return outList;
      })
    });
  }),

  /**
   * Creates a new codelist entry. The codeId and codeName are both set to the
   * passed value.
   *
   * @method createCode
   * @param  {String} code The code
   * @return {Object}      Returns a new codelist object
   */
  createCode(code) {
    return {
      codeId: code,
      codeName: code,
      tooltip: false
    };
  },

  /**
   * Set the value on the select.
   *
   * @method setValue
   * @param {Object} selected The object with the value(codeName) to set.
   */
  setValue(selected) {
    let val = selected ? selected.codeId : null;
    this.set('value', val);
    this.change();
  },
  actions: {
    // do the binding to value
    setValue(selected) {
      this.setValue(selected);
    },
    create(selected) {
      let code = this.createCode(selected);

      this.get('codelist')
        .pushObject(code);
      this.setValue(code);
    }
  }

});
