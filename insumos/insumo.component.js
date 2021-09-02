const Insumo = {
	data: function () {
		return {
			id: null,
			insumo: {},
			mostrar: true,
			actualizado: null,
			// frase: null,
		};
	},
	// firestore() {
	// 	return {
	// 		insumos: insumos$,
	// 		// insumo:insumos.doc(id)
	// 	};
	// },

	mounted() {
		const id = this.$route.params.id;

		if (id) {
			this.$binding("insumo", insumos$.doc(this.$route.params.id));
			this.id = id;
			this.actualizado = this.insumo._updated;
			console.log(this.insumo._updated);
		}
	},

	computed: {
		// id() {
		// 	// We will see what `params` is shortly
		// 	return this.$route.params.id;
		// },
		title() {
			return !this.id ? "Nuevo insumo" : "Editar insumo";
		},
	},
	methods: {
		volverSi: function (evt) {
			if (evt) evt.preventDefault();
			if (this.$route.name !== "insumos") {
				this.$router.push({ name: "insumos" });
			}
		},

		crear() {
			console.log(this.insumo);

			insumos$
				.add({
					nombre: this.insumo.nombre.toUpperCase(),
					nombres: this.getNombres(this.insumo.nombres),
					_updated: new Date(),
					_created: new Date(),
				})
				.then((done) => {
					this.volverSi();
				});
		},

		getNombres(nombres) {
			return nombres
				.toUpperCase()
				.split(",")
				.map((n) => n.trim())
				.filter((s) => s)
				.filter((s, i, arr) => arr.indexOf(s) !== -1)
				.sort()
				.join(", ");
		},

		actualizar() {
			console.log(this.insumo);
			insumos$
				.doc(this.id)
				.update({
					nombre: this.insumo.nombre.toUpperCase(),
					nombres: this.getNombres(this.insumo.nombres),
					_updated: new Date(),
				})
				.then((done) => {
					this.volverSi();
				});

			// insumos$({
			// 	...this.insumo,
			// 	_created: new Date(),
			// });
		},
	},

	template: `
	<div>
		<b-modal v-model="mostrar" @ok="volverSi" @cancel="volverSi" @hidden="volverSi" :title="title" hide-footer>
		  <input v-model="id" type="hidden"/>
		  <input v-model="insumo.nombre" type="text" class="form-control" placeholder="Nombre"/>
		  <input v-model="insumo.nombres" type="text" class="form-control" placeholder="Nombres"/> 
		  <button v-if="!id" class="btn btn-primary" @click="crear">Guardar</button>
		  <button v-if="id" class="btn btn-success" @click="actualizar">Guardar</button>
		  <span v-if="id" :title="insumo._updated.toDate() | fechaLarga">Se actualizó {{insumo._updated.toDate() | hace}}</span>
		</b-modal>
	</div>
	`,
};
