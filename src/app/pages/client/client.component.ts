import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ClientModel } from '../../models/client.model';
import { ClientsService } from '../../services/clients.service';
import Swal from 'sweetalert2';
import {BsDatepickerConfig, DateFormatter} from 'ngx-bootstrap/datepicker';
import { BsLocaleService, defineLocale, itLocale } from 'ngx-bootstrap';
import {formatDate, DatePipe} from '@angular/common';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  @ViewChild("datePicker") datePicker: Input;
  client: ClientModel = new ClientModel();
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  constructor(
    private clientsService: ClientsService,
    private route: ActivatedRoute,
    private bsDatepickerConfig:BsDatepickerConfig,
    private datePipe: DatePipe
  ) {

    this.bsDatepickerConfig.dateInputFormat = 'DD/MM/YYYY';
   }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {

      this.clientsService.getClient(id)
        .subscribe((resp: ClientModel) => {
          this.client.Id = id;
          this.client.Nombre = resp.Nombre;
          this.client.Nombre = resp.Apellido;
          this.client.FechaNacimiento = this.datePipe.transform(resp.FechaNacimiento, 'dd/MM/yyyy');//formatDate(resp.FechaNacimiento, 'dd/MM/yyyy','es');
          this.client.Edad= resp.Edad;
        });

    }
  }


  private transformDateToString(value): any {
    if (!value) {
      return value;
    }
    return `${value.slice(8, 10)}${value.slice(5, 7)}${value.slice(0, 4)}`;
  }

  private transformStringToDate(value): any {
    if (!value) {
      return value;
    }
    const year = value.slice(4, 10);
    const month = value.slice(2, 4);
    const date = value.slice(0, 2);
    return new Date(year, month - 1, date);
  }

  guardar(form: NgForm) {

    if (form.invalid) {
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();


    let peticion: Observable<any>;
    if (this.client.Id) {
      peticion = this.clientsService.putClient(this.client);
    } else {
      peticion = this.clientsService.postClient(this.client);
    }

    peticion.subscribe(resp => {

      Swal.fire({
        title: this.client.Nombre,
        text: 'Se actualizó correctamente',
        type: 'success'
      });

    });



  }

  calcularEdad(event) {
    if (this.client.FechaNacimiento) {
      const convertAge = new Date(this.client.FechaNacimiento);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.client.Edad = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    }
  }

}
