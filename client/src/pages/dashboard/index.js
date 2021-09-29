import React ,{useState}from 'react'
import axios from 'axios'
import unique from 'lodash/uniq'
import { PieChart,Pie, Sector, Cell } from 'recharts'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const findOccurrences = (arr = []) => {
  const res = [];
  arr.forEach(el => {
     const index = res.findIndex(obj => {
        return obj['name'] === el;
     });
     if(index === -1){
        res.push({
           "name": el,
           "y": 1
        })
     }
     else{
        res[index]["y"]++;
     };
  });
  return res;
};

  const Dashboard = () => {
    const [origdata,setorigData]=React.useState([])
    const [data,setData]=React.useState([])
    const [countries,setCountries]=useState(null);
    React.useEffect(()=> {
       
      axios.get('api/college').then(x=> {  //changed here
        setorigData(x.data);
        setData(x.data);
        let c = [];
        if(x.data&& x.data.length>0){
            x.data.forEach(z=> c.push(z.country))
        }
        const ax= findOccurrences(c)
        const cc = unique(c);
        setCountries(ax)
    
      })  },[])
    console.log(countries)

const options = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie'
  },
  title: {
    text: 'Divisions of colleges by country'
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
    point: {
      valueSuffix: '%'
    }
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
      }
    }
  },
  series: [{
    name: 'Brands',
    colorByPoint: true,
    data: countries
  }]
};

   //var mp = new HashMap();
  // map.forEach(x) {

 //  mp.set(x.country,);
//});


   //  console.log(countries)
  return <div>
  <HighchartsReact
    highcharts={Highcharts}
    options={options}
  />
</div>
  }

export default Dashboard