import React from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { Container, TextField } from "@material-ui/core";
// import "./otherDetails/otherDetails.modules.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import LoadingScreen from '../LoadingScreen/LoadingScreen';
// import StudentSignup from './StudentSignup';
// import StudentSigin from './../Signin/StudentSignin';
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();

toast.configure();

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Application
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(/images/img.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(1, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  input: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

var jk='';
export default function Addprofile() {
  const classes = useStyles();
  let history = useHistory();
  React.useEffect(() => {
      try{
        const userinfo=localStorage.getItem('userinfo');
        // const emails=localStorage.getItem('email');
        // console.log(emails);
  
       
       
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

const [email,setemail]=useState("");
// setemail(jk);
  const [adress,setadress]=useState("");
  const [state,setstate]=useState("");
  
 
  const [city,setcity]=useState("");
  const [country,setcountry]=useState("");
  const [pincode,setpincode]=useState("");
  const [companyname,setcompanyname]=useState("");
  const [occupation, setoccupation] = useState("");
  const [experience,setexperience]=useState("");



  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }


  const submitHandler = (e) => {
    e.preventDefault();
    if (adress==="") {
      toast.error("Please fill all fields !", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
            fetch("http://localhost:3001/api/student/addprofile", {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email:jk,
                adress:adress,
                city:city,
                state:state,
                country:country,
                pincode:pincode,
                companyname:companyname,
                occupation:occupation,
                experience:experience
              }),
            })
              .then((res) => res.json())
              .then((result) => {
                // setLoading(false);
                // console.log(result);
                if (result.message === "Success") {
                  // localStorage.setItem('userinfo',JSON.stringify(result));
                  toast.success("Sweet !", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                  });
                 
                  sleep(2000).then(() => {
                    history.push("/addproject");
                  });
                } else {
                  toast.error(`${result.message}`, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                  });
                  sleep(2300).then(() => {
                    window.location.reload(false);
                    history.push("/");
                  });
                }
              });
          
        
      
    }
  };

  return (
    <div>
      <div>
        {
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Create Profile
                </Typography>
                <form
                  className={classes.form}
                  noValidate
                  onSubmit={submitHandler}
                >
                    
                  <Grid container spacing={2}>
                  <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="occupation"
                        label="Occupation"
                        id="occupation"
                        type="string"
                        onChange={(e) => setoccupation(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="company"
                        label="Company Name"
                        id="company"
                        type="string"
                        onChange={(e) => setcompanyname(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="experience"
                        label="Experienct in YRS"
                        id="experience"
                        type="number"
                        onChange={(e) => setexperience(e.target.value)}
                      />
                    </Grid>
                 
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="country"
                        variant="outlined"
                        required
                        fullWidth
                        id="country"
                        label="Country Name"
                        autoFocus
                        onChange={(e) => setcountry(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="state"
                        label="State Name"
                        id="state"
                        type="string"
                        onChange={(e) => setstate(e.target.value)}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="city"
                        label="City"
                        name="city"
                        onChange={(e) => setcity(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="adress"
                        label="Adress"
                        type="text"
                        id="adress"
                        onChange={(e) => setadress(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="pincode"
                        label="Pincode"
                        id="pincode"
                        type="string"
                        onChange={(e) => setpincode(e.target.value)}
                      />
                    </Grid>

                   
                    
                   
                  </Grid>
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    ADD PROJECTS
                  </Button>
                  <Box mt={3} />
                  <Grid container>
                    <Grid item xs>
                      {/* <Link href="#" variant="body2">
                        Forgot password?
                      </Link> */}
                    </Grid>
                    <Grid item>
                      <Link href="/addproject" variant="body2">
                        {"Already have profile? Add Projects"}
                      </Link>
                    </Grid>
                  </Grid>
                  <Box mt={5}>
                    <Copyright />
                  </Box>
                </form>
              </div>
            </Grid>
          </Grid>
        }
      </div>
    </div>
  );
}
