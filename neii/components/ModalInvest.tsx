import { useEffect, useState } from "react";
import Image from "next/image";
//import styles from '../../styles/Creator/MyPage/MyPage.module.css'
//import { ConnectButton } from '@rainbow-me/rainbowkit';
//import Link from "next/link";
//import {useAccount} from "wagmi";
/*import {
    Button,
    Typography,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";*/
//import { FaHouse } from "react-icons/fa6";
//import {GoHome, GoSearch} from "react-icons/go";

//import { FaAngleDown } from "react-icons/fa";
/*


*/
export const ModalInvest = ({display, displayToggle, project}) => {

    return(
        <div className={""} style={{
            backgroundImage: "linear-gradient(180deg,#0c111c,#0f1421 14.87%,#10131a 29.77%,#19191b 50%)",
            borderRadius:"10px",
            position:"fixed",
            top:"29vh",
            left:"37.5%",
            width:"25%",
            minWidth:"280px",
            height:"280px",
            color:"white",
            padding:"10px",
            boxShadow: "0px 2px 8px -1px white",
            display: (display) ? "block" : "none",
            fontFamily: "Arimo"
        }}>
            <div >
                <div style={{textAlign:"center", padding:"10px 0px 20px 0px"}}>
                    <h1>Invest</h1>
                </div>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <div>Balance:</div>
                    <div>342 NULS</div>
                </div>
                <div style={{display:"flex", backgroundColor:"white", borderRadius:"4px", marginTop:"6px", padding:"0px 0px"}}>
                    <div>
                        <input style={{padding:"10px"}} />
                    </div>
                    <div>
                        <button style={{padding:"10px"}}>Max</button>
                    </div>
                </div>
                <div style={{padding:"10px 0px"}}>
                    <div>
                        <div>
                            Total Amount of Tokens:
                        </div>
                        <div>
                            29 ORA
                        </div>
                    </div>
                    <div>
                        <div>
                            Project:
                        </div>
                        <div>
                            29 ORA
                        </div>
                    </div>
                </div>
                <div style={{display:"flex",textAlign:"center"}}>
                    <button onClick={() => displayToggle(false)} style={{padding:"5px 10px", width:"50%"}}>Cancel</button>
                    <button style={{padding:"5px 10px", width:"50%"}}>Invest</button>
                </div>
            </div>

        </div>
    )
}