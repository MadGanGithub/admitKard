import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import {getAuth} from "firebase/auth";
import {ref,set} from "firebase/database";
import {app,database} from "../config/firebase.js";
import {useNavigate} from "react-router-dom"
const Setup = () => {


    const[level,setLevel]= useState(null);  
    const[country,setcountry]=useState(null);
    const[degree,setDegree]=useState(null);
    const[score,setScore]=useState(null);
    const[backlogs,setBackLogs]=useState(0);
    const[test,setTest]=useState(null)
    const[course,setCourse]=useState(null)
    const[testScores,setTestScores]=useState(0)
    const[aptitude,setAptitude]=useState(null) 
    const[aptitudeScores,setAptitudeScores]=useState(0)
    const[experience,setExperience]=useState(null)
    const[expValue,setExpValue]=useState(0)
    const currentUser=getAuth(app)
    const navigate=useNavigate()//Note:it should be outside the function


    const closeModal=()=> {
        var model=document.getElementById("main")
        model.className="modal"
        console.log(model)
    }

    const openModal=()=>{
        var model=document.getElementById("main")
        model.className="modal-open"
    }
    const checkValue=()=>{
        console.log(currentUser)
        console.log(currentUser.currentUser.displayName)
    }

    const detailPrint=async()=>{


           await set(ref(database,currentUser.currentUser.uid), {
              username: currentUser.currentUser.displayName,
              email:currentUser.currentUser.email,
              mobile_number:currentUser.currentUser.phoneNumber,
              country:country,
              level:level,
              degree:degree,
              score:score,
              backlogs:backlogs,
              test:test,
              course:course,
              aptitude:aptitude,
              experience:experience,
              aptitudeScores:aptitudeScores,
              testScores:testScores
            });


            navigate("/dashboard")//Note:inside the function
          
    }

  return (
    <div className='container'>
        <div className='modal-open' id='main' data-backdrop='false' style={{borderRadius:190}}>

            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title w-100" id="modalTitleLogin">where do you want to study?</h5>
                    </div>
                    <div className="modal-body">
                        <div className='btn-group'>
                            <div className='container'>
                            <div className='row'>
                                <div className='col' id='studyOption' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>
                                    <input type="radio"  value="United States" id="us" checked={country === "United States"} onChange={(e)=>setcountry(e.target.value)}/>
                                    <label htmlFor="us">United States</label>
                                </div>
                                <div className='col' id='studyOption' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>
                                    <input type="radio"  value="United Kingdom" id="uk" checked={country === "United Kingdom"} onChange={(e)=>setcountry(e.target.value)}/>
                                    <label htmlFor="uk">United Kingdom</label>
                                </div>   
                                <div className='col' id='studyOption' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>
                                    <input type="radio"  value="Australia" id="aus" checked={country === "Australia"} onChange={(e)=>setcountry(e.target.value)}/>
                                    <label htmlFor="aus">Australia</label>
                                </div>                             

                            </div>
                            <div className='row'>
                                <div className='col' id='studyOption' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>
                                    <input type="radio"  value="Canada" id="cn" checked={country === "Canada"} onChange={(e)=>setcountry(e.target.value)}/>
                                    <label htmlFor="cn">Canada</label>
                                </div>
                                <div className='col' id='studyOption' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>
                                    <input type="radio"  value="Singapore" id="sing" checked={country === "Singapore"} onChange={(e)=>setcountry(e.target.value)}/>
                                    <label htmlFor="sing">Singapore</label>
                                </div>   
                                <div className='col' id='studyOption' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>
                                    <input type="radio"  value="France" id="fn" checked={country === "France"} onChange={(e)=>setcountry(e.target.value)}/>
                                    <label htmlFor="fn">France</label>
                                </div>                             

                            </div>
                            <div className='row'>
                                <div className='col' id='studyOption' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>
                                    <input type="radio"  value="Germany" id="germ" checked={country === "Germany"} onChange={(e)=>setcountry(e.target.value)}/>
                                    <label htmlFor="germ">Germany</label>
                                </div>
                                <div className='col' id='studyOption' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>
                                    <input type="radio"  value="New Zealand" id="nz" checked={country === "New Zealand"} onChange={(e)=>setcountry(e.target.value)}/>
                                    <label htmlFor="nz">New Zealand</label>
                                </div>   
                                <div className='col' id='studyOption' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>
                                    <input type="radio"  value="Ireland" id="ire" checked={country === "Ireland"} onChange={(e)=>setcountry(e.target.value)}/>
                                    <label htmlFor="ire">Ireland</label>
                                </div>                             

                            </div>

                            </div>
                        </div>

                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <button className='next' data-target='#degree' disabled={country!=null?false:true} style={{borderRadius:20,backgroundColor:"#483286",color:'white',border:3,padding:8}} onClick={closeModal} data-dismiss='modal' data-toggle='modal' >Next<FontAwesomeIcon icon={faArrowCircleRight}/></button>
                    </div>
                </div>
            
            </div>
        </div>
        <div className='modal' id='degree' data-backdrop='false'>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalTitleDegree"><button  style={{borderRadius:"50%"}} data-dismiss="modal" onClick={openModal}>&lt;</button> What degree do you want to pursue?</h5>
                    </div>
                    <div className="modal-body">
                        <div className='row d-flex justify-content-center'>

                            <div className='col-auto' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>
                                    <input type="radio" value="Bachelors" id="bachelor" checked={degree === "Bachelors"} onChange={(e)=>setDegree(e.target.value)}/>
                                    <label htmlFor="bachelor">Bachelor's</label>
                            </div>
                            <div className='col-auto' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>
                                    <input type="radio" value="Masters" id="master" checked={degree === "Masters"} onChange={(e)=>setDegree(e.target.value)}/>
                                    <label htmlFor="master">Master's</label>
                            </div>   

                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <button className='next' type='submit' style={{borderRadius:20,backgroundColor:"#483286",color:'black',border:3,padding:8}} onClick={checkValue} disabled={degree!=null?false:true} data-target='#edu' data-dismiss='modal' data-toggle='modal'>Next<FontAwesomeIcon icon={faArrowCircleRight}/></button>
                    </div>
                
            </div>

            </div>
        </div>
        <div className='modal' id='edu' data-backdrop='false'>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalTitleDegree">What is your current education level?</h5>
                    </div>
                    <div className="modal-body">
                        <div className='container'>
                            <div className='row d-flex justify-content-center'>
                                <div className="btn-group">
                                <div className='col-auto' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>

                                    <input
                                        type="radio"
                                        value="12th"
                                        id="12th"
                                        checked={level === "12th"}
                                        onChange={(e)=>setLevel(e.target.value)}
                                    />
                                    <label htmlFor="12th">12th</label>
                                </div>
                                <div className='col-auto' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>

                                    <input
                                        type="radio"
                                        value="Bachelor"
                                        id="bachelor1"
                                        checked={level === "Bachelor"}
                                        onChange={(e)=>setLevel(e.target.value)}
                                    />
                                    <label htmlFor="bachelor1">bachelor</label>
                                </div>
                                <div className='col-auto' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>

                                    <input
                                        type="radio"
                                        value="Master"
                                        id="master1"
                                        checked={level === "Master"}
                                        onChange={(e)=>setLevel(e.target.value)}
                                    />
                                    <label htmlFor="master1">master</label>
                                </div>
                            </div>  
                            </div>
                        </div>
                        {level=="12th"?<div><div className='row'>
                                <label htmlFor="score" className="form-label">Enter your marks in %:</label>     
                            </div>
                            <div className='row d-flex justify-content-center'>
                                <input type='number' value={score} onChange={(e)=>setScore(e.target.value)} style={{width:400,borderRadius:10}} placeholder='number'/>  
                            </div>
                            </div>:<div></div>}
                        {level=="Bachelor"?<div><div className='row'>
                                <label htmlFor="score" className="form-label">CGPA</label>     
                            </div>
                            <div className='row d-flex justify-content-center'>
                                <input type='number' value={score} onChange={(e)=>setScore(e.target.value)} placeholder='number'/>  
                            </div>
                            <div className='row'>
                                <label htmlFor="score" className="form-label">Backlogs</label> 
                            </div>
                            <div className='row d-flex justify-content-center'>
                                <input type="range" value={backlogs} onChange={(e)=>setBackLogs(e.target.value)} className="form-range" id="scores" min="0" max="5"/>
                            </div>
                            </div>:<div></div>}
                        {level=="Master"?<div><div className='row'>
                                <label htmlFor="score" className="form-label">CGPA</label>     
                            </div>
                            <div className='row d-flex justify-content-center'>
                                <input type='number' value={score} onChange={(e)=>setScore(e.target.value)} placeholder='number'/>  
                            </div>
                            <div className='row'>
                                <label htmlFor="score" className="form-label">Backlogs</label> 
                            </div>
                            
                            <div className='row d-flex justify-content-center'>
                                <input type="range" value={backlogs} onChange={(e)=>setBackLogs(e.target.value)} className="form-range" id="scores" min="0" max="5"/>
                            </div></div>:<div></div>}

                    </div>
                    <div className="modal-footer">
                        <button className='next'  type='submit' onClick={checkValue} disabled={level!=null && score!=null?false:true} data-target='#study' data-dismiss='modal' data-toggle='modal'>Next<FontAwesomeIcon icon={faArrowCircleRight}/></button>
                    </div>
                
            </div>

            </div>
        </div>

        <div className='modal' id='study' data-backdrop='false'>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalTitleStudy">What is your preferred area of Study?</h5>
                    </div>
                    <div className="modal-body">
                        <div className='container'>
                        <div className='row'>
                                <div className='col-auto' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>
                                    <input type="radio" value="Business and Management" id="business" checked={course === "Business and Management"} onChange={(e)=>setCourse(e.target.value)}/>
                                    <label htmlFor="business">Business and Management</label>
                                </div>
                                <div className='col-auto' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>
                                    <input type="radio" value="Computer Science and IT" id="it" checked={course === "Computer Science and IT"} onChange={(e)=>setCourse(e.target.value)}/>
                                    <label htmlFor="it">Computer Science and IT</label>
                                </div>                        

                        </div>
                        <div className='row'>
                                <div className='col-auto' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>
                                    <input type="radio" value="Engineering" id="engg" checked={course === "Engineering"} onChange={(e)=>setCourse(e.target.value)}/>
                                    <label htmlFor="engg">Engineering</label>
                                </div>
                                <div className='col-auto' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>
                                    <input type="radio" value="Social Science" id="soc" checked={course === "Social Science"} onChange={(e)=>setCourse(e.target.value)}/>
                                    <label htmlFor="soc">Social Science</label>
                                </div>         
                                <div className='col-auto' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>
                                    <input type="radio" value="Architecture" id="arch" checked={course === "Architecture"} onChange={(e)=>setCourse(e.target.value)}/>
                                    <label htmlFor="arch">Architecture</label>
                                </div>                

                        </div>
                        <div className='row'>
                                <div className='col-auto' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>
                                    <input type="radio" value="Professional Studies" id="ps" checked={course === "Professional Studies"} onChange={(e)=>setCourse(e.target.value)}/>
                                    <label htmlFor="ps">Professional Studies</label>
                                </div>
                                <div className='col-auto'style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>
                                    <input type="radio" value="Hospitality and Tourism" id="hos" checked={course === "Hospitality and Tourism"} onChange={(e)=>setCourse(e.target.value)}/>
                                    <label htmlFor="hos">Hospitality and Tourism</label>
                                </div>         

                        </div>
                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <button className='next' type='submit' style={{borderRadius:20,backgroundColor:"#483286",color:'black',border:3,padding:8}} onClick={checkValue} disabled={course!=null?false:true} data-target='#test' data-dismiss='modal' data-toggle='modal'>Next<FontAwesomeIcon icon={faArrowCircleRight}/></button>
                    </div>
                
            </div>

            </div>
        </div>
        <div className='modal' id='test' data-backdrop='false'>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalTitleTest">Which english test did you take?</h5>
                    </div>
                    <div className="modal-body">
                        <div className='container'>
                        <div className='row'>
                                <div className='col-auto' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>
                                    <input type="radio" value="toefl" id="toefl" checked={test === "toefl"} onChange={(e)=>setTest(e.target.value)}/>
                                    <label htmlFor="toefl">TOEFL</label>
                                </div>
                                <div className='col-auto' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>
                                    <input type="radio" value="ielts" id="ielts" checked={test === "ielts"} onChange={(e)=>setTest(e.target.value)}/>
                                    <label htmlFor="ielts">IELTS</label>
                                </div>         
                                <div className='col-auto' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>
                                    <input type="radio" value="pte" id="pte" checked={test === "pte"} onChange={(e)=>setTest(e.target.value)}/>
                                    <label htmlFor="pte">PTE</label>
                                </div>        
                                <div className='col-auto' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>
                                    <input type="radio" value="none" id="none" checked={test === "none"} onChange={(e)=>setTest(e.target.value)}/>
                                    <label htmlFor="none">None</label>
                                </div>            

                        </div>
                        {(test=="toefl")||(test=="ielts")||(test=="pte")? 
                        <div className='row'>
                                <label htmlFor="scores" className="form-label">select your score</label>
                                <input type="range" value={testScores} onChange={(e)=>setTestScores(e.target.value)} className="form-range" id="scores" min="0" max="120"/>           
                        </div>
                        :<div></div>}

                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <button className='next' type='submit' style={{borderRadius:20,backgroundColor:"#483286",color:'black',border:3,padding:8}} onClick={checkValue} disabled={test!=null && testScores!=null?false:true} data-target='#apt' data-dismiss='modal' data-toggle='modal'>Next<FontAwesomeIcon icon={faArrowCircleRight}/></button>
                    </div>
                
            </div>

            </div>
        </div>
        <div className='modal' id='apt' data-backdrop='false'>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalTitleStudy">Which aptitude test did you take?</h5>
                    </div>
                    <div className="modal-body">
                        <div className='container'>
                        <div className='row d-flex justify-content-center'>
                                <div className='col-auto' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>
                                    <input type="radio" value="gre" id="gre" checked={aptitude === "gre"} onChange={(e)=>setAptitude(e.target.value)}/>
                                    <label htmlFor="gre">GRE</label>
                                </div>
                                <div className='col-auto' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>
                                    <input type="radio" value="gmat" id="gmat" checked={aptitude === "gmat"} onChange={(e)=>setAptitude(e.target.value)}/>
                                    <label htmlFor="gmat">GMAT</label>
                                </div>         
                                <div className='col-auto' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>
                                    <input type="radio" value="none" id="none" checked={aptitude === "none"} onChange={(e)=>setAptitude(e.target.value)}/>
                                    <label htmlFor="none">None</label>
                                </div>            

                        </div>
                        {(aptitude=='gre')||(aptitude=='gmat')?
                        <div className='row'>
                                <label htmlFor="score" className="form-label">What is your score?</label>
                                <input type="range" value={aptitudeScores} onChange={(e)=>setAptitudeScores(e.target.value)} className="form-range" id="score" min="0" max="340"/>           
                            </div>
                        :<div></div>}
                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <button className='next' type='submit' style={{borderRadius:20,backgroundColor:"#483286",color:'black',border:3,padding:8}} onClick={checkValue} disabled={aptitude!=null && aptitudeScores!=null?false:true} data-target='#exp' data-dismiss='modal' data-toggle='modal'>Next<FontAwesomeIcon icon={faArrowCircleRight}/></button>
                    </div>
                
            </div>

            </div>
        </div>
        <div className='modal' id='exp' data-backdrop='false'>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalTitleExp">Do you have any work experience?</h5>
                    </div>
                    <div className="modal-body">
                        <div className='container'>
                            <div className='row d-flex justify-content-center'>
                                <div className='col-auto' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>
                                    <input type="radio" value="yes" id="yes" checked={experience === "yes"} onChange={(e)=>setExperience(e.target.value)}/>
                                    <label htmlFor="yes">Yes</label>
                                </div>
                                <div className='col-auto' style={{borderRadius:20,backgroundColor:"#eeeeee",color:'black',border:3}}>
                                    <input type="radio" value="No" id="No" checked={experience === "No"} onChange={(e)=>setExperience(e.target.value)}/>
                                    <label htmlFor="No">No</label>
                                </div>          
                            </div>
                            {experience=='yes'?
                            <div className='row'>
                                <label htmlFor="experience" className="form-label">how many years of experience</label>
                                <input type="range" value={expValue} onChange={(e)=>setExpValue(e.target.value)} className="form-range" id="experience" min="0" max="5"/>           
                            </div>:<div></div>}
                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <button className='next' style={{borderRadius:20,backgroundColor:"#483286",color:'black',border:3,padding:8}} type='submit' disabled={experience!=null?false:true} onClick={detailPrint}>Next<FontAwesomeIcon icon={faArrowCircleRight}/></button>
                    </div>
                
            </div>

            </div>
        </div>


    </div>
  )
}

export default Setup;
