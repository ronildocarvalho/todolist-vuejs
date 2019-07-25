import Tarefa from "../model/Tarefa";

export default class TarefaService {
 static buscaTodos():Array<Tarefa> {
      let tarefas = JSON.parse(localStorage.getItem("tarefas"));

        if(!tarefas){
            return[];
        }else{
            return tarefas;
        }
 }

  static cadastrar (tarefa : Tarefa){
    if(!tarefa.finalizado){
      tarefa.finalizado = false;
    }
    let cadastrados = TarefaService.buscaTodos();
    cadastrados.push(tarefa);
    localStorage.setItem("tarefas",JSON.stringify(cadastrados))
  }

  static atualizarLista(ListaTarefas: Array<Tarefa>){
    localStorage.setItem("tarefas",JSON.stringify(ListaTarefas))
  }
}
