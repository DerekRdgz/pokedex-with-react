import '../App.css';
import React from 'react';
import SignIn from '../components/login';


function AccountLogin() { 
  return (
    <>
    <div className='account-login-bg'>
        <div className='flex text-center text-9xl font-serif mt-56 ml-[850px]'>
            Pokédiex
        </div>

        <SignIn></SignIn>
    </div>

    </>  );
}
export default AccountLogin;
