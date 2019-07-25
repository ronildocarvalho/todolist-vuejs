import Vue from 'vue';
import FormatterUtil from '../util/formatterUtil';

export default Vue.component('Detalhe', {
    template:
        /*html*/
        `
     <div>
        <h1>Detalhe Tarefa</h1>
        <h1> Titulo da tarefa :  {{tarefaSelecionada.Titulo}} </h1>
        <p> Data Prazo :  {{FormatterUtil.formatarData(tarefaSelecionada.prazo)}} </p>
        <p> Descrição :  {{tarefaSelecionada.descricao}} </p>
        <p> Situação da tarefa :  {{tarefaSelecionada.finalizado == true ? 'Finalizado' : 'Aberta'}} </p>
       
     </div>       
    `
    ,

    props: {
        tarefaSelecionada: {}
    },
    data(){
        return{
            FormatterUtil: FormatterUtil
        }
    }
});