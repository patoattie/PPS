import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {}

}
