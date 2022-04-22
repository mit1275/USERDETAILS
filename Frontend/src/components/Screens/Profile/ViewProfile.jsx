import _ from "lodash";
import React,{useState} from 'react';
import ReactDOM from "react-dom";
import './Style1.css';
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Axios from 'axios';
// import { array } from "prop-types";
const jwt = require("jsonwebtoken");
const env = require("dotenv");

env.config();


toast.configure();

var jk='';
const ViewProfile=()=>{
    const [users, setusers] = React.useState([]);
    const [name,setname]=React.useState("");
    const [email,setemail]=React.useState("");
    const [contact,setcontact]=React.useState("");
    const [occupation,setocp]=React.useState("");
    const [companyname,setcompanyname]=React.useState("");
    const [experience,setexperience]=React.useState("");
    const [country,setcountry]=React.useState("");
    const [state,setstate]=React.useState("");
    const [city,setcity]=React.useState("");
    const [pincode,setpincode]=React.useState("");
    const [adress,setadress]=React.useState("");
    const [pr,setpr]=React.useState([]);
    const address = 'http://localhost:3001/api/student/getprofile';
  let history = useHistory();
  React.useEffect(() => {
      try{
        const userinfo=localStorage.getItem('userinfo');
        // const emails=localStorage.getItem('email');
        // console.log(emails);
        console.log("hi");
        console.log(userinfo);
  
       
       
        if(!userinfo)
        {
          toast.error(
            'Please sign in first',
            {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
            }
        );
        history.push('/');
        }
        else
        {
          const usersdata = JSON.parse( userinfo );
          console.log(usersdata);
          console.log(usersdata['email']);
          jk=usersdata['email'];
          console.log(jk);

          Axios.post(`http://localhost:3001/api/student/getprofile`,
          {
           email:jk
          }).then((result) => {

           
            
            
            console.log("opwhahs");
           
            setusers(result.data.files);
            console.log(result.data.files);

            setname(users[0]);
            setemail(users[1]);
            setcontact(users[2]);
            setocp(users[3]);
            setcompanyname(users[4]);
            setexperience(users[5]);
            setcountry(users[6]);
            setstate(users[7]);
            setcity(users[8]);
            setpincode(users[9]);
            setadress(users[10]);

           
         
          //  array = _.range(11,users.length); 
          //  console.log(users[11].name);
           
          });
        }
        

        // Object.values(userinfo).forEach(val => console.log(val));

        
    }catch(err){
        console.log(err);
        toast.error(err);
        toast.error(
            'Please sign in first',
            {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
            }
        );
        history.push('/');
    }
      
  }, []);


  var array=[];

  for(var i=11;i<users.length;i++)
  {
    console.log("shas");
    array.push(users[i]);
  }
  console.log("klksld");
  console.log(array.length);
  for(var i=0;i<array.length;i++)
  {
    console.log(array[i]);
  }
  
  
  console.log(array);
    return(
      <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Profile</title>
      <link
        href="https://fonts.googleapis.com/css?family=Bitter"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
        integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
        crossOrigin="anonymous"
      />
      <div id="header" className="primary-colors">
        <div className="profile-pic" />
        <div className="profile-summary">
          <h1>{users[0]}</h1>
          
        </div>
      </div>
      <div id="contacts" className="secondary-colors">
        <a href="tel:+91-98XXXXXXXX">
          <i className="fas fa-mobile-alt" />
          {users[2]}
        </a>
        <a href={`mailto:${users[1]}`}>
          <i className="fas fa-envelope" />
          {users[1]}
        </a>
       
        <a href={`https://maps.google.com/?q=${users[8]}`} target="_blank">
          <i className="fas fa-map-marker-alt" />
          {users[8]}, {users[7]}
        </a>
      </div>
      <div id="main">
        <div className="long-details">
          <h3 className="primary-colors section-head">
            <i className="fas fa-graduation-cap" /> Occupation
          </h3>
          <table className="timeline">
            <tbody>
              <tr>
                <td className="time">Role</td>
                <td className="event">
                  {users[3]}
                </td>
              </tr>
              <p></p>
              <tr>
                <td className="time">Working At</td>
                <td className="event">
                {users[4]}
                </td>
              </tr>
              <tr>
                <td className="time">Years of Experience</td>
                <td className="event">
                {users[5]}
                </td>
              </tr>
            </tbody>
          </table>
          <h3 className="primary-colors section-head">
            <i className="fas fa-business-time" /> Projects
          </h3>
          <table className="timeline">
            <tbody>
            {array.map((item,index) => 

            <tr style={{borderCollapse:'separate',borderSpacing:'0 3em'}}>
                          
                <td className="time">{item.name} </td>
                {/* <td className="time">{item.startdate}</td> */}
                <td className="event">
                <td className="time">{item.startdate}-{item.enddate} </td>
                  <p style={{fontSize:'22px' ,fontFamily:'sans-serif',color:'Highlight'}}>{item.category}</p>
                 
                  <ul className="circle-bullet">
                    <li>
                     {item.description}
                    </li>
                    
                  </ul>
                </td>
              </tr>
             )}
              
            </tbody>
          </table>
          <h3 className="primary-colors section-head">
            <i className="fas fa-drafting-compass" /> Adress
          </h3>
          <table className="timeline">
            <tbody>
              <tr>
                <td className="time">Country</td>
                <td className="event">
                {users[6]}
                  
                </td>
              </tr>
              <tr>
              <td className="time">State</td>
                <td className="event">
                {users[7]}
                  
                </td>
              </tr>
              <tr>
              <td className="time">City</td>
                <td className="event">
                {users[8]}
                  
                </td>
              </tr>
              <tr>
              <td className="time">Pincode</td>
                <td className="event">
                {users[9]}
                  
                </td>
              </tr>
              <tr>
              <td className="time">Street</td>
                <td className="event">
                {users[10]}
                  
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>
    </>
    

        )
    }
export default ViewProfile;