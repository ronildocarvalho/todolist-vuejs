import Vue from 'vue';
export default Vue.component('form-tarefa', {
    template:
        /*html*/

        `
      
     <form>
       <v-container grid-list-md>
         <h2>{{ indiceEdicao != null ? 'Editar Tarefa' : 'Nova Tarefa'}}</h2>
          <v-layout row wrap>

            <v-flex xs12 sm4>

          <!--   <label for="tarefa">Nome Tarefa</label> -->
                <v-text-field 
                    filled
                    :loading = "carregando"
                    name="titulo"
                    v-validate="'required'"
                    type="text" 
                    id="tarefa" 
                    label="Titulo da tarefa" 
                    v-model="task.titulo"
                    hint="Ex: Gerar build almoxarifado"
                    :error-messages="errors.collect('titulo')"
                >
                </v-text-field> 
            </v-flex>

            <v-flex xs12 sm4>
           <!--     <label for="descricao">Descrição</label> -->
                 <v-text-field 
                      filled
                      :loading = "carregando"
                      name="descricao"
                      v-validate="'required'"
                      type="text" 
                      id="descricao"  
                      label="Descrição da tarefa" 
                      v-model="task.descricao"
                      hint="Ex: Bla Bla Bla"
                      :error-messages="errors.collect('descricao')"
                 >
                 </v-text-field>
            </v-flex>

            <v-flex xs12 sm4>
            <v-menu
            v-model="datepicker"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
            >
            <template v-slot:activator="{on}">
             <v-text-field 
                      filled
                      :loading = "carregando"
                      name="data"
                      v-validate="'required'"
                      type="date" 
                      id="data" 
                      label="Prazo da Conclusão" 
                      v-model="task.prazo"
                      hint="Ex: 20/02/2019"
                      :error-messages="errors.collect('data')"
                      v-on="on"
                      readonly
                >
            </v-text-field>

            </template>
                <v-date-picker
                    v-model="task.prazo"
                    @input="datepicker = false"
                    >
                </v-date-picker>
            </v-menu>    
             <!--   <label for="data">Data</label> -->
               
            </v-flex>

          </v-layout>

          <v-layout>
             <v-btn 
                :loading = "carregando"
                color="success" 
                type="button" 
                @click ="salvar">
                Salvar
                 <v-icon>mdi-saved</v-icon>
              </v-btn>
              
              <v-btn  
                 :loading = "carregando"
                 color="error" 
                 type="button" 
                 @click ="cancelar">
                 <v-icon>mdi-delete</v-icon>
                 Cancelar
              </v-btn>
          </v-layout>

             
       </v-container> 
       
    </form>
   
   `
    ,

    data() {
        return {
           datepicker:false,
           carregando :false

        }

    },

    methods: {
     async   salvar() {
           this.carregando= true;
         if(await  this.$validator.validate()){
             this.$store.dispatch('tarefas/salvarTarefa', this.task);
             this.$store.dispatch('alertas/showSuccessSnackbar','Tarefa salva com sucesso!')
             this.cancelar();
             this.carregando = false;
              

         }else{
             this.$store.dispatch('alertas/showErrorSnackbar', 'Preencha todos os campos!') 
             this.carregando = false;
         }

          


        },
        cancelar() {
            this.task = {};
            this.$store.dispatch('tarefas/limparEdicao');
            this.$emit("voltar");

        }

    },
    computed: {
        indiceEdicao() {
            return this.$store.state.tarefas.indiceEdicao;
        },
        task: {
            get() {
                return this.$store.getters['tarefas/getTarefaEdicao'];
            },
            set() {

            }
        }
    }

})