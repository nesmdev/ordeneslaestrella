 const Product = {
	data: function () {
		return {
			products: [],
			// frase: null,
		};
	},
	// firestore() {
	// 	return {
	// 		products: products$,
	// 	};
	// },
	computed: {
		username() {
			// We will see what `params` is shortly
			return this.$route.params.username;
		},
	},

	template: `
<div>Esto es un producto...{{$route.params.id}}</div>
	`
	,
};