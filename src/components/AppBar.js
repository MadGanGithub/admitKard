import React, { useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import PhoneInput from 'react-phone-input-2'
import { getAuth,signOut,onAuthStateChanged,signInWithPhoneNumber,RecaptchaVerifier,updateProfile,updateEmail } from "firebase/auth";
import 'react-phone-input-2/lib/style.css'
import {app} from "../config/firebase.js";
import {database,useAuth} from "../config/firebase.js";
import {ref, set} from "firebase/database";
import {useLocation, useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import title from "../assets/title.png";
import $ from 'jquery';



const AppBar = () => {

    const currentUser=getAuth(app)
    const[number,setNumber]=useState("");
    const[otp, setOtp] = useState("");
    const[showOTP, setShowOTP] = useState(false);
    const[loading, setLoading] = useState(false);
    const[user, setUser] = useState(null);
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[signedState,setSignedState]=useState(false)
    const navigate=useNavigate()//Note:it should be outside the function
    const location=useLocation();

    const auth = getAuth(app)
    auth.languageCode = 'en';

    

    function onCaptchVerify() {
        
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
              size: "invisible",
              callback: (response) => {
              
                onSignup();
              },
              "expired-callback": () => {},
            },
            auth
          );
        }
    
      }
    
    
      function onSignup() {
      
        setLoading(true);
        onCaptchVerify();
    
    
        const appVerifier = window.recaptchaVerifier;
    
    
        const formatPh = "+" + number;
    
    
        signInWithPhoneNumber(auth, formatPh, appVerifier)
          .then((confirmationResult) => {

            window.confirmationResult = confirmationResult;
            setLoading(false);
            setShowOTP(true);
            toast.success("OTP sended successfully!")
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      }

      const signout=()=>{
        
        signOut(auth).then(() => {
          // Sign-out successful.
          toast.success("Signout successfully")
          navigate("/")
        }).catch((error) => {
          // An error happened.
        });
      }
    
    
      function onOTPVerify() {
        console.log("onOtpVerify")
        setLoading(true);
        window.confirmationResult
          .confirm(otp)
          .then(async (res) => {
            toast.success("OTP has been successfully verified")
            setUser(res.user);
            
            if(res.user.auth.currentUser.displayName!=null && res.user.auth.currentUser.email!=null){
              setSignedState(true)
              console.log("sdfdfsdfsdf")
          
              navigate("/dashboard")
              
        
              
            }
          
            setLoading(false);


          })
          .catch((err) => {
            console.log(err+"dddd");
            setLoading(false);
          });




      }
      
      const writeDetail=async()=>{



          await updateProfile(auth.currentUser, {
            displayName: name
          }).then(async() => {
            console.log("Profile created")
            await updateEmail(auth.currentUser, email).then(() => {
                console.log("email updated")
                navigate("/setup")
              }).catch((error) => {
                console.log(error)
              });
          }).catch((error) => {
            console.log(error)
          });
          
        

      }    

  return (
    <div style={{backgroundColor:"white"}}>
    <nav className="navbar navbar-expand-lg shadow">
      <div className='row' style={{width:"100%"}}>
        <div className='col-auto'>
        <a className="navbar-brand" href="/"><img src={title} alt='AdmitKard' style={{height:30,width:200}}/></a>
        </div>
      


  <div className='col' style={{display:'flex',flexDirection:'column',
  alignItems:'flex-end',
  justifyContent:'flex-end'}}>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">

    <ul className="navbar-nav mr-auto">
    
    {/* {currentUser.currentUser!=null?
    
          <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {currentUser.currentUser.displayName}
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="/profile">{currentUser.currentUser.displayName}</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" onClick={signout}>Logout</a>
          </div>
        </li>:<div></div>}  */}

      {location.pathname=="profile" || location.pathname=="dashboard"?<div></div>:
      <li className="nav-item">
        <button type="button" style={{borderRadius:20}} className="btn" data-toggle="modal" data-target="#login">Login</button>    

        <div className='modal' id='login' data-keyboard="false" data-backdrop="static">
            <div className="modal-dialog modal-dialog-centered" style={{alignContent:'center'}} role="document" >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title w-100" id="modalTitleLogin">Let's get started</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className='container d-flex justify-content-center'>
                            
                                <div className='row' >
                                    <PhoneInput country={"in"} value={number} onChange={setNumber} />
                                    <div id='recaptcha-container'></div>
                                    </div>
                        </div>
                        <br></br>
              
                        <div className='container d-flex justify-content-center'>
                                    
                                <div className='row'>
                                    <button  onClick={onSignup} style={{borderRadius:20,backgroundColor:"#483286",color:'white',padding:8}} disabled={number.length==12?false:true} id="sign-in-button" data-target="#otp" data-dismiss="modal" data-toggle="modal">Continue<FontAwesomeIcon icon={faArrowCircleRight}/></button>
                                </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        By continuing, you agree to our <a href="#">Terms of Service</a>  & <a href='#'>Privacy policy</a>

                    </div>
                    
                </div>
            </div>
        </div>
        <ToastContainer/>
            <div className='modal' id='otp' data-keyboard="false" data-backdrop="static">
            <div className="modal-dialog modal-dialog-centered" role="document" style={{maxHeight:100}}>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <div className='container'>
                        <div className='row'>
                            <h5 className="modal-title w-100" id="modalTitleOtp">Enter the OTP to send</h5>
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <h6>{'+'+number+" "}<a data-dismiss="modal" data-target="#login" data-toggle="modal">change</a></h6>
                        </div>
                        </div>
                    </div>
                    <div className='modal-body'>
                        <div className='container'>
                            <div className='row d-flex justify-content-center'>
                                <div className='col-auto '>
                                    <input type='text' value={otp} onChange={(e)=>setOtp(e.target.value)}></input>
                                </div>

                            </div>
                            <br></br>
                            <div className='row d-flex justify-content-center'>
                                <button type='submit' style={{borderRadius:20,backgroundColor:"#483286",color:'white',padding:8}} id='otpButton' onClick={onOTPVerify} disabled={otp.length==6?false:true} data-target="#name" data-dismiss="modal" data-toggle="modal">Continue  <FontAwesomeIcon icon={faArrowCircleRight}/></button>
                            </div>
                            <div className="modal-footer">
                                By continuing, you agree to our <a href="#">Terms of Service</a>  & <a href='#'>Privacy policy</a>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className='modal' id='name'>
            <div className="modal-dialog modal-dialog-centered" role="document" style={{maxHeight:100}}>
            <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className="modal-title w-100" id="modalTitleName" >Let's get started</h5>
                    </div>
                    <div className='modal-body'>
                        <div className='container'>
                            <div className='row d-flex justify-content-center'>
                                <input type='text' style={{borderRadius:20}} placeholder='Full name' value={name} onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <br></br>
                            <div className='row d-flex justify-content-center'>
                                <input type='email' style={{borderRadius:30}} placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                            </div>
                            <br></br>
                            <div className='row d-flex justify-content-center'>
                                <button type='submit' style={{borderRadius:20,backgroundColor:"#483286",color:'white',padding:8}} className='btn' data-dismiss='modal' disabled={(name.length>0 && email.endsWith("@gmail.com")==true)?false:true} onClick={writeDetail}>Continue<FontAwesomeIcon icon={faArrowCircleRight}/></button>
                            </div>
                       
                            <div className="modal-footer">
                                By continuing, you agree to our <a href="#">Terms of Service</a>  & <a href='#'>Privacy policy</a>

                            </div>


                        </div>
                    </div>
                </div>

            </div>
        </div>

      </li>}
    </ul>
  </div>
  </div>
  </div>
</nav>  



</div>
  )
}

export default AppBar
