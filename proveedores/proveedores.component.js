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
			const eliminar = confirm("¿Eliminar proveedor?");
			if (!eliminar) return false;
			const id = proveedor[".key"];
			console.log(proveedor[".key"]);
			proveedores$.doc(id).delete();
		},

		editar(proveedor) {
			const id = proveedor[".key"];
			console.log(proveedor[".key"]);
			this.$router.push({
				name: "proveedor.editar",
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
 
		 

			    <div class="card" style="width: 18rem;" v-for="proveedor in proveedores">
  <img class="card-img-top" :src="proveedor.logo" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">{{proveedor.nombre}}</h5>
    <p class="card-text">{{proveedor.descripcion}}</p>
    <small :title="proveedor._updated.toDate() | fechaLarga"><small>Actualizado {{proveedor._updated.toDate() | hace}}</small></small>
    <div class="btn-group" role="group" aria-label="Basic example" style="float:right">
 
					  <button type="button" class="btn btn-sm btn-success" @click="editar(proveedor)">
					  	<i class="far fa-pen"></i>
					  </button>
					  <button type="button" class="btn btn-sm btn-danger" @click="borrar(proveedor)">
					  	<i class="far fa-trash-alt"></i>
					  </button>
					</div>
  </div>
</div>
 			 
		</div>

		<div class="col-sm-2">

			 <router-view></router-view>
		</div>
	</div>`,
};
