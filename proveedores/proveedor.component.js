const Proveedor = {
	data: function () {
		return {
			id: null,
			proveedor: { productos: [] },

			actualizado: null,

			mostrar: true,

			insumos: [],
		};
	},

	mounted() {
		const id = this.$route.params.id;
		// insumos$.get().then(qs=>this.insumos=qs.docs.map(doc=>doc.data().nombre))

		// this.$binding("insumos", insumos$);
		if (id) {
			this.$binding("proveedor", proveedores$.doc(this.$route.params.id));

			this.id = id;
			// this.actualizado = this.proveedor._updated.toDate();
			// console.log(this.actualizado);
		}
	},
	firestore() {
		return {
			insumos: insumos$,
		};
	},

	computed: {
		title() {
			return !this.id ? "Nuevo proveedor" : "Editar proveedor";
		},
	},
	methods: {
		cancelar(){
			this.$router.push("/proveedores");
		},
		onSubmit() {
			const proveedor = { ...this.proveedor };
			delete proveedor[".key"];
			proveedor._updated = new Date();
			console.log("proveedor", proveedor);
			if (this.id) {
				this.actualizar(this.id,proveedor);
			} else {
				proveedor._created = new Date();
				this.crear(proveedor);
			}
		},
		imageDefault(e) {
			e.target.src = "https://i.imgur.com/9Gw7q2s.png";
		},
		volverSi: function (evt) {
			if (evt) evt.preventDefault();
			if (this.$route.name !== "proveedores") {
				this.$router.push({ name: "proveedores" });
			}
		},

		imprimir() {
			console.log("insumos", this.insumos);
			console.log("seleccionados", this.seleccionados);
		},

		crear(proveedor) {
			// console.log(this.proveedor);

			// db.runTransaction(transaction=>{

			// 	return transaction.get($proveedores)
			// })
			console.log("crear",proveedor);
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
		getRandomID() {
			const id = CryptoJS.MD5(+new Date()).toString();
			return id;
			// return {
			// 	".key":id,
			// 	_created:new Date(),
			// 	_updated:new Date(),
			// };
		},
		// agregarInsumos() {
		// 	this.proveedor.insumos = this.proveedor.insumos
		// 		? this.proveedor.insumos
		// 		: [];
		// 	this.proveedor.insumos.push({ nombre: "" });
		// 	console.log(this.proveedor);
		// },
		agregarProducto() {
			this.proveedor.productos.push({
				nombre: null,
				insumo: null,
			});
		},
		eliminarProducto(key) {
			this.proveedor.productos.splice(key, 1);
		},
		actualizar(id, proveedor) {
			// console.log(this.proveedor);
			proveedores$
				.doc(id)
				.update(proveedor)
				.then(() => {
					this.volverSi();
				});

			// proveedores$({
			// 	...this.proveedor,
			// 	_created: new Date(),
			// });
		},

		crear(proveedor){
			proveedores$.add(proveedor).then(()=>{
				this.volverSi();
			})
		}
	},

	template: `
<div>
	<form @submit.prevent="onSubmit">
		<input v-model="id" type="hidden" />
		<div class="form-group">
			<label>Nombre</label>
			<input
				type="text"
				class="form-control"
				v-model="proveedor.nombre"
				required
				placeholder="Nombre del proveedor"
			/>
		</div>
		<div class="form-group">
			<label>Descripción</label>
			<textarea
				rows="3"
				class="form-control"
				v-model="proveedor.descripcion"
				required
				placeholder="Descripción"
			></textarea>
		</div>
		<div class="form-group">
			<label>Logo</label>
			<input
				type="url"
				class="form-control"
				v-model="proveedor.logo"
				placeholder="Logo del proveedor"
			/>
			<img
				:src="proveedor.logo"
				@error="imageDefault"
				style="max-width: 100%; max-height: 250px"
			/>
		</div>

		<div v-for="(producto, index) in  proveedor.productos ">
			<div class="form-group">
				<div class="row">
					<div class="col-sm-4">
						<div class="row">
							<div class="col-sm-12">
								<label>Producto</label>
								<input
									type="text"
									class="form-control"
									v-model="proveedor.productos[index].nombre"
									required
									placeholder="Producto"
								/>
							</div>

							<div class="col-sm-12">
								<label>Insumo</label>
								<v-select
									v-model="proveedor.productos[index].insumo"
									:options="insumos"
									label="nombre"
									required
									placeholder="Insumo"
								/>
							</div>
						</div>
					</div>
					<div class="col-sm-4">
							<label v-if="!proveedor.productos[index].insumo">
								Contenido 
							</label>
							<label v-if="proveedor.productos[index].insumo">
								Contenido ({{proveedor.productos[index].insumo.umedida}})
							</label>
								<input
									type="number"
									class="form-control"
									v-model="proveedor.productos[index].contenido"
									required
									step="0.01"
									placeholder="Contenido"
								/>

					</div>

					<div class="col-sm-3">
						<label>Imagen</label>
						<input
							class="form-control"
							type="url"
							v-model="proveedor.productos[index].imagen"
							placeholder="Imagen"
						/>
						<img
							style="max-width: 100%; max-height: 200px"
							:src="proveedor.productos[index].imagen"
						/>
					</div>
					<div class="col-sm-1">
						<button v-if="!proveedor.productos[index].imagen && !proveedor.productos[index].contenido && !proveedor.productos[index].insumo && !proveedor.productos[index].producto"
							type="button"
							class="btn btn-sm btn-danger"
							@click="eliminarProducto(index)"
						>
							X
						</button>
					</div>
				</div>
			</div>
			<hr />
		</div>
		<button
			type="button"
			class="btn btn-sm btn-primary"
			@click="agregarProducto"
		>
			Añadir producto
		</button>
		<span
			v-if="proveedor._updated"
			:title="proveedor._updated.toDate() | fechaLarga"
			>Se actualizó {{ proveedor._updated.toDate() | hace }}</span
		>
		<hr />
		<button type="submit" class="btn btn-primary">Submit</button>
		<button type="button" class="btn btn-danger" @click="cancelar">
			Cancelar
		</button>
	</form>
</div>


	`,
};
