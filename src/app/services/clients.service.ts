import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientModel } from '../models/client.model';
import { map, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClientsService {


  constructor(
    private http: HttpClient
  ) { }

  
  postClient( client: ClientModel ) {

    return this.http.post<any>(environment.addresses.clients.postClient, client)
            .pipe(
              map( (resp: any) => {
                client.Id = resp.name;
                return client;
              })
            );

  }

  putClient( client: ClientModel ) {

    const clientTemp = {
      ...client
    };

    delete clientTemp.Id;

    return this.http.put(environment.addresses.clients.putClient + `${ client.Id }.json`, clientTemp);


  }

  deleteClient( id: string ) {

    return this.http.delete(environment.addresses.clients.deleteClient +`${ id }.json`);

  }

  getClient( id: string ) {
    return this.http.get(environment.addresses.clients.getClient+`${ id }.json`);
  }

  getClients() {
    return this.http.get(environment.addresses.clients.getClients)
            .pipe(
              map( this.createArray ),
              delay(0)
            );
  }

  private createArray( clientsObj: object ) {

    const clients: ClientModel[] = [];

    Object.keys( clientsObj ).forEach( key => {

      const client: ClientModel = clientsObj[key];
      client.Id = key;

      clients.push( client );
    });


    return clients;

  }
}
