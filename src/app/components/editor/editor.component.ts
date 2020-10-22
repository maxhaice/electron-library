import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Module } from 'src/app/interfaces/module.interface';

import { ElectronService } from 'ngx-electron';
import { Theme } from 'src/app/interfaces/theme.interface';
import { Page } from 'src/app/interfaces/page.interface';
import { SubPage } from 'src/app/interfaces/subpage.interface';
import { Content } from 'src/app/interfaces/content.interface';

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  providers: [HttpClient]
})
export class EditorComponent implements OnInit {
  mdl: number; 
  thm: number;
  pg: number;
  sbpg: number;
  rmmdl: number; 
  rmthm: number;
  rmpg: number;
  rmsbpg: number;
  newModule: string;
  modules: Module[];
  fs: any;
  newTheme: string;
  newPage: string;
  newSubPage: string;
  newContent: any;
  typeContent: string;
  constructor(private http: HttpClient, private _electronService: ElectronService){
    this.fs = this._electronService.remote.require('fs');
  }
  ngOnInit(): void {
    this.http.get("assets/base.json").subscribe((value)=>{
      this.modules = value as [];
   });
  }
  createModule(){
    this.modules.push(
      {
        title: this.newModule,
        themes: []
      } as Module
    );
    this.saveModules();
  }
  removeModule(){
    console.log(this.rmmdl);
    this.modules = this.modules.filter((x,y)=>this.rmmdl!=y);
    this.saveModules();
  }
  createTheme(){
    this.modules[this.mdl-1].themes.push(
      {
        title: this.newTheme,
        pages: []
      } as Theme
    );
    this.saveModules();
  }
  removeTheme(){
    this.modules[this.mdl-1].themes = this.modules[this.mdl-1].themes.filter((x,y)=>this.rmthm!=y);
    this.saveModules();
  }
  createPage(){
    this.modules[this.mdl-1].themes[this.thm-1].pages.push(
      {
        title: this.newPage,
        subpages: []
      } as Page
    );
    this.saveModules();
  }
  removePage(){
    this.modules[this.mdl-1].themes[this.thm-1].pages = this.modules[this.mdl-1].themes[this.thm-1].pages.filter((x,y)=>this.rmpg-1!=y);
    this.saveModules();
  }
  createSubPage(){
    this.modules[this.mdl-1].themes[this.thm-1].pages[this.pg-1].subpages.push(
      {
        title: this.newSubPage,
        number: this.modules[this.mdl-1].themes[this.thm-1].pages[this.pg-1].subpages.length+1,
        content: []
      } as SubPage
    );
    this.saveModules();
  }
  removeSubPage(){
    this.modules[this.mdl-1].themes[this.thm-1].pages[this.pg-1].subpages = this.modules[this.mdl-1].themes[this.thm-1].pages[this.pg-1].subpages.filter((x,y)=>this.rmsbpg!=y);
    this.saveModules();
  }
  createContent(){
    this.modules[this.mdl-1].themes[this.thm-1].pages[this.pg-1].subpages[this.sbpg-1].content.push(
      {
        type: this.typeContent,
        inside: this.newContent
      } as Content
    );
    this.saveModules();
  }
  saveModules(){
    this.fs.writeFile("src/assets/base.json", JSON.stringify(this.modules), "utf-8", (error, data) => {
      if (error){
          console.error("error: " + error);
      }
    });
  }

}
