import React,{useState,useEffect}  from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'

const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandDanger = getStyle('danger') || '#f86c6b'

const MainChartExample = attributes => {
  const random = (min, max)=>{
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  //-------------------------------------Tính toán vẽ biểu đồ--------------------------------------------------
  const[main ,setMain]=useState([])
  let getDayInMonth = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28','29','30','31']
  const daysInMonth = (iMonth, iYear) => {
      return 32 - new Date(iYear, iMonth, 32).getDate();
  }
  const listDayInMonth = (lastDay) => {
    getDayInMonth.splice(lastDay, 31-lastDay);
    return getDayInMonth
  }
  const loadEmployee = async () => {
    var d = new Date()
    var month=d.getMonth()
    var year = d.getFullYear()
    fetch(`http://localhost:4080/detail/month/${month}`,{
            method: "GET",
          })
          .then(function(res){
            return res.json();
         })
         .then(function(myJson){
           setMain(myJson)
            console.log(myJson)
         })
  };
  useEffect(()=>{
    loadEmployee();
},[]);
  //------------------------------------------------------------------------------------------------------------
  const defaultDatasets = (()=>{
    const data2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    {main.map((data)=>{
      let day = parseInt(data.TimeOrder.slice(8,10))
      data2[day-1]=data2[day-1]+data.TotalMoney/1000000
    })}
    for(let i=0;i<data2.length;i++)
    {
      data2[i] = data2[i].toFixed(2)
    }
    return [
      {
        label: 'Doanh thu',
        backgroundColor: 'transparent',
        borderColor: brandSuccess,
        pointHoverBackgroundColor: brandSuccess,
        borderWidth: 2,
        data: data2
      }
    ]
  })()

  const defaultOptions = (()=>{
    return {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: false
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(500 / 5),
              max: 500
            },
            gridLines: {
              display: true
            }
          }]
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      }
    }
  )()
  var d = new Date()
  var month=d.getMonth()
  var year = d.getFullYear()
  // render
  return (
    <CChartLine
      {...attributes}
      datasets={defaultDatasets}
      options={defaultOptions}
      labels={listDayInMonth(daysInMonth(month, year))}
    />
  )
}


export default MainChartExample
