import '../App.css';
import React from 'react';
import LogButtons from '../components/google_in_out';


function AccountLogin() { 
  return (
    <>
    <div className='account-login-bg'>
        <div className='flex text-center text-9xl font-serif mt-56 ml-[850px]'>
            Pokédiex
            <img src={"pikachu.png"} alt="pikachu" className='h-80'></img>
        </div>
        <div className='text-center mt-28'>
            <LogButtons></LogButtons>
        </div>
    </div>

    </>  );
}
export default AccountLogin;
