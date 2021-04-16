import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from './client.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientsService {
  allClients: Client[] = [];
  clientId: string;

  clientAddingStatus = new Subject<boolean>();
  clientsChanged = new Subject<boolean>();
  foundClientsChanged = new Subject<Client[]>();
  // sendNewClientId = new Subject<string>();

  constructor(private http: HttpClient) {}

  getClients() {
    return this.allClients;
  }

  getClientById(clientId: string) {
    return this.allClients.find((client) => client.id === clientId);
  }

  checkClientByPhoneAndReturnId(newClient: Client) {
    const foundClient = this.allClients.find(
      (client) => client.phone === newClient.phone
    );
    if (!foundClient) {
      return '';
    } else if (foundClient) {
      return foundClient.id;
    }
  }

  addClientLocaly(newClient: Client) {
    this.allClients.push(newClient);
    this.clientAddingStatus.next(true);
    this.clientsChanged.next(true);
  }

  findClient(search: string) {
    this.foundClientsChanged.next(this.allClients.filter(client => client.name.toLowerCase() == search.toLowerCase() || client.phone == +search));
  }

  addClient(newClient: Client) {
    return this.http.post(
      'https://cashier-v1-b2d37-default-rtdb.firebaseio.com/clients.json',
      newClient
    );
  }

  loadClients() {
    this.http
      .get('https://cashier-v1-b2d37-default-rtdb.firebaseio.com/clients.json')
      .pipe(
        map((resData): Client[] => {
          const resClients: Client[] = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              resClients.push({ ...resData[key], id: key });
            }
          }
          return resClients;
        })
      )
      .subscribe(
        (resClients: Client[]) => {
          this.allClients = resClients;
          this.clientsChanged.next(true);
        },
        (error) => {
          console.log(error);
          this.clientsChanged.next(false);
        }
      );
  }
}
