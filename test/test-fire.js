const frases$ = db.collection("frases");
const TestFire = {
	data: function () {
		return {
			frases: [],
			frase: null,
		};
	},
	firestore() {
		return {
			frases: frases$,
		};
	},
	methods: {
		saveFrase: function () {
			db.collection("frases").add({
				id:Math.round(Math.random()*1000),
				text:this.frase,
				created:firebase.firestore.FieldValue.serverTimestamp()
			})
		},
	},
	template: `<div><h4>Frases...</h4>
	<p v-for="frase of frases">{{frase.text}}</p>
		<hr/>
  		<input class="form-control" type="text" v-model="frase"/>
  		<button v-on:click="saveFrase">Guardar</button>

  			<p v-for="frase in frases">{{frase.texto}}</p></div>
		`,
};
