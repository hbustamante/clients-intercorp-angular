import { Component, OnInit } from '@angular/core';
import { ClientsService} from '../../services/clients.service';
import { ClientModel } from  '../../models/client.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  esperanzaVida:number = 80;
  clients: ClientModel[] = [];
  cargando = false;

  constructor(
    private clientsService:ClientsService
  ) { }

  ngOnInit() {

    this.cargando = true;
    this.clientsService.getClients()
      .subscribe( resp => {
        this.clients = resp;
        this.cargando = false;
      });

  }

  calcularPosibleMuerte(client:ClientModel) : Date{
    if (client ){
      var diferenciaEdad = this.esperanzaVida - client.Edad;
      var fechNac  =new Date(client.FechaNacimiento);
      var year = fechNac.getFullYear();
      var month: number = fechNac.getMonth();
      var day: number = fechNac.getDate();
      var c = new Date(year + diferenciaEdad, this.getRandomArbitrary(0,12)+ month, this.getRandomArbitrary(0,30)+day);
      return c;
    }
    
  }

  getRandomArbitrary(min, max) : number {
    return Math.random() * (max - min) + min;
  }

  deleteClient( client: ClientModel, i: number ) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ client.Nombre }`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ) {
        this.clients.splice(i, 1);
        this.clientsService.deleteClient( client.Id ).subscribe();
      }

    });
  }
}
