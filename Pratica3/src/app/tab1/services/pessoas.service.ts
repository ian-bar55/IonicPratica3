import { Injectable } from '@angular/core';
import { Repository } from 'src/app/repository/repository';
import * as geolib from 'geolib';
import { Pessoa } from '../../model/interfaces/pessoa.model';
import { Geo } from 'src/app/model/classes/geo.model';
import { GeoService } from './geo.service'

@Injectable({
  providedIn: 'root'
})

export class PessoasService {
  pessoas: any;

  constructor(private geoService: GeoService) { }

  ngOnInit(){
    this.pessoas = Repository.getPessoas;
  }

  encontrarPessoasProximas(latitude: number, longitude: number){
    let geoReferencia = new Geo(latitude, longitude);
    let geos = [];

    this.pessoas.foreach(x => geos.push(new Geo(x.latitude, x.longitude)));

    let proximos = this.geoService.obter3MaisProximos(geoReferencia, geos);

    return this.obterPessoasPorGeo(proximos, this.pessoas);
  }

  private obterPessoasPorGeo(geos: Geo[], pessoas: Pessoa[]){ 
    let pessoasProximas = [];

    pessoas.forEach(x => {
      x.latitude === geos[0].latitude && x.longitude === geos[0].longitude
      ? pessoasProximas.push(x) 
      : x.latitude === geos[1].latitude && x.longitude === geos[1].longitude
      ? pessoasProximas.splice(1, 0, x)
      : x.latitude === geos[2].latitude && x.longitude === geos[2].longitude
      ? pessoasProximas.splice(2,0,x) 
      : x
    });
    
    return pessoasProximas;
  }
  
}
