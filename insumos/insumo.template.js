const insumoTemplate=`<div>
	<b-modal
		v-model="mostrar"
		@ok="volverSi"
		@cancel="volverSi"
		@hidden="volverSi"
		:title="title"
		hide-footer
		><form>
			<div class="form-group">
				<input v-model="id" type="hidden" />
				<label>Nombre</label>
				<input
					v-model="insumo.nombre"
					type="text"
					class="form-control"
					placeholder="Nombre"
				/>
				<!-- 	<small id="emailHelp" class="form-text text-muted"
					>We'll never share your email with anyone else.</small
				> -->
			</div>
			<div class="form-group">
				<label>Unidad de Medida</label>
				<v-select
					v-model="insumo.umedida"
					:options="umedidas"
				></v-select>
			</div>
			<div class="form-group">
				<label for="otros_nombres">Otros nombres</label>
				<div class="row">
					<div class="col-sm-6">
						<input type="text" placeholder="Otro nombre" />
					</div>
					<div class="col-sm-6">
						<v-select
							:options="proveedores"
							label="nombre"
							:reduce="proveedor=>proveedor['.key']"
						></v-select>
					</div>
				</div>
			</div>

			<button v-if="!id" class="btn btn-primary" @click="crear">
				Guardar
			</button>
			<button v-if="id" class="btn btn-success" @click="actualizar">
				Guardar
			</button>
			<span v-if="id" :title="insumo._updated.toDate() | fechaLarga"
				>Se actualizó {{ insumo._updated.toDate() | hace }}</span
			>
		</form>
	</b-modal>
</div>
`;