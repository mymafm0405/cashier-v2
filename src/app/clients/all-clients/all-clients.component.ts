import { Subscription } from 'rxjs';
import { ClientsService } from 'src/app/shared/clients.service';
import { Client } from 'src/app/shared/client.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-all-clients',
  templateUrl: './all-clients.component.html',
  styleUrls: ['./all-clients.component.css']
})
export class AllClientsComponent implements OnInit, OnDestroy {
  allClients: Client[];

  clientsChangedSub: Subscription;
  foundClientsSub: Subscription;

  constructor(private clientsService: ClientsService) { }

  ngOnInit(): void {
    this.allClients = this.clientsService.getClients();

    this.clientsChangedSub = this.clientsService.clientsChanged.subscribe(
      (status: boolean) => {
        if (status) {
          this.allClients = this.clientsService.getClients();
        }
      }
    )

    this.foundClientsSub = this.clientsService.foundClientsChanged.subscribe(
      (clients: Client[]) => {
        this.allClients = clients;
      }
    )
  }

  ngOnDestroy() {
    this.clientsChangedSub.unsubscribe();
    this.foundClientsSub.unsubscribe();
  }

}
