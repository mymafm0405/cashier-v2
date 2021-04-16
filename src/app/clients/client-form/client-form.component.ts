import { NgForm } from '@angular/forms';
import { ClientsService } from 'src/app/shared/clients.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  @ViewChild('clientForm', {static: false}) clientForm: NgForm;

  constructor(private clientsService: ClientsService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.clientsService.findClient(this.clientForm.value.search);
  }

  onShowClient() {
    this.clientsService.clientsChanged.next(true);
  }

}
