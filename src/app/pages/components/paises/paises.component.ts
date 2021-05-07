import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PaisesService } from 'src/app/services/core/paises.service';
import { SearchService } from 'src/app/services/core/search.service';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.scss']
})
export class PaisesComponent implements OnInit, OnDestroy {

  paisesList: any[] = [];
  subscription$: Subscription;

  defaultBindingsList = [
    { value: 0, label: 'All' },
    { value: 1, label: 'Africa' },
    { value: 2, label: 'Americas' },
    { value: 3, label: 'Asia' },
    { value: 4, label: 'Europe' },
    { value: 5, label: 'Oceania' }
  ];

  selectedRegion = null;

  constructor(private svcPaises: PaisesService, private svcSearch: SearchService) {
    
    // get init data
    
    this.subscription$ = this.svcSearch.onListenCriterio().subscribe((criterio: string) => {
      
      if(criterio != ''){
        this.searchCriterio(criterio);
      } 
      else{
        this.getAllData();
      }

    });

  }

  ngOnInit(): void {
    this.getAllData();
  }

  onChangeRegion() {
    if(this.selectedRegion.value == 0){
      this.getAllData();
    }
    else{
      this.getPaisesByRegion(this.selectedRegion.label);
    }
  }

  getAllData() {
    this.svcPaises.getAllPaises().subscribe((data:any[]) => {
      this.paisesList = data;
    });
  }

  getPaisesByRegion(region: string) {
    this.svcPaises.getPaisesByRegion(region).subscribe((data:any[]) => {
      this.paisesList = data;
    });
  }

  searchCriterio(criterio: string) {
    this.svcPaises.getPaisByCriterio(criterio).subscribe((data:any[]) => {
      this.paisesList = data;
    });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

}
