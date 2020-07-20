import React from 'react';
import axios from 'axios';
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar,
        PieChart, Pie} from 'recharts';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {
      salariesAvg:[],
      agesAvg:[]
    }
  }



   onGenrateDataQueueClick = async () => {
    const result = await axios.get('http://localhost:4000/queue');
   }

   onSalaryAvarageTitleClick = async () => {
    
    const result = await axios.get('http://localhost:4000/report/avg-salary-title');
 
    this.setState({
      salaryAvg : result.data
    })
   }

   onAgeAvarageTitleClick = async () => {
   
   const result = await axios.get('http://localhost:4000/report/avg-age');
   console.log(result);
   this.setState({
    agesAvg : result.data
   })
  }

   render(){
    return(
    <div className="App">
      <button onClick={this.onGenrateDataQueueClick}>Generate Data Queue</button>
      <button onClick={this.onSalaryAvarageTitleClick}>Employee Salary Average by Title</button>
      <button onClick={this.onAgeAvarageTitleClick}>Employee Age Average</button>
      <div style={{textAlign:'center'}}>
      <div>
        <BarChart width={730} height={250} data={this.state.salaryAvg}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="title" fill="#8884d8" />
          <Bar dataKey="avg_salary" fill="#82ca9d" />
        </BarChart>
      </div>

      <div>
      <PieChart width={730} height={250}>
        <Pie data={this.state.agesAvg} dataKey="age" nameKey="total" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label/>
      </PieChart>
      </div>
      </div>
     
   </div> 
    )
  }
}


export default App;
