import { IPosts } from './posts.model';
import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Exercise, Operator, Store, DynamicClass, Store2 } from './operator';

export const makeTemplate = (templateString:string) => {
  return (templateData:any) => new Function(`{${Object.keys(templateData).join(',')}}`, 'return `' + templateString + '`')(templateData);
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit  {
  storedPost: IPosts[] = [];
  @ViewChild('dataContainer',{ static: true }) dataContainer!: ElementRef;

  constructor() {
  
   }

  onPostAdded(posts: IPosts) {
    this.storedPost.push(posts);
  }

  ngAfterViewInit(){
    console.log(this.dataContainer);
 }

  ngOnInit() {
       let svg = "<svg height=\"1000\" width=\"1000\"> <circle cx=\"500\" cy=\"500\" r=\"400\" stroke=\"black\" stroke-width=\"3\" fill=\"red\" /> Sorry, your browser does not support inline SVG. </svg> ";
       this.dataContainer.nativeElement.innerHTML = svg;
    }

    onclick2() {
      console.log("gen");

      let ex = new Exercise();
      ex.calcAll();

    }

    onclick3() {
      console.log("onclick3");
      let x = Math.floor(Math.random()*6);
      let strname = Store2[x];

      console.log(Store);
      console.log(Store[2]);

    let tesla: any = new DynamicClass(strname);
            console.log(`Type of object \'tesla\':${tesla.constructor['name']}`);
            
    }

    onclick() {
      console.log("ff");

      let o = new Operator();
      o.init();

      console.log(o.getText());

      const tpl =  makeTemplate('hello ${name}')
      const name = 'world';
      console.log(tpl({name}));
    }
    
}
