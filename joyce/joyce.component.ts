import { Component, OnInit } from '@angular/core';
import { MatLabel } from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import { Chart, registerables } from 'chart.js';
import { EquimentService } from '../equiment.service';
Chart.register(...registerables);

@Component({
  selector: 'app-joyce',
  templateUrl: './joyce.component.html',
  styleUrls: ['./joyce.component.css']
})

export class JoyceComponent implements OnInit{
  ELEFACTORY_DAY=""; //用電
  ELESOLAR_DAY=""; //發電
  GREENRATIO_DAY="";

  ELEFACTORY_MONTH=""; //用電
  ELESOLAR_MONTH=""; //發電
  GREENRATIO_MONTH="";

  ELEFACTORY_YEAR=""; //用電
  ELESOLAR_YEAR=""; //發電
  GREENRATIO_YEAR= "0";

  ELESOLAR_SUM= "0";
  ELESOLAR_SUMRATIO="";
  RAD="";//日照量
  TMPT=""; //溫度

  myChartLine:any =Chart;
  myChartBar:any =Chart;

  date:any;
  year:any;
  month:any;
  day:any;
  hours:any;
  minutes:any;
  

  constructor(private EquimentService:EquimentService)
   {
  }
 
  ngOnInit(): void { 
    this.date= new Date();
    console.log(this.date);

    this.year = this.date.getFullYear();
    this.month = ('0' + (this.date.getMonth() + 1)).slice(-2);
    this.day = this.date.getDate();
    this.hours = this.date.getHours();
    this.minutes = this.date.getMinutes();

    this.showSolarChart();
    this.showenergyDay();
    this.showenergyMonth();
    this.showenergyYear();
    this.showenergyDAY_Shine();
    this.showenergySUMYear();


    this.myChartLine=this._chartSubLine(
      "lineChart",
      [],
      [],
   
    );
  }
  

