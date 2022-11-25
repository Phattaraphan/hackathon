import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpService } from './service/http.service';
import { MatTableDataSource } from '@angular/material/table';
import { ordStatusDetail_ } from './interface';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  insertdata:string ='';
  displayedColumns: string[] = ['I_ORDER', 'C_STATUS', 'I_DETAIL', 'C_PROCESSING', 'C_ROUND_TYPE', 'D_CREATE', 'D_CHANGE', 'D_TIMESTAMP', 'C_CANCEL_REASON', 'C_SEND_EDN', 'D_SEND_EDN','Update','Delete'];
  dataSource = new MatTableDataSource<ordStatusDetail_>(ELEMENT_DATA);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  sExternOrderno= '';
  


  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
    //this.dataSource.paginator = thsi.paginator;
    this.getAll();
    console.log(this.sExternOrderno);

  }
  getAll() {
    this.http.getALL().subscribe((res) => {
      this.dataSource = res.data
      return res.data
    });
  }

  getOrderId() {
    console.log(this.sExternOrderno);
    // this.http.getOrderId().subscribe((res) => {
    //   this.insertdata = res.data
    //   return res.data
    // });
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: ordStatusDetail_[] = [
  { I_ORDER: '1', C_STATUS: 'N', I_DETAIL: 1, C_PROCESSING: 'N', C_ROUND_TYPE: "N", D_CREATE: "23/10/2019", D_CHANGE: "23/10/2019", D_TIMESTAMP: "23/10/2019", C_CANCEL_REASON: "N", C_SEND_EDN: "N", D_SEND_EDN: "23/10/2019",Update:"",Delete:""},
  { I_ORDER: '2', C_STATUS: 'N', I_DETAIL: 1, C_PROCESSING: 'N', C_ROUND_TYPE: "N", D_CREATE: "23/10/2019", D_CHANGE: "23/10/2019", D_TIMESTAMP: "23/10/2019", C_CANCEL_REASON: "N", C_SEND_EDN: "N", D_SEND_EDN: "23/10/2019",Update:"",Delete:""}
];

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

