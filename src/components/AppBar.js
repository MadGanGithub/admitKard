import React, { useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import PhoneInput from 'react-phone-input-2'
import { getAuth,signOut, signInWithPhoneNumber,RecaptchaVerifier,updateProfile,updateEmail } from "firebase/auth";
import 'react-phone-input-2/lib/style.css'
import {app} from "../config/firebase.js";
import {database,useAuth} from "../config/firebase.js";
import {ref, set} from "firebase/database";
import {useLocation, useNavigate} from "react-router-dom";



const AppBar = () => {

    const currentUser=getAuth(app)
    const[number,setNumber]=useState("");
    const[otp, setOtp] = useState("");
    const[showOTP, setShowOTP] = useState(false);
    const[loading, setLoading] = useState(false);
    const[user, setUser] = useState(null);
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
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
                console.log("shit")
                onSignup();
              },
              "expired-callback": () => {},
            },
            auth
          );
        }
    
      }
    
    
      function onSignup() {
        console.log("test1")
        setLoading(true);
        onCaptchVerify();
        console.log("test2")
    
    
        const appVerifier = window.recaptchaVerifier;
    
    
        const formatPh = "+" + number;
    
    
        signInWithPhoneNumber(auth, formatPh, appVerifier)
          .then((confirmationResult) => {
            console.log("test3")
            window.confirmationResult = confirmationResult;
            setLoading(false);
            setShowOTP(true);
            console.log(confirmationResult)
            console.log("OTP sended successfully!")
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      }

      const signout=()=>{
        
        signOut(auth).then(() => {
          // Sign-out successful.
          console.log("Signout successfully")
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
            console.log(res);
            setUser(res.user);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err+"dddd");
            setLoading(false);
          });


      }
      
      const writeDetail=async()=>{
        console.log("shit happens")

        // getAuth().getUserByPhoneNumber('+'+number)
        // .then((userRecord) => {
        //   // See the UserRecord reference doc for the contents of userRecord.
        //   console.log(`Successfully fetched user data: irukku`);
        // })
        // .catch((error) => {
        //   console.log('Error fetching user data:', error);
        // });

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
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light" >
  <a className="navbar-brand" href="#">AdmitKard</a>
  
  <div className="collapse navbar-collapse" id="navbarSupportedContent">

    <ul className="navbar-nav mr-auto">
    
    {currentUser.currentUser!=null?
          <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {currentUser.currentUser.displayName}
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="/profile">{currentUser.currentUser.displayName}</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" onClick={signout}>Logout</a>
          </div>
        </li>:<div></div>}  

      {((currentUser.currentUser!=null) && (location.pathname=='setup' || location.pathname=='profile' || location.pathname=='dashboard'))?
      <div></div>:<li className="nav-item">
        <button type="button" className="btn" data-toggle="modal" data-target="#login">Login</button>    

        <div className='modal' id='login'>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalTitleLogin">Let's get started</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className='container'>
                            
                                <div className='row'>
                                    <PhoneInput country={"in"} value={number} onChange={setNumber} />
                                    <div id='recaptcha-container'></div>
                                    </div>
                                <div className='row'>
                                    <button onClick={onSignup} disabled={number.length==12?false:true} id="sign-in-button" data-target="#otp" data-dismiss="modal" data-toggle="modal">Continue<FontAwesomeIcon icon={faArrowCircleRight}/></button>
                                </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        By continuing, you agree to our <a href="#">Terms of Service</a>  & <a href='#'>Privacy policy</a>

                    </div>
                </div>
            </div>
        </div>

            <div className='modal' id='otp'>
            <div className="modal-dialog modal-dialog-centered" role="document" style={{maxHeight:100}}>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <div className='container'>
                        <div className='row'>
                            <h5 className="modal-title" id="modalTitleOtp">Enter the OTP to send</h5>
                        </div>
                        <div className='row'>
                            <h6>{number}<a data-dismiss="modal" data-target="#login" data-toggle="modal">change</a></h6>
                        </div>
                        </div>
                    </div>
                    <div className='modal-body'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-auto'>
                                    <input type='text' value={otp} onChange={(e)=>setOtp(e.target.value)}></input>
                                </div>

                            </div>
                            <div className='row'>
                                <button type='submit' onClick={onOTPVerify} disabled={otp.length==6?false:true} data-target="#name" data-dismiss="modal" data-toggle="modal">Continue<FontAwesomeIcon icon={faArrowCircleRight}/></button>
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
                        <h5 className="modal-title" id="modalTitleName">Let's get started</h5>
                    </div>
                    <div className='modal-body'>
                        <div className='container'>
                            <div className='row'>
                                <input type='text' placeholder='Full name' value={name} onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <div className='row'>
                                <input type='email' placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                            </div>
                            <div className='row'>
                                <button type='submit' className='btn' data-dismiss='modal' disabled={(name.length>0 && email.endsWith("@gmail.com")==true)?false:true} onClick={writeDetail}>Continue<FontAwesomeIcon icon={faArrowCircleRight}/></button>
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
</nav>  



</div>
  )
}

export default AppBar
