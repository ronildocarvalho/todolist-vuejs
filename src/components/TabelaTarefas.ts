import Vue from 'vue';
import TarefaService from '../service/TarefaService';
import FormatterUtil from '../util/formatterUtil';



export default Vue.component("tabela-tarefas", {

    template:
   /* html */ `
    <v-simple-table>
    <thead>
    <th>Titulo da tarefa</th>
    <th>Descrição</th>
    <th>Prazo</th>
    <th>Finalizado</th>
    </thead>

    <tbody>
     <tr v-for="(tarefa, i) in tascks">
         <td>{{tarefa.titulo}}</td>
         <td>{{tarefa.descricao}}</td>
         <td>{{FormatterUtil.formatarData(tarefa.prazo)}}</td>
         <td>
            <input type="checkbox"  v-model="tarefa.finalizado" @change="marcarTarefa">
         </td>
         <v-tooltip top>

            <template v-slot:activator="{on}">
            <v-btn text icon v-on="on" @click="visualizar(i)" color="blue">
              <v-icon>mdi-eye</v-icon>
            </v-btn>

            </template>
            <span> Visualizar Tarefa</span>
         </v-tooltip>

         <v-tooltip top>

            <template v-slot:activator="{on}">
               <v-btn text icon v-on="on" @click="editar(i)" color="green">
               <v-icon>mdi-pencil</v-icon>
           </v-btn>
           </v-btn>

            </template>
            <span>Editar Tarefa</span>
         </v-tooltip>

         <v-tooltip top>

            <template v-slot:activator="{on}">
              <v-btn text icon v-on="on" @click="remover(i)" color="red">
              <v-icon>mdi-delete</v-icon>
           </v-btn>
           </v-btn>

            </template>
            <span>Deletar Tarefa</span>
         </v-tooltip>



         <td>
          
         </td>
          <td>
          
         </td>
         <td>
          
         </td>

     </tr>
    </tbody>


</v-simple-table>
    
`
    ,
    data() {
        return {

            FormatterUtil: FormatterUtil
        }
    },

    methods: {

        marcarTarefa() {
            TarefaService.atualizarLista(this.tascks);

        },
        visualizar(i: number) {
            this.$router.push({
                name: 'detalhe', params: { tarefaSelecionada: this.tascks[i] }
            });
        },
        editar(i: number) {
            //editar do vuex
            this.$store.dispatch('tarefas/editar', i);
            this.$emit('editar');
        },
        remover(i: number) {
            if (confirm('Confirma remover?')) {
                this.$store.dispatch('tarefas/remover', i);

                this.$store.dispatch('alertas/showSnackbar', {
                    message: 'Tarefa  removida com sucesso!',
                    color: 'success'
                })
            }

        }
    },

    mounted() {
        this.$store.dispatch('tarefas/carregarTarefas')
    },

    computed: {
        tascks: function () {
            return this.$store.state.tarefas.tarefas;
        }
    }

});
