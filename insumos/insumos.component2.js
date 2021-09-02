const Insumos = {
	data: function () {
		return {
			insumos: [],
			// frase: null,
		};
	},
	firestore() {
		return {
			insumos: insumos$.orderBy("nombre"),
		};
	},
	methods: {
		borrar(insumo) {
			const id = insumo[".key"];
			console.log(insumo[".key"]);
			insumos$.doc(id).delete();
		},

		editar(insumo) {
			const id = insumo[".key"];
			console.log(insumo[".key"]);
			this.$router.push({
				name: "insumo",
				params: { id: id },
			});
		},
	},
	// <li class="list-group-item" v-for="insumo in insumos">
	//   	<router-link class="nav-link" :to="{name:'insumo',params:{id:1}}">
	//   		{{insumo.nombre}}
	//   	</router-link>
	//   </li>
	template: `
<div class="row">
	<div class="col-sm-10">
		<router-link
			:to="{name:'insumo.nuevo'}"
			tag="button"
			class="btn btn-primary"
			>Nuevo
		</router-link>
		<hr />
		<ul class="list-unstyled">
			<li class="media" v-for="insumo in insumos">
				<img
					class="mr-3"
					:src="insumo.imagen"
					alt="Generic placeholder image"
				/>
				<div class="media-body">
					<h5 class="mt-0 mb-1">{{insumo.nombre}}</h5>
					{{insumo.notas}}
					<small :title="insumo._updated.toDate() | fechaLarga"
						><small
							>Actualizado {{insumo._updated.toDate() |
							hace}}</small
						></small
					>
				</div>
			</li>
		</ul>
	</div>

	<div class="col-sm-2">
		<router-view></router-view>
	</div>
</div>

`,
};
