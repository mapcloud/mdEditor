import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createMapLayer from 'mdeditor/tests/helpers/create-map-layer';

moduleForComponent('leaflet-draw', 'Integration | Component | leaflet draw', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('layers', createMapLayer(2));

  // Template block usage:
  this.render(hbs`
    {{#leaflet-draw lat=0 lng=0 zoom=2}}
      {{!-- Specify child layer components here --}}
      {{#layer-group name="Terrain" baselayer=true default=true}}
        {{tile-layer url="http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png" attribution=mapAttribution}}
      {{/layer-group}}

      {{layer-control}}
    {{/leaflet-draw}}
  `);

  assert.equal(this.$().text().trim(), '+- Terrain3000 km2000 miLeaflet');
});
