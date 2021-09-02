const Proveedor  = {
	data: function () {
		return {
			id: null,
			proveedor: { insumos:[]},
 
			actualizado: null,
 
			mostrar:true,
 
			insumos:[],}
 
	},
 
	mounted() {
		const id = this.$route.params.id;
		// insumos$.get().then(qs=>this.insumos=qs.docs.map(doc=>doc.data().nombre))
		this.insumos=[
               {".key":1,"nombre":"insumo 1"},
               {".key":2,"nombre":"insumo 2"},
			]
		// this.$binding("insumos", insumos$);
		if (id) {
			this.$binding("proveedor", proveedores$.doc(this.$route.params.id));
			
			this.id = id;
			this.actualizado = this.proveedor._updated.toDate();
			// console.log(this.actualizado);
		}
	},

	computed: {
 
		title() {
			return !this.id ? "Nuevo proveedor" : "Editar proveedor";
		},
	},
	methods: {
		volverSi: function (evt) {
			if (evt) evt.preventDefault();
			if (this.$route.name !== "proveedores") {
				this.$router.push({ name: "proveedores" });
			}
		},

		imprimir(){
			console.log("insumos",this.insumos)
			console.log("seleccionados",this.seleccionados)
		},

		crear() {
			// console.log(this.proveedor);

				// db.runTransaction(transaction=>{

				// 	return transaction.get($proveedores)
				// })

			proveedores$
				.add({
					nombre: this.proveedor.nombre.toUpperCase(),
						descripcion: this.proveedor.descripcion,
					_updated: new Date(),
					_created: new Date(),
				})
				.then((done) => {
					this.volverSi();
				});
		},
        getRandomID(){
        	const id =CryptoJS.MD5(+new Date()).toString();
        	return id;
        	// return {
        	// 	".key":id,
        	// 	_created:new Date(),
        	// 	_updated:new Date(),
        	// };
        },
       agregarInsumos(){
       	this.proveedor.insumos = this.proveedor.insumos ? this.proveedor.insumos:[];
       	this.proveedor.insumos.push({nombre:""})
       	console.log(this.proveedor)
       },
		actualizar() {
			console.log(this.proveedor);


			proveedores$
				.doc(this.id)
				.update({
					nombre: this.proveedor.nombre.toUpperCase(),
					descripcion: this.proveedor.descripcion,
					_updated: new Date(),
				})
				.then((done) => {
					this.volverSi();
				});

			// proveedores$({
			// 	...this.proveedor,
			// 	_created: new Date(),
			// });
		},
	},

	template: `
	<div>
		<b-modal v-model="mostrar" @ok="volverSi" @cancel="volverSi" @hidden="volverSi" :title="title" hide-footer>
		  <input v-model="id" type="hidden"/>
		  <input v-model="proveedor.nombre" type="text" class="form-control" placeholder="Nombre"/>
		  <input v-model="proveedor.descripcion" type="text" class="form-control" placeholder="Descripción"/> 
	      <div v-for="(insumo, index) in proveedor.insumos" :key="'insumo-'+index">
	        <input type="text" class="form-control"
	        	v-model="proveedor.insumos[index].nombre" />
	        <v-select 
	        	v-model="proveedor.insumos[index].unidad"
	        	:options="['Kilo','Litro', 'Unidad']"
	        />

	      </div>
	      <button @click="agregarInsumos">Agregar insumos</button>
		  <button v-if="!id" class="btn btn-primary" @click="crear">Guardar</button>
		  <button v-if="id" class="btn btn-success" @click="actualizar">Guardar</button>
		  <span v-if="id" :title="proveedor._updated.toDate() | fechaLarga">Se actualizó {{proveedor._updated.toDate() | hace}}</span>
		</b-modal>
	</div>
	`,
};
