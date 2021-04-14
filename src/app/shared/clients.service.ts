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

  constructor(private http: HttpClient) {}

  getClients() {
    return this.allClients;
  }

  getClientById(clientId: string) {
    return this.allClients.find((client) => client.id === clientId);
  }

  checkClientByPhone(newClient: Client): string {
    const foundClient = this.allClients.find(
      (client) => client.phone === newClient.phone
    );
    if (!foundClient) {
      this.addClient(newClient);
    } else if (foundClient) {
      return foundClient.id;
    }
  }

  addClient(newClient: Client) {
    this.http
      .post(
        'https://cashier-v1-b2d37-default-rtdb.firebaseio.com/clients.json',
        newClient
      )
      .subscribe(
        (res: { name: string }) => {
          this.allClients.push({ ...newClient, id: res.name });
          this.clientsChanged.next(true);
          this.clientAddingStatus.next(true);
          this.clientId = res.name;
        },
        (error) => {
          console.log(error);
        }
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
