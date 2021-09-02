const Proveedores = {
	data: function () {
		return {
			proveedores: [],
			// frase: null,
			// mostrar:false
		};
	},
	firestore() {
		return {
			proveedores: proveedores$.orderBy("nombre"),
		};
	},
	methods: {
		borrar(proveedor) {
			const id = proveedor[".key"];
			console.log(proveedor[".key"]);
			proveedores$.doc(id).delete();
		},

		editar(proveedor) {
			const id = proveedor[".key"];
			console.log(proveedor[".key"]);
			this.$router.push({
				name: "proveedor",
				params: { id: id },
			});
		},
	},
	// <li class="list-group-item" v-for="proveedor in proveedores">
	//   	<router-link class="nav-link" :to="{name:'proveedor',params:{id:1}}">
	//   		{{proveedor.nombre}}
	//   	</router-link>
	//   </li>
	template: `
	<div class="row">
		<div class="col-sm-10">
			<router-link 
				:to="{name:'proveedor.nuevo'}" tag="button" 
				class="btn btn-primary">Nuevo
			</router-link>
			<ul class="list-group">
		
			    <li class="list-group-item" v-for="proveedor of proveedores">

			    <b>{{proveedor.nombre}}</b><br/>
			    <small><i>{{proveedor.descripcion}}</i></small>
			    <br/>
			    <small :title="proveedor._updated.toDate() | fechaLarga"><small>Actualizado {{proveedor._updated.toDate() | hace}}</small></small>
				    <div class="btn-group" role="group" aria-label="Basic example" style="float:right">
 
					  <button type="button" class="btn btn-sm btn-success" @click="editar(proveedor)">
					  	<i class="far fa-pen"></i>
					  </button>
					  <button type="button" class="btn btn-sm btn-danger" @click="borrar(proveedor)">
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