  _chartSubLine(id:any,x:any,y:any,ymax:any=null){
    return new Chart(id, {
      type: 'line',
      data: {
        labels: x,
        datasets: [ 
          {
            label: '當日發電量',
            data: y,
            backgroundColor: 'rgba(255, 72, 72, 0.3)', // Blue color for background
            borderColor: 'black', // Blue color for border
            
            borderWidth: 2,
            pointRadius: 0
          }]
      },    
      options: {
        responsive :false,
       
        scales: {
          x: {
            title: {
              display: true,
              text: '時間(24hr)', // Set the label for the X-axis
              color: 'black',
              font: {
                size: 15,
                weight: 'bold'
              }
            },
            ticks: {
              font: {
                size: 15,
                weight: 'bold'
                }
            },
          },
          y: {
            max: ymax, // Set the maximum value for the Y-axis
            beginAtZero: true, // Set this to true if you want the Y-axis to start from zero
            title: {
              display: true,
              text: '發電量', // Set the label for the Y-axis
              color: 'black',
              font: {
                size: 15,
                weight: 'bold'
              }
            } ,
            ticks: {
              font: {
                size: 15,
                weight: 'bold'
                }
            },
          },
         
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: 'black',
              font: {
                size: 15,
                weight: 'bolder'
              }
            }
          }
        },
      }
  });
  }

  _chartSubBar(id:any,x:any,y:any,ymax:any=null){
    // console.log(this.ELEFACTORY_YEAR)
    return new Chart(id, {
      data: {
        labels: [2021,2022,2023,2024],
        
        datasets: [
          {
            type: 'bar',
            label: '每年發電量',
            data: [8880,12810,22821,this.ELESOLAR_YEAR],
            backgroundColor: 'rgba(73, 130, 252, 0.8)', // Blue color for background
            borderColor: 'rgba(73, 130, 252, 0.8)', // Blue color for border
            borderWidth: 1,
            yAxisID:'y1'      
          },
          {
            type: 'bar',
            label: '每年用電量',
            data: [15540,12830,11624,this.ELEFACTORY_YEAR],
            backgroundColor: 'rgba(255, 72, 72, 0.7)', // Red color for background
            borderColor: 'rgba(255, 72, 72, 0.5)', // Red color for border
            borderWidth: 1,
            yAxisID:'y1'  
          },
          {
            type: 'line',
            label: '綠電佔比',
            data: [(8880/15540)*100,(12810/12830)*100,(22821/11624)*100,this.GREENRATIO_YEAR],
            backgroundColor: 'grey', // Red color for background
            borderColor: 'rgba(0,0,0,0.5)', // Red color for border
            borderWidth: 2, 
            yAxisID: 'y2'
          },
        ]
      },
      options: {
        responsive :false,
        scales: {
          x: {
            ticks: {
              font: {
                size: 15,
                weight: 'bold'
                }
            },
            title: {
              display: true,
              text: '年份', // Set the label for the X-axis
              color: 'black',
              font: {
                size: 15,
                weight: 'bold'
              }
            },
          },
          y1: {
            max: ymax, // Set the maximum value for the Y-axis
            beginAtZero: true, // Set this to true if you want the Y-axis to start from zero
            title: {
              display: true,
              text: '用電量', // Set the label for the Y-axis
              color: 'black',
              font: {
                size: 15,
                weight: 'bold'
              }
            } ,
            ticks: {
              font: {
                size: 15,
                weight: 'bold'
                }
            },
          },
          y2: {
            // // max: ymax, // Set the maximum value for the Y-axis
            // beginAtZero: true, // Set this to true if you want the Y-axis to start from zero
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: '用電量', // Set the label for the Y-axis
              color: 'black',
              font: {
                size: 15,
                weight: 'bold'
              }
            } ,
            ticks: {
              font: {
                size: 15,
                weight: 'bold'
                }
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: 'black',
              font: {
                size: 15,
                weight: 'bolder'
              }
            }
          }
        },
      }
    });
  }
  

  private formatTimeLabel(dateTime: string): string {
    const date = new Date(dateTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    // 格式化為 HH:00
    const formattedHours = hours < 10 ? '0' + hours : '' + hours;
    const formattedMonutes = minutes < 10 ? '0' + minutes : '' + minutes;
   
    return `${formattedHours}:${formattedMonutes}`;
    }

  showSolarChart(){ //圖表 當日發電量
    this.EquimentService
    .postData(
      //api name
      "showSolaDateKwh", //日趨勢日用電
      //put parameter
        {
          "DTTM":`${this.year}-${this.month}-${this.day}`,
        }
      )   

    .subscribe((res: any) =>{
      console.log(res);
      // 僅獲取 res.resultData
      if (res.resultData && res.resultData.MESSAGE !== "查無資料 ") {
        const data = res.resultData;
        // if (Array.isArray(res.resultData.ELESOLAR)) {
          // const data = res.resultData.ELESOLAR;
          console.log('ELESOLAR data:', data);

          // 更新圖表
          this.myChartLine.data.labels = data.map((item: { DTTM: any; }) => this.formatTimeLabel(item.DTTM));
          this.myChartLine.data.datasets[0].data = data.map((item: { VAL: any; }) => (item.VAL) / 1000000);
          this.myChartLine.update();
        }
      
    });
  }


  showenergyDay(){
    //日
    this.EquimentService
    .postData(
        //api name
      "getEleForDate", //日發電
      {
        "DTTM":`${this.year}-${this.month}-${this.day}`,
        "UNIT": "日",
      },
      // "showSolaDateKwh",//日趨勢日用電
      // {
      //   "DTTM":`${this.year}-${this.month}-${this.day}`,
      // },
      
    )
    .subscribe((res:any)=>{
      console.log(res);
      // only get res.resultData
      if(res.resultData && res.resultData.MESSAGE!="查無資料 " )
      {
        console.log(res.resultData.ELESOLAR);
        var tmptVal=res.resultData.ELESOLAR/1000;
        this.ELESOLAR_DAY=tmptVal.toFixed(2);
        
        console.log(res.resultData.ELEFACTORY);
        var tmptVal=res.resultData.ELEFACTORY/1000;
        this.ELEFACTORY_DAY=tmptVal.toFixed(2);

        var tmptVal=(res.resultData.ELESOLAR/res.resultData.ELEFACTORY)*100;
        this.GREENRATIO_DAY=tmptVal.toFixed(2);
      }
    });
  }  
  
  showenergyMonth(){
    //月
    this.EquimentService
    .postData(
        //api name
      "getEle",
      {
        "DTTM":`${this.year}-${this.month}-1`,
        "UNIT": "月",
      }
    )
    .subscribe((res:any)=>{
      console.log(res);
      // only get res.resultData
      if(res.resultData && res.resultData.MESSAGE!="查無資料 " )
      {
        console.log(res.resultData.ELESOLAR);
        var tmptVal=res.resultData.ELESOLAR/1000;
        this.ELESOLAR_MONTH=tmptVal.toFixed(2); 

        console.log(res.resultData.ELEFACTORY);
        var tmptVal=res.resultData.ELEFACTORY/1000;
        this.ELEFACTORY_MONTH=tmptVal.toFixed(2);

        var tmptVal=(res.resultData.ELESOLAR/res.resultData.ELEFACTORY)*100;
        this.GREENRATIO_MONTH=tmptVal.toFixed(2);
      }
    });
  }  

  showenergyYear(){
    //年
    this.EquimentService
    .postData(
        //api name
      "getEle",
      {
        "DTTM":`${this.year}-${this.month}`,
        "UNIT": "年",
      }
    )
    .subscribe((res:any)=>{
      console.log(res);
      // only get res.resultData
      if(res.resultData && res.resultData.MESSAGE!="查無資料 " )
      {
        console.log(res.resultData.ELESOLAR);
        var tmptVal=res.resultData.ELESOLAR/1000;
        this.ELESOLAR_YEAR=tmptVal.toFixed(2); 

        console.log(res.resultData.ELEFACTORY);
        var tmptVal=res.resultData.ELEFACTORY/1000;
        this.ELEFACTORY_YEAR=tmptVal.toFixed(2);

        var tmptVal=(res.resultData.ELESOLAR/res.resultData.ELEFACTORY)*100;
        this.GREENRATIO_YEAR=tmptVal.toFixed(2);

        this.myChartBar=this._chartSubBar(
          "barChart",
          [],
          [],
          25000
        );

      }
    });
  } 

  showenergyDAY_Shine(){
    //日照量
    this.EquimentService
    .postData(
        //api name
      "getRadAndTmpt",
      {
        "DTTM":`${this.year}-${this.month}-${this.day}`,
      }
    )
    .subscribe((res:any)=>{
      console.log(res);
      // only get res.resultData
      if(res.resultData && res.resultData.MESSAGE!="查無資料 " )
      {
        console.log(res.resultData);
        this.RAD=res.resultData.RAD;
        this.TMPT=res.resultData.TMPT;
      }
    });
  } 

  showenergySUMYear(){
    //累積
    this.EquimentService
    .postData(
        //api name
      "getEleSumYears",
      {
        "DTTM":`${this.year}-${this.month}`,
        "UNIT": "年",
      }
    )

    .subscribe((res:any)=>{
      console.log(res);
      // only get res.resultData
      if(res.resultData && res.resultData.MESSAGE!="查無資料 " )
      {
        console.log(res.resultData.ELESOLAR);
        var tmptVal=res.resultData.ELESOLAR/1000;
        this.ELESOLAR_SUM=tmptVal.toFixed(2); 

        var tmptSum=tmptVal/6;
        this.ELESOLAR_SUMRATIO=tmptSum.toFixed(2);
      }
    });
  } 





}
