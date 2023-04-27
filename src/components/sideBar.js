import React from 'react'
import { signOut,getAuth } from "firebase/auth";
import { app } from '../config/firebase.js';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import {Link} from 'react-router-dom';

const SideBar = () => {

    const navigate=useNavigate()
    const signout=()=>{
        const auth = getAuth(app)
        signOut(auth).then(() => {
          // Sign-out successful.
          toast.success("Signout successfully")
          navigate("/")
        }).catch((error) => {
          // An error happened.
        });
      }
  return (
<div class="container shadow" style={{backgroundColor:'white',width:200,height:"100%"}}>
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">

                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li class="nav-item">
                        <a href="/dashboard" class="nav-link align-middle px-0" style={{color:'black'}}>
                            <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">DashBoard</span>
                        </a>
                    </li>
                    <li>
                        <a href='/profile' class="nav-link px-0 align-middle" style={{color:'black'}}>
                             <span class="ms-1 d-none d-sm-inline">Profile</span> </a>
                    </li>
                    <li>
                        <button onClick={signout} class="nav-link px-0 align-middle" style={{borderRadius:20,backgroundColor:'white',border: 0}}>
                             <span class="ms-1 d-none d-sm-inline">LogOut</span> </button>
                    </li>
                </ul>
                <hr/>
            </div>
<ToastContainer/>
</div>
  )
}

export default SideBar
