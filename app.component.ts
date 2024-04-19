import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaderResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { MatSelect } from '@angular/material/select';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'bms-reporting-gui';
  paramOptions: string[] = [];
  selectedParameters = new FormControl([]);
  selectedInfo = new FormControl([]);
  templateData: any;
  templateDataList: any;
  displayedColumns = ['id', 'name', 'column1', 'column2', 'column3'];
  selectedTemplate= new FormControl([]);
 
  constructor(private http: HttpClient) { 
    this.geParameterstList();
    this.getTemplateList()
    
  }


  geParameterstList(){
    this.http.get("http://localhost:8080/bms-reports/v1/parameters", {responseType: 'json'}).subscribe(
      (data: any) => { 
        this.paramOptions = data;
      }
    );
  }


  public createTemplate(){

    const selectedParams = this.selectedParameters.value;
    const selectedAdditionalInfo = this.selectedInfo.value;
  
    var name = ((document.getElementById("name") as HTMLInputElement).value);
    var report_group = ((document.getElementById("report_group") as HTMLInputElement).value);
    
    var templateObj = {
      "name": name,
      "parameters": selectedParams,
      "additionalInfo": selectedAdditionalInfo,
      "report_group": report_group
    };
    this.postTemplate(templateObj);
  }

  public postTemplate(templateObj: any){
    this.http.post("http://localhost:8080/bms-reports/v1/createTemplate", 
    templateObj, {responseType: 'json'}).subscribe((successResponse: any)=> {
      this.templateData = successResponse;
      console.log("response : ", successResponse)
      this.getTemplateList();
    })
  }

  public getTemplateList(){
    this.http.get("http://localhost:8080/bms-reports/v1/templates", {responseType: 'json'}).subscribe(
      (data: any) => { 
        this.templateDataList = data;
      }
    );
  }

  public exportReport(){
    const id = this.selectedTemplate.value;
    const fromDate = ((document.getElementById("fromDate") as HTMLInputElement).value);
    const toDate = ((document.getElementById("toDate") as HTMLInputElement).value);
    var url = "http://localhost:8080/bms-reports/v1/exportReport?id="+id+"&&fromDate="+fromDate+"&&toDate="+toDate;
    
    this.http.get(url, {responseType: 'json'}).subscribe(
      (data: any) => { 
        alert(data)
      }
    );

  }
}


