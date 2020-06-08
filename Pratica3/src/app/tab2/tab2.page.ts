import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Dialogs } from '@ionic-native/dialogs';
import { Platform } from '@ionic/angular';
import { Pessoa } from '../model/interfaces/pessoa.model';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  exibirFormulario = false;
  pessoaCadastrada: Pessoa = {} as Pessoa;
  private form: FormGroup;
  private dialogs = Dialogs;

  constructor(
    private platform: Platform,
    private nativeStorage: NativeStorage,
    private formBuilder: FormBuilder
  ) { 
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  async ngOnInit() {
    await this.verificarCadastroPessoa();
  }

  cadastrar(){
    console.log('Pessoa cadastrada com sucesso!');
  }
  savePessoa(pessoa: Pessoa) {
    if (this.platform.is('hybrid')) {
      this.nativeStorage.setItem("person", JSON.stringify(pessoa));
    } else {
      localStorage.setItem("person", JSON.stringify(pessoa));
    }
  }

  async verificarCadastroPessoa(){
    if (this.platform.is('hybrid')) {
      let pessoa = await this.nativeStorage.getItem("person");
      if (pessoa) {  
        this.dialogs.alert('Você já tem cadastro!', '', 'Fechar');
        this.pessoaCadastrada = JSON.parse(pessoa);
      } else {
        this.exibirFormulario = true
      }
    } else {
      let pessoa = localStorage.getItem("person");
      if (pessoa) {  
        this.dialogs.alert('Você já tem cadastro!', '', 'Fechar');
        this.pessoaCadastrada = JSON.parse(pessoa);
      } else {
        this.exibirFormulario = true
      }
    }
  }
}
