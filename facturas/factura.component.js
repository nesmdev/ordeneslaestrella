const Factura = {
	data: function () {
		return {
			proveedores: [],
			proveedor: {
				productos: [],
			},
			factura: {
				items: [],
			},
		};
	},
	firestore() {
		return { proveedores: proveedores$ };
	},

	methods: {
		agregarItem() {
			this.factura.items.push({
				nombre: null,
				precio: null,
				cantidad: null,
			});
		},

		borrarItem(key) {
			this.factura.items.splice(key, 1);
		},
		seleccionarProveedor(){
			const proveedor =this.factura.proveedor;
			
		}
	},
	template: `<form>
  <div class="form-group">
    <label>Proveedor</label>
    <v-select
      v-model="factura.proveedor"
      :options="proveedores"
      placeholder="Proveedor"
      label="nombre"
      @input="seleccionarProveedor"
    />
  </div>
  <div class="form-group">
    <label>Número</label>
    <input
      type="text"
      class="form-control"
      v-model="factura.numero"
      placeholder="Número"
    />
  </div>

 
 
    <button class="btn btn-primary btn-sm" type="button" @click="agregarItem" v-if="factura.proveedor">Agregar item</button>
    <hr/>
    <div class="div" v-for="(item, key) of  factura.items" >
    <div class="row">

      <div class="form-group col-sm-4">
        <label>Número</label>
        <v-select
          type="text"
 
          v-model="factura.items[key].nombre"
          :options="factura.proveedor.productos"
          placeholder="Item"
          label="nombre"
        />
      </div>

      <div class="form-group  col-sm-4">
        <label>Precio</label>
        <input
          type="number"
          class="form-control"
          v-model="factura.items[key].precio"
          placeholder="Precio"
        />
      </div>

      <div class="form-group  col-sm-4">
        <label>Cantidad</label>
        <input
          type="number"
          class="form-control"
          v-model="factura.items[key].cantidad"
          :options="proveedor.productos"
          placeholder="Cantidad"
        />
      </div>
      </div>
    </div>
 

  <button type="submit" class="btn btn-primary">Submit</button>
</form>
`,
};
Vue.component("factura-form", Factura);
