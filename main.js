const routes = [
	{
		path: "/insumos",
		component: Insumos,
		name: "insumos",
		children: [
			{ path: "nuevo", component: Insumo, name: "insumo.nuevo" },
			{
				path: ":id",
				component: Insumo,
				name: "insumo",
			},
		],
	},

		{
		path: "/proveedores",
		component: Proveedores,
		name: "proveedores",
		children: [
			{ path: "nuevo", component: Proveedor, name: "proveedor.nuevo" },
			{
				path: ":id",
				component: Proveedor,
				name: "proveedor",
			},
		],
	},
];

const router = new VueRouter({
	routes, // short for `routes: routes`
	 mode: 'history',
	 base:"ordeneslaestrella"
});

Vue.filter("fechaLarga", function (value) {
	if (value) {
		const date = new Date(value);
		return moment(date).format("dddd D [de] MMMM [de] YYYY, h:mm:ss a");
	}
});
Vue.filter("hace", function (value) {
	if (value) {
		const date = new Date(value);
		return moment(date).fromNow();
	}
});

Vue.component('v-select', VueSelect.VueSelect);
const app = new Vue({
	router,
}).$mount("#app");
