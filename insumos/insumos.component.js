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
				:to="{name:'insumo.nuevo'}" tag="button" 
				class="btn btn-primary">Nuevo
			</router-link>
			<ul class="list-group">
		
			    <li class="list-group-item" v-for="insumo of insumos">

			    <b>{{insumo.nombre}}</b> | <small><i>{{insumo.nombres}}</i></small><br/>
			    <small :title="insumo._updated.toDate() | fechaLarga"><small>Actualizado {{insumo._updated.toDate() | hace}}</small></small>
				    <div class="btn-group" role="group" aria-label="Basic example" style="float:right">
 
					  <button type="button" class="btn btn-sm btn-success" @click="editar(insumo)">
					  	<i class="far fa-pen"></i>
					  </button>
					  <button type="button" class="btn btn-sm btn-danger" @click="borrar(insumo)">
					  	<i class="far fa-trash-alt"></i>
					  </button>
					</div>
			    </li>
 			</ul>
		</div>

		<div class="col-sm-2">

			 <router-view></router-view>
		</div>
	</div>`,
};
