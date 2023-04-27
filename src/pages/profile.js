import React, { useEffect } from 'react'
import avatar from '../assets/title.png';
import {getAuth} from "firebase/auth";
import {app,database,auth} from "../config/firebase.js";
import {ref,get,child} from "firebase/database";
import { onAuthStateChanged } from 'firebase/auth';
import SideBar from '../components/sideBar.js';


const Profile = () => {
  const currentUser=getAuth(app)
  const dbref=ref(database) 

  onAuthStateChanged(auth, (user) => {
    if (user) {

      const uid = user.uid;
      get(child(dbref,uid)).then((snapshot)=>{
        const aptitude=snapshot.val().aptitude
        const test=snapshot.val().test
        const backlogs=snapshot.val().backlogs
        const course=snapshot.val().course
        const degree=snapshot.val().degree
        const level=snapshot.val().level
        const country=snapshot.val().country
        const exp=snapshot.val().experience
        const score=snapshot.val().score
        const aptitudeScores=snapshot.val().aptitudeScores
        const testScores=snapshot.val().testScores
        const username=snapshot.val().username
        const email=snapshot.val().email
        const mobile=snapshot.val().mobile_number
        const twelth="Higher Secondary";
        const college="Graduation";
        const backlogsTitle="Backlogs"
        

        console.log(score)
        document.getElementById("username").innerHTML=username;
        document.getElementById("degree").innerHTML=degree
        document.getElementById("country").innerHTML=country
        document.getElementById("course").innerHTML=course
        document.getElementById("email").innerHTML=user.email
        document.getElementById("mobile").innerHTML=mobile

        if(test!="none"){
           document.getElementById("test").innerHTML=test
           document.getElementById("testScores").innerHTML=testScores
        }

        if(aptitude!="none"){
          document.getElementById("aptitude").innerHTML=aptitude
          document.getElementById("aptitudeScores").innerHTML=aptitudeScores
       }

       if(aptitude =="none" && test=="none"){
          document.getElementById("result").innerHTML="No test taken";
       }

       if(level=="12th"){

        document.getElementById("12Title").innerHTML=twelth;
        document.getElementById("12").innerHTML=score;
       }

       if(level=="Bachelor"){
        document.getElementById("bachTitle").innerHTML=college;
        document.getElementById("bscore").innerHTML=score;
        document.getElementById("backlogsTitle").innerHTML=backlogsTitle;
        document.getElementById("b_backlogs").innerHTML=backlogs;
       }

       if(level=="Master"){
        document.getElementById("mastTitle").innerHTML=college;
        document.getElementById("mscore").innerHTML=score;
        document.getElementById("backlogsTitle").innerHTML=backlogsTitle;
        document.getElementById("m_backlogs").innerHTML=backlogs;
       }
    
    
    })
    } else {
    }
  });
 
  
  
  return (
    <div >
      <div className='row'>

        <div className='col' style={{paddingTop:0,paddingLeft:250,paddingRight:50,paddingBottom:0}}>
        <br></br>
      <br></br>
    <div className="card shadow" style={{borderRadius:8}}>
      <div className="card-body">
        
        <div className="container">
          <div className="row">
            <div className="col-auto">
            <img src={avatar} alt="profile" className="avatar" style={{height:50,borderRadius:10}}/>
            </div> 
            
            <div className="col">
            <div class="container">
              <div class="row"> 
                <div class="col-auto" style={{fontSize:20,fontWeight:'bold'}} id='username'></div>
              </div>
              <div class="row">
              
              📧 <div id='email'></div>
              
               📞<div id='mobile'></div>  
              </div>
            
            <div className='row'>
                <div className='col-auto'>
                🗺India
                </div>
            </div>
            </div>
            </div>
        </div>
      
        </div>
      </div>
    </div>
    <br/>
    <div className="card shadow" >
      <div className="card body" style={{padding:30,borderRadius:8}}>
        <div className="container">
          <div className='row' style={{alignContent:'flex-start'}}>
            <div style={{fontWeight:"bold",color:'grey',fontSize:20}}>Your Study Preferences</div>
          </div>
          <hr></hr>
          <div className='row'>
            <div className='col' style={{lineHeight:2}}>
              <div className='row' style={{fontWeight:'bold'}}>
              🎓Course Level
              </div>
              <div className='row' id='degree' style={{paddingLeft:20}}>
              </div>
        
            </div>
            <div className='col' >
              <div className='row' style={{fontWeight:'bold'}}>
              📅Intake
              </div>
            </div>
          </div>
          <div className='row'>
          <div className='col' style={{lineHeight:2}}>
              <div className='row' style={{fontWeight:'bold'}}>
              🚩Country Preferences
              </div>
              <div className='row' id='country' style={{paddingLeft:20}}>
              </div>
            </div>
            <div className='col'>
              <div className='row' style={{fontWeight:'bold'}}>
              💵Budget
              </div>
            </div>
          </div>
          <div className='row'>
          <div className='col' style={{lineHeight:2}}>
              <div className='row' style={{fontWeight:'bold'}}>
              📖Preferred Course
              </div>
              <div className='row' id='course' style={{paddingLeft:20}}>
              </div>
            </div>
            <div className='col' style={{lineHeight:2}}>
              <div className='row' style={{fontWeight:'bold'}}>
              🎯Objective
              </div>
            </div>
          </div>
          <div className='row'>
          <div className='col'>
              <div className='row' style={{fontWeight:'bold'}}>
              🌟Specialization
              </div>
          </div>
          </div>
    
        </div>
      </div>

    </div>
    <br></br>
    <div className="card shadow" >
      <div className="card body" style={{padding:30,borderRadius:10}}>
        <div className="container">
          <div className='row' style={{alignContent:'flex-start'}}>
            <div style={{fontWeight:"bold",color:'grey',fontSize:20}}>Test Scores</div>
          </div>
          <hr></hr> 
          <div className='row'>
              <div className='col-auto' id='aptitude' style={{fontWeight:40}}>
              </div>
              <div className='col-auto' id='aptitudeScores'>

              </div>
          </div>
          <div className='row'>
              <div className='col-auto' id='test' style={{fontWeight:20}}>
              </div>
              <div className='col-auto' id='testScores'>

              </div>
          </div>

          <div className='row'>
              <div className='col-auto' id='result' style={{fontWeight:20}}>
              </div>
              
          </div>
    
        </div>
      </div>

    </div>
    <br></br>
    <div className="card shadow" >
      <div className="card body" style={{padding:30,borderRadius:10}}>
        <div className="container">
          <div className='row' style={{alignContent:'flex-start'}}>
            <div style={{fontWeight:"bold",color:'grey',fontSize:20}}>Education</div>
          </div>
          <hr></hr> 
          <div className='container'>
            <div className='row' id='12Title' style={{fontWeight:'bold'}}>
            </div>
            <div id='12'></div>

          </div>

          <div className='container'>
            <div className='row'>
            <div className='col' id='bachTitle' style={{fontWeight:20}}>
              </div>
              <div className='col' id='bscore'>

              </div>
            </div>
            <div className='row'>
            <div className='col' id='backlogsTitle' style={{fontWeight:20}}>

            </div>
            <div className='col' id='b_backlogs'>

            </div>
            </div>

          </div>

          <div className='container'>
              <div className='row' id='mastTitle' style={{fontWeight:20}}>
              </div>
              <div className='row' id='mscore'>

              </div>
              <div className='row' id='backlogsTitle' style={{fontWeight:20}}>

              </div>
              <div className='row' id='m_backlogs'>

              </div>
          </div>
    
        </div>
      </div>

    </div>

        </div>
        <div className='col-auto' style={{position:'fixed',height:"80%"}} >
          <SideBar/>
        </div>
      </div>




</div>

  )

}

export default Profile
