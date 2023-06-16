import type { AppProps } from 'next/app'
import React, { useState } from 'react'
import Head from 'next/head'
import axios from "axios"
import bg from "public/imgg.jpg"
import { useRouter } from 'next/router'

function login(props: AppProps): JSX.Element {
    const [id, setId] = useState("");
    const [pass,setPass] = useState("")
    const [show,setShow] = useState(false);
    const [isError,setIserror] = useState(false);
    const [isIdVerified,setIsIdVerified] = useState(false);
    const { Component, pageProps } = props
    console.log('test')
    let router= useRouter()
    const handleSubmit = async ()=>{
        try{
            console.log(id)
            const data = await axios.get(`/api/login?id=${id}`);
            if(isIdVerified){
                const data = await axios.post("/api/login",{
                    id:id,
                    password:pass
                });
                if(data.status===201){
                    setIserror(true)
                }
                else if(data.status===200){
                    router.push("/welcome")
                }
                
                setIsIdVerified(false);
            }
            else if(Boolean(data.data?.id) && !isIdVerified){
                setShow(true);
                setIsIdVerified(true);
                console.log("user exists!")
            } else{
                router.push('/register')
            }
            console.log(data);

        }catch(e){
            console.log(e)
        }
    }
    return (
        
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"100vh",background:`url(${bg.src})`,backgroundSize: "cover",
        backgroundRepeat: "no-repeat"}}>
        <h1 style={{color:"purple"}}>Enter the Reader ID</h1>
        <input type='text' onChange={(e)=>setId(e.target.value)}></input>
        <br />
        <div style={{display:show ? "flex" : "none",flexDirection:"column",alignItems:"center"}}>
        <div style={{fontSize:"10px",}}>Please! write in format dd/mm/yyyy </div>
        <div>
        <input type="text"   onChange={(e)=>setPass(e.target.value)} ></input>
        </div>
        <br />
        </div>
      
        <br />
        <p style={{color:"red",fontWeight:"bold",display:isError ? "flex" : "none"}}>Wrong Password!</p>
        <button style={{cursor:"pointer",padding:"0.225rem",border:"none",outline:"none",background:"purple",color:"white",borderRadius:"0.225rem"}}  onClick={handleSubmit}>SUBMIT</button>

        </div>
        
        
        )
    }


export default login