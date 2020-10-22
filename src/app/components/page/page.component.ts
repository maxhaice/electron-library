import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Module } from 'src/app/interfaces/module.interface';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  providers: [HttpClient]
})
export class PageComponent implements OnInit {
  modules: Module[];
  constructor(private http: HttpClient){}
  ngOnInit(): void {
    this.http.get("assets/base.json").subscribe((value)=>{
      this.modules = value as [];
   });
  }
}
