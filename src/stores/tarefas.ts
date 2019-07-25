import { Module } from 'vuex';
import TarefaService from './../service/TarefaService';

const module: Module<any, any> = {
    namespaced: true,
    state: {
        tarefas: [],
        indiceEdicao: null
    },
    mutations: {
        mutationsTarefas(state, Lista) {
            state.tarefas = Lista;
        },
        mutationsIndiceEdicao(state, index) {
            state.indiceEdicao = index;
        },
        mutationsSalvaTarefa(state, task) {
            state.tarefas[state.indiceEdicao] = task;
        },
        mutationsCadastraTarefa(state, task) {
            state.tarefas.push(task);
        },
        mutationsRemover(state, index) {
            state.tarefas.splice(index, 1);
        }
    },
    actions: {
        async  carregarTarefas(context) {
            let tarefas = await TarefaService.buscaTodos();
            context.commit('mutationsTarefas', tarefas)
        },
        editar(context, index) {
            context.commit('mutationsIndiceEdicao', index);
        },
        limparEdicao(context) {
            context.commit('mutationsIndiceEdicao', null);
        },
        salvarTarefa(context, task) {
            if (context.state.indiceEdicao == null) {
                context.commit('mutationsCadastraTarefa', task);
            } else {
                context.commit('mutationsSalvaTarefa', task);

            }
            TarefaService.atualizarLista(context.state.tarefas);
        },
        remover(context, index) {
            context.commit('mutationsRemover', index);
            TarefaService.atualizarLista(context.state.tarefas);

        }


    },
    getters: {
        getTarefaEdicao(state) {

            if (state.indiceEdicao != null) {
                return state.tarefas[state.indiceEdicao];
            }
            return {}
        }

    }
}

export default module;