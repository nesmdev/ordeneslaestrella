// 0. If using a module system (e.g. via vue-cli), import Vue and VueRouter
// and then call `Vue.use(VueRouter)`.

// 1. Define route components.
// These can be imported from other files

// Vue.use(VueFirestore)

const Foo = { template: "<div>foo</div>" };
const Bar = { template: "<div>bar</div>" };
const Button = {
	data: function () {
		return {
			count: 0,
		};
	},
	template:
		'<button v-on:click="count++">You clicked me {{ count }} times.</button>',
};

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
	{ path: "/foo", component: Foo },
	{ path: "/bar", component: Bar },
	{ path: "/button", component: Button },
	{ path: "/fire", component: TestFire },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
	routes, // short for `routes: routes`
});

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
 
const app = new Vue({
	router,
 
}).$mount("#app");

// Now the app has started!
