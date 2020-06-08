import { Component } from '@angular/core';
import { PessoasService } from './services/pessoas.service'
import { Pessoa } from '../model/interfaces/pessoa.model';
import { Repository } from '../repository/repository';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  pessoas: any;
  listaPessoas: Pessoa[] = [] as Pessoa[];
  userLocation: any;
  exibirGrid = false;

  constructor(private pessoasService: PessoasService, 
              private geolocation: Geolocation) {}

  async ngOnInit(){
    this.pessoas = Repository.getPessoas;
    try{
      this.userLocation = (await this.geolocation.getCurrentPosition()).coords;
      this.listaPessoas = this.pessoasService.encontrarPessoasProximas(this.userLocation.latitude,this.userLocation.longitude);
    }
    catch{
      throw new Error('Houve um problema ao obter os dados de localização do usuário.');
    }
    
  }
  

}
