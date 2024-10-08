import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Link from "next/link";
import {ModalInvest} from "../components/ModalInvest";
import {useEffect, useState} from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import {ListProject} from "../components/ListProject";
import NaboxWindow from "../types/NaboxWindow";
import BigNumber from "bignumber.js";
import axios from "axios";
import {Menu} from "../components/Menu";
import {FaCircleInfo} from "react-icons/fa6";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {


    const [api, setAPI] = useState([])
    const [account, setAccount] = useState("")

    useEffect(() => {

        async function getProjects(){
            try{
                const response = await fetch("/projects.json", {
                    method: "GET",
                }).then( (res) => res.json()).then((data) => setAPI(data))
            }catch (error){
                console.log(error)
            }
        }
        getProjects()
    }, [])

    useEffect(() =>{

        async function getTokenBalance() {

            const naboxInfo:any = await (window as unknown as NaboxWindow).nabox.createSession();
            console.log(naboxInfo)
            const address = naboxInfo[0];
            setAccount(address)



        }
        getTokenBalance()
    },[])

    useEffect(() => {
        var userDevice = navigator.userAgent;
        if (
            !userDevice.match(/Android|webOS|iPhone|iPod|BlackBerry/i) &&
            typeof (window as unknown as NaboxWindow).nabox != "undefined"
        ) {
            (window as unknown as NaboxWindow).nabox.on(
                "accountsChanged",
                (accounts) => {
                    if (accounts.length) {
                        localStorage.setItem("address", accounts[0]);
                        setAccount(accounts[0]);
                    }
                }
            );
        }
    }, []);



  return (
    <>
      <Head>
        <title>NULS ECOSYSTEM IGNITION INITIATIVE</title>
        <meta name="description" content="Nuls Ecosystem Ingition Initiative" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/neii.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
                  <link
                      href="https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400..700;1,400..700&display=swap"
                      rel="stylesheet"/>
      </Head>
      <main className={styles.main} style={{backgroundImage: "linear-gradient(180deg,#0c111c,#0f1421 14.87%,#10131a 29.77%,#19191b 50%)"}}>
          <Menu account={account}/>
       <div>
           <div style={{textAlign:"center"}}>
               <Image src={"/neii.png"} alt={""} width={100} height={100} style={{borderRadius:"50%"}}/>
           </div>
           <div style={{fontSize:"50px", color:"white", marginTop:"20px", textAlign:"center"}}>
               NULS ECOSYSTEM IGNITION INITIATIVE
           </div>
           <div style={{padding:"45px", textAlign:"center", display:"flex", justifyContent:"center"}}>
               <Link href="https://docs.google.com/document/d/19rbXoD9onFbnvLUCfynYRmlWj-z7Dp9fK-ZcIR6_gPc/edit?usp=sharing" target="_blank">
                   <button style={{padding:"10px", display:"flex", justifyContent:"center", alignItems:"center", fontWeight:"bold", cursor:"pointer", border:"0px", color:"white", backgroundColor:"rgb(50, 224, 141)", borderRadius:"4px"}}>

                       <div style={{marginTop:"2px", padding:"0px 8px"}}>
                           <FaCircleInfo />
                       </div>
                       <div>
                           Know More About Us
                       </div>
                      </button>

               </Link>
             </div>
           <div style={{backgroundColor:"rgba(114, 117, 126, 0.1)", color:"white", width:"100%", minWidth:"300px", borderRadius:"10px", padding:"10px 20px"}}>
                <div className={styles.listProject} style={{fontWeight:"bold"}}>
                    <div>
                        Project
                    </div>
                    <div>
                        MAX ROI
                    </div>
                    <div>
                        Current ROI
                    </div>
                    <div>
                        STATUS
                    </div>
                </div>

               {
                   (api.length > 0 ) ? api.map((coin:any) =>
                        <ListProject key={coin.id} coin={coin} account={account}/>
                   )
                       :
                       <>No Projects Listed!</>
               }

           </div>
       </div>

      </main>

    </>
  )
}
