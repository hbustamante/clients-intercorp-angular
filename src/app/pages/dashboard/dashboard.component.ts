import { Component, OnInit } from '@angular/core';
import { ClientModel } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/services/clients.service';
import * as math from 'mathjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  clients: ClientModel[] = [];
  promedioEdad : number = 0;
  desviacionEdad : number = 0;
  constructor(
    private clientsService:ClientsService
  ) { }

  ngOnInit() {

    this.clientsService.getClients()
      .subscribe( resp => {
        this.clients = resp;
        this.calcularPromedio();
        this.calcularDesviacion();
      });
  }
  calcularDesviacion() {
    let edades:number[] = [];
    this.clients.forEach(cliente => {
      edades.push(cliente.Edad);
    });
    
    this.desviacionEdad = math.std(edades);
  }

  calcularPromedio() {
    let sumaEdad: number = 0;
    this.clients.forEach(cliente => {
      sumaEdad = sumaEdad + cliente.Edad;
    });

    this.promedioEdad = sumaEdad / this.clients.length;
  }

}
