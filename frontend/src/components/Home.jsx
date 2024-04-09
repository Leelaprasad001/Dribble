import React, { useState } from 'react';
import '../App.css'
import NavBar from './Navbar';
import Footer from './Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faAnglesDown } from '@fortawesome/free-solid-svg-icons';

export default function Home({ email, sendFrom }) {
    
  return (
    <>
        <NavBar />
        {sendFrom === 'register' ? (
            <div className="rcol text-center mt-10 pt-10">
              <h1 style={{ fontSize: '1.6rem', fontWeight: 'bold'}}>Please verify your email...</h1>
              <FontAwesomeIcon icon={ faEnvelope } style={{ fontSize: '80px', color: '#B4B4B8', padding:'2rem' }} className='icn'/>
              <p className="mb-2">Please verify your email address. We've sent a confirmation email</p>
              <p className="mb-3" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{email}</p>
              <p className="mb-3">Click the confirmation link in that email to begin using Dribble</p>
              <p className="mb-3">Don't receive the email? Check your Spam folder, it may have been caught by a filter. If</p>
              <p className="mb-3">you still don't see it, you can <span style={{color:'#D20062'}}>resend the confirmation email</span></p>
              <p className="mb-3">Wrong email address? <span style={{color:'#D20062'}}>Change it...</span></p>
              <p className="mb-3">Email Verified... <a href="/login" className="text-blue-500">Sign In</a></p>
          </div>
        ) : (
          <div className="rcol main container-fluid">
            <div className="row">
              <div className="col">
                <div className="banner text-center">
                  <h1>Welcome to Dribble</h1>
                  <p className="lead">Dribble is the world's leading Community for creatives to share , grow, and get hired</p>
                </div>
                <div className="arrow-down">
                  <span><FontAwesomeIcon icon={faAnglesDown} size="3x" className='icn2'/></span>
                </div>
              </div>
            </div>
          </div>

        )}
        <Footer />
    </>
  );
}
