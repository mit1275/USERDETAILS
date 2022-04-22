import React,{useState} from 'react';
import ReactDOM from "react-dom";
import './Style.css';
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Axios from 'axios';
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();

toast.configure();

var jk='';
const AddProject=()=>{

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

  const [names,setNames]=useState({
      email:"",
     title:"",
     description:"",
     category:"",
                startdate:"",
                enddate:""
  });
    const InputEvent=(event)=>{
            const{value,name}=event.target;
            setNames((preValue)=>{
              if(name==="title")
              {
               return{
                 title:value,
                 email:jk,
                description:preValue.description,
                category:preValue.category,
                startdate:preValue.startdate,
                enddate:preValue.enddate
               };
              }
              else if(name==="description")
              {
               return{
                 
                 title:preValue.title,
                 email:jk,
                 description:value,
                 category:preValue.category,
                startdate:preValue.startdate,
                enddate:preValue.enddate
                
               };
              }
              else if(name==="category")
              {
               return{
                 
                 title:preValue.title,
                 email:jk,
                 description:preValue.description,
                 category:value,
                startdate:preValue.startdate,
                enddate:preValue.enddate
                
               };
              }
              else if(name==="startdate")
              {
               return{
                 
                title:preValue.title,
                email:jk,
                description:preValue.description,
                category:preValue.category,
               startdate:value,
               enddate:preValue.enddate
                
               };
              }
              else if(name==="enddate")
              {
               return{
                 
                title:preValue.title,
                email:jk,
                description:preValue.description,
                category:preValue.category,
               startdate:preValue.startdate,
               enddate:value
                
               };
              }
              
             
             
            });
          
    };

    const onSubmit=(event)=>{
      event.preventDefault();
      console.log(names.email);
      if(names.title==='')
      {
          alert("Please fill all the feilds");
          window.location.reload();
      }
      else
      {
      Axios.post(
        `http://localhost:3001/api/student/addproject`,
        {
          title:names.title,
          email:jk,
         description:names.description,
         category:names.category,
         startdate:names.startdate,
         enddate:names.enddate
        }
        
      )
        .then((result) => {})

    };
    alert("Thank You for your response");
    window.location.reload();
}

  
    return(
        <>
       <link href="Style.css" rel="stylesheet" />
       <div className="bodys">
        <form onSubmit={onSubmit}>
            
            
  <h1 className="feed">ADD PROJECTS </h1>
  
  <div className="columnss">
   
  
    <div className="the-phone">Project Title</div>
    <input type="tel" name="title" id="the-phone" onChange={InputEvent} value={names.title}/>
    <div className="the-phone">Project Category</div>
    <input type="tel" name="category" id="the-phone" onChange={InputEvent} value={names.category}/>
    <div className="the-phone">Start Date</div>
    <input type="tel" name="startdate" id="the-phone" onChange={InputEvent} value={names.startdate}/>
    <div className="the-phone">End Date</div>
    <input type="tel" name="enddate" id="the-phone" onChange={InputEvent} value={names.enddate}/>
  </div>
  <div className="columnss">
    <label className="the-message">Project Description</label>
    <textarea name="description" id="the-message" defaultValue={""} onChange={InputEvent} value={names.description}/>
    <input type="submit" defaultValue="Save" />
  </div>
 
</form>
</div>

        </>
        )
    }
export default AddProject;