const Insumo = {
	data: function () {
		return {
			id: null,
			insumo: { onombres: [] },
			insumos: [],
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
		console.log("id", id);
		this.$binding("proveedores", proveedores$);
		this.$binding("insumos", insumos$);
		console.log("insumos", this.insumos);
		if (id) {
			this.$binding("insumo", insumos$.doc(id));
			console.log("insumo", { ...this.insumo });
			this.id = id;
			this.actualizado = this.insumo._updated;
			console.log(this.insumo._updated);
		}
	},
	// firestore() {
	// 	return {
	// 		proveedores: proveedores$,
	// 	};
	// },

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
		eliminarNombre(key) {
			this.insumo.onombres.splice(key, 1);
		},
		agregarNombre() {
			this.insumo.onombres.push({
				nombre: "",
				proveedor: "",
			});
		},
		submit() {
			if (this.id) {
				this.actualizar();
			} else {
				this.crear();
			}
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

			const insumo = {
				...this.insumo,
				_created: new Date(),
				_updated: new Date(),
			};
			delete insumo[".key"]
			insumos$.add(insumo).then((done) => {
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

			const insumo = {
				...this.insumo,
				// _created: new Date(),
				_updated: new Date(),
			};
			delete insumo[".key"]
			insumos$
				.doc(this.id)
				.update(insumo)
				.then((done) => {
					this.volverSi();
				});
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
		><form @submit.prevent="submit">
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
						style="max-width: 100%; max-height:300px; border-radius:5px"

					/>
				</div>
			</div>
			<div class="form-group">
				<label for="notas">Descripción</label>
				<textarea class="form-control"   rows="3" v-model="insumo.descripcion"></textarea>
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
					<div class="col-sm-5">
						<v-select
							v-model="insumo.onombres[key].proveedor"
							placeholder="Proveedor"
							:options="proveedores"
							label="nombre"
							:reduce="proveedor=>proveedor['.key']"
						></v-select>
						
					</div>
					<div class="col-sm-1"><button type="button" class="btn btn-sm btn-danger" @click="eliminarNombre(key)">-</button></div>
					
				</div>
			</div>

			<button v-if="!id" class="btn btn-primary" type="submit">
				Guardar
			</button>
			<button v-if="id" class="btn btn-success" type="submit">
				Guardar
			</button>
			<span v-if="insumo._updated" :title="insumo._updated.toDate() | fechaLarga"
				>Se actualizó {{ insumo._updated.toDate() | hace }}</span
			>
		</form>
	</b-modal>
</div>








	`,
};
