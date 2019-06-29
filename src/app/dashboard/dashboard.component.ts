import { Component, OnInit } from '@angular/core';

//import { Observable } from 'rxjs/Observable';
 
import { DadosService } from './dados.service';

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private dados: any;

  constructor(private dadosService: DadosService) { }

  ngOnInit() {
    this.dadosService.obterDados().subscribe(
      dados =>{
        this.dados = dados;
        this.init();
      });    
  }

  init(): void{

    if(typeof(google) !== 'undefined'){
      google.charts.load('current', {'packages':['corechart']});
      setTimeout(() => {
        google.charts.setOnLoadCallback(this.exibirGraficos());
      }, 1000);
    }
  }

  exibirGraficos(): void{
    this.exibirPieChart();
    this.exibir3dPieChart();
    this.exibirBarChart();
  }

  exibirPieChart(): void{
    const el = document.getElementById('pie_chart');
    const chart = new google.visualization.PieChart(el);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  exibir3dPieChart(): void{
    const el = document.getElementById('3d_pie_chart');
    const chart = new google.visualization.PieChart(el);
    const opcoes = this.obterOpcoes();

    opcoes['is3D'] = true;
    chart.draw(this.obterDataTable(), opcoes);
  }


  exibirBarChart(): void{
    const el = document.getElementById('bar_chart');
    const chart = new google.visualization.BarChart(el);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  

  obterDataTable(): any{
    const data = new google.visualization.DataTable();

    data.addColumn('string', 'Mês');
    data.addColumn('number', 'Quantidade');
    data.addRows(this.dados);

    return data;
  }

  obterOpcoes(): any{
    return {
      'title': 'Quantidade de cadastros do primeiro semestre',
      'width': 450,
      'height': 500
    };
  }

}
