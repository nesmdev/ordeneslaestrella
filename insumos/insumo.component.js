const Insumo = {
	data: function () {
		return {
			id: null,
			insumo: { onombres: [] },
			mostrar: true,
			actualizado: null,
			umedidas: ["Kilogramo", "Litro", "Unidad"],
			proveedores: [],
			imagenValida: false,
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
	firestore() {
		return {
			proveedores: proveedores$,
		};
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
		agregarNombre() {
			this.insumo.onombres.push({
				nombre: "",
				proveedor: "",
			});
		},
		enviar() {
			console.log(this.insumo);
		},
		mostrarImagen() {
			try {
				this.imagenValida = new URL(this.insumo.imagen);
			} catch (e) {
				this.imagenValida = false;
			}
			console.log(this.insumo.imagen);
		},
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
	<b-modal
		v-model="mostrar"
		@ok="volverSi"
		@cancel="volverSi"
		@hidden="volverSi"
		:title="title"
		hide-footer
		><form @submit.prevent="enviar">
			<div class="row">
				<div class="col-sm-12">
					<div class="form-group">
						<input v-model="id" type="hidden" />
						<label>Nombre</label>
						<input
							v-model="insumo.nombre"
							type="text"
							class="form-control"
							placeholder="Nombre"
							required
						/>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-sm-5">
					<div class="form-group">
						<label>Unidad de Medida</label>
						<v-select
							v-model="insumo.umedida"
							:options="umedidas"
							required
						></v-select>
					</div>
				</div>
				<div class="col-sm-7">
					<div class="form-group">
						<label>Imagen principal</label>
						<input
							type="url"
							v-model="insumo.imagen"
							class="form-control"
							@click="mostrarImagen"
							@keypress="mostrarImagen"
							@keyup="mostrarImagen"
						/>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12">
					<img
						:src="insumo.imagen"
						v-if="imagenValida"
						style="max-width: 100%; border-radius:5px"

					/>
				</div>
			</div>

			<div class="form-group" >
				<label for="otros_nombres">Otros nombres</label>
				<button type="button" class="btn btn-primary btn-sm" @click="agregarNombre">+</button>
				<div class="row" v-for="(value, key) in insumo.onombres">
					<div class="col-sm-6">
						<input
							v-model="insumo.onombres[key].nombre"
							type="text"
							placeholder="Otro nombre"
							class="form-control"
							required
						/>
					</div>
					<div class="col-sm-6">
						<v-select
							v-model="insumo.onombres[key].proveedor"
							placeholder="Proveedor"
							:options="proveedores"
							label="nombre"
							:reduce="proveedor=>proveedor['.key']"
						></v-select>
					</div>
				</div>
			</div>

			<button v-if="!id" class="btn btn-primary" @click="crear">
				Guardar
			</button>
			<button v-if="id" class="btn btn-success" @click="actualizar">
				Guardar
			</button>
			<span v-if="id" :title="insumo._updated.toDate() | fechaLarga"
				>Se actualizó {{ insumo._updated.toDate() | hace }}</span
			>
		</form>
	</b-modal>
</div>








	`,
};
