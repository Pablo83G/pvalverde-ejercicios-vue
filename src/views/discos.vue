<template>
  <v-card class="elevation-7 ma-12 bg-color teal lighten-5" rounded="lg" max-width="700">

    <v-data-table :headers="headers" :items="discosConNombreArtista" class="elevation-1 ">
      <template v-slot:top>
        <v-toolbar class="bg-color teal darken-1" rounded="lg" flat>
          <v-toolbar-title>Discos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="teal darken-4" dark class="mb-2" v-bind="attrs" v-on="on">
                Añadir Disco
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="bg-color teal">
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field 
                      color="bg-colorteal-lighten-5"
                      v-model="editedItem.nombre" 
                      label="Nombre del Disco"
                      prepend-icon="mdi-account-multiple" 
                      hint="Introduce el nombre de un disco de artista seleccionado"
                      :rules="[rules.required, rules.counter]"
                      clearable variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select 
                      color="bg-colorteal-lighten-5" 
                      v-model="editedItem.artistaId" 
                      :items="artistas" 
                      item-text="nombre" 
                      item-value="id"
                      prepend-icon="mdi-account-multiple" 
                      label="Artista"
                      :rules="[rules.required]"
                      clearable variant="outlined"
                        ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="bg-color teal" text @click="close">Cancelar</v-btn>
                <v-btn color="bg-color teal" text @click="save">Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h6" max-width="450px">¿Estás seguro que deseas borrar este disco?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>
  
<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    rules: {
          required: value => !!value || 'Campo requerido.',
          counter: value => value.length <= 50 || 'Máximo 50 characters',
          },
    headers: [
      { text: 'Artista', align: 'start', sortable: false, value: 'nombreArtista', width: 150, },
      { text: 'Disco', align: 'start', sortable: false, value: 'nombre', width: 250 },
      { text: 'Acciones', value: 'actions', sortable: false, width: 20, }
    ],
    editedIndex: -1,
    editedItem: { nombre: '', artistaId: '' },
    defaultItem: { nombre: '', artistaId: '' }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Disco' : 'Editar Disco'
    },
    ...mapState(['discos', 'artistas']),

    discosConNombreArtista() {
      return this.discos.map(disco => {
        const artista = this.artistas.find(a => a.id === disco.artistaId)
        return {
          ...disco, //copia las propiedades de disco original y agregamos 'nombreArtista'
          //asigna el nombre del artista si no es null, si no asigna 'desconocido'
          nombreArtista: artista ? artista.nombre : 'Desconocido'
        }
      })
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    }
  },
  methods: {
    ...mapActions(['save_disco', 'update_disco', 'delete_disco']),

    initialize() {
      this.editedItem = { ...this.defaultItem }
      this.editedIndex = -1
    },

    editItem(item) {
    console.log('Entrando en editItem'); // Log para indicar que se ha llamado a editItem
    console.log('Elemento a editar:', item); // Log del elemento que se va a editar

    // Usar findIndex para encontrar el índice basado en el ID del disco
    this.editedIndex = this.discos.findIndex(disco => disco.id === item.id);
    console.log('Índice del elemento editado:', this.editedIndex); // Log del índice del elemento

    if (this.editedIndex !== -1) {
      this.editedItem = Object.assign({}, item);
      console.log('Elemento editado:', this.editedItem); // Log del elemento editado
      this.dialog = true;
      console.log('Dialogo de edición abierto:', this.dialog); // Log del estado del diálogo
    } else {
      console.log('Elemento no encontrado para editar');
    }
  },


    deleteItem(item) {
      this.editedIndex = this.discos.indexOf(item)
      // this.editedItem = { ...item }
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.delete_disco(this.editedItem.id)
      this.closeDelete()
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save() {
      if (this.editedIndex > -1) {
        console.log('Actualizando disco:', this.editedItem); // Log para actualización
        this.update_disco(this.editedItem)
      } else {
        console.log('Agregando nuevo disco:', this.editedItem); // Log para agregación
        this.save_disco(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style>
.headerTablaLight {
  font-size: 15px !important;
  color: #F3F7FB !important;
  font-weight: 600;

}

.tableSelecableDark {

  background-color: #0A1A26;

}
</style>