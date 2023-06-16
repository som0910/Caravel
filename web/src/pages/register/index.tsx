import type { AppProps } from 'next/app'
import React from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import { useState, ChangeEvent } from 'react';
import axios from "axios";
import { useRouter } from 'next/router';
const MyForm = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDOB] = useState('');
  const [gender, setGender] = useState('');

  let router= useRouter()
  const handleFirstNameChange = (event:ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleMiddleNameChange = (event :ChangeEvent<HTMLInputElement> ) => {
    setMiddleName(event.target.value);
  };

  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleDOBChange = (event : ChangeEvent<HTMLInputElement>) => {
    setDOB(event.target.value);
  };

  const handleGenderChange = (event :ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
  };

  const handleSubmit = async () => {
    // Call your API here with the form data
    const formData = {
      firstName,
      middleName,
      lastName,
      dob,
      gender
    };

    console.log(formData)
    try{
        const data  = await axios.post("/api/user",formData);
        console.log(data);
        if(data.status===200){
            router.push("/login");
        }else{
            console.log("something happened!")
        }
    }catch(e){
        console.log(e)
    }
  };

  return (
    <>
     <h1 style={{textAlign:"center",color:"purple"}}>Welcome! Kids, Please Register Yourself</h1>
    <div className="container" style={{display: "flex", flexDirection:"column",height:"70vh", alignItems: "center", justifyContent: "center"}}>
       
        <div style={{display:"flex",gap:"0.125rem",flexDirection:"column"}}>
        <label>
        First Name:
        <input type="text" value={firstName} onChange={handleFirstNameChange} />
      </label>
      <br />
      <label>
        Middle Name:
        <input type="text" value={middleName} onChange={handleMiddleNameChange} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" value={lastName} onChange={handleLastNameChange} />
      </label>
      <br />
      <label>
        Date of Birth:
        <input type="date" value={dob} onChange={handleDOBChange} />
      </label>
      <br />
      <label>
        Gender:
        <select value={gender} onChange={handleGenderChange}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <br />
      <button style={{
    borderRadius: '10%',
    backgroundColor: 'purple',
    color: 'white',
    border:"none",
    padding:"0.225rem",
    outline:"none",
    cursor:"pointer"
    
  }} onClick={handleSubmit}>Submit</button>
        </div>
    </div>
    </>
  );
};

export default MyForm;