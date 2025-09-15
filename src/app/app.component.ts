import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BaseComponent } from './shared/global/base/base.component';
import { ClientService } from './shared/services/client.service';
import { takeUntil } from 'rxjs';
import { NgIf } from '@angular/common';
import { Client } from './shared/models/client.model';
import { ChangeDataComponent } from './features/change-data/change-data.component';
import { HomeComponent } from './features/home/home.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
