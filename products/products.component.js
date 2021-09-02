const Products = {
	data: function () {
		return {
			products: [],
			// frase: null,
		};
	},
	firestore() {
		return {
			products: products$,
		};
	},
	computed: {
		username() {
			// We will see what `params` is shortly
			return this.$route.params.username;
		},
	},

	template: `
	<div class="row">
		<div class="col-sm-6">
			<ul class="list-group">
			    <li class="list-group-item"><router-link class="nav-link" to="/products/1">1</router-link></li>
			    <li class="list-group-item"><router-link class="nav-link" to="/products/2">2</router-link></li>
			    <li class="list-group-item"><router-link class="nav-link" to="/products/3">3</router-link></li>
			</ul>
		</div>
		<div class="col-sm-6">
			<router-view></router-view>
		</div>
	</div>`,
};
