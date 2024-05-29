<template>
  <v-data-table 
    :headers="headers" 
    :items="artistas" 
    class="elevation-7 ma-12 bg-color teal lighten-5"
    rounded="lg"
    max-width="700"
    >
    <template v-slot:top>
      <v-toolbar class="bg-color teal darken-1" flat rounded="lg">
        <v-toolbar-title ><v-strong>ARTISTAS</v-strong></v-toolbar-title>
        <v-divider class="mx-6" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="teal darken-4" dark class="mb-2" v-bind="attrs" v-on="on">
              AÑADIR ARTISTA
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="bg-color teal">
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text >
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field color="bg-colorteal-lighten-5"
                    
                    v-model="editedItem.nombre" 
                    prepend-icon="mdi-account-multiple" 
                    hint="Introduce el nombre de un artista o grupo de musical"
                    
                    :rules="[rules.required, rules.counter]"
                    label="Nombre del artista" 
                    clearable variant="outlined"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions >
              <v-spacer></v-spacer>
              <v-btn color="bg-color teal" text @click="close">
                Cancelar
              </v-btn>
              <v-btn color="bg-color teal" text @click="save">
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="450px">
          <v-card>
            <v-card-title class="text-h5" max-width="700px">¿Estás seguro que desea borrar este artista?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="bg-color teal" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="bg-color teal" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    rules: {
          required: value => !!value || 'Campo requerido.',
          counter: value => value.length <= 40 || 'Máximo 40 characters',
          },

    headers: [
      {
        text: 'Artista',
        align: 'start',
        sortable: false,
        value: 'nombre',
        width: 400,
      },
      {
        text: 'Acciones',
        value: 'actions',
        sortable: false,
        width: 30,
      },
    ],
    editedIndex: -1,
    editedItem: {
      nombre: '',
    },
    defaultItem: {
      nombre: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Artista' : 'Editar Artista'
    },
    //carga el estado state y lo actualiza con las modificaciones
    //en el array
    ...mapState(['artistas'])
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    ...mapActions(['save_artista', 'update_artista', 'delete_artista' ]),


    initialize() {
      this.editedItem = { ...this.defaultItem }
      this.editedIndex = -1
    },
    editItem(item) {
      // this.editedIndex = this.artistas.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      // this.dialog = true
      
      console.log('Entrando en editItem'); // Log para indicar que se ha llamado a editItem
      console.log('Elemento a editar:', item); // Log del elemento que se va a editar

      this.editedIndex = this.artistas.indexOf(item);
      console.log('Índice del elemento editado:', this.editedIndex); // Log del índice del elemento

      this.editedItem = Object.assign({}, item);
      console.log('Elemento editado:', this.editedItem); // Log del elemento editado

      this.dialog = true;
      console.log('Dialogo de edición abierto:', this.dialog); // Log del estado del diálogo

    },

    deleteItem(item) {
      this.editedIndex = this.artistas.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      // this.artistas.splice(this.editedIndex, 1)
      //última posicion(-1) borrar 1 elemento
      // this.delete_artista(this.editedIndex, 1)
      this.delete_artista(this.editedItem.id)
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
        console.log('Actualizando artista:', this.editedItem); 
        Object.assign(this.artistas[this.editedIndex], this.editedItem)
        this.update_artista(this.editedItem)
      } else {
        console.log('Agregando nuevo artista:', this.editedItem);
        //Esto es igual a === -1 si no se encuentra añadelo
        // this.artistas.push(this.editedItem)
        this.save_artista(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
