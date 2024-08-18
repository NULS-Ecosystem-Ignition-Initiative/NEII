import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import axios from "axios";
import Image from "next/image";
import NaboxWindow from "../types/NaboxWindow";
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

interface Props{
    display:boolean,
    displayToggle:any
    project:any
}
export const ModalInvest: React.FC<Props>  = ({display, displayToggle, project}) => {

    const [balanceNuls, setBalanceNuls] = useState("")
    const [valueIn, setValueIn] = useState("0")

    const ip1 = "https://api.nuls.io/";



    useEffect(() =>{

        async function getTokenBalance() {

            const naboxInfo:any = await (window as unknown as NaboxWindow).nabox.createSession();
            console.log(naboxInfo)
            const address = naboxInfo[0];
            return new Promise((resolve, reject) => {
                BigNumber.config({ DECIMAL_PLACES: 8 });

                axios
                    .post(
                        ip1 + "api/accountledger/balance/" + address,
                        {
                            assetChainId: 1,
                            assetId: 1,
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    )
                    .then(function (response) {
                        var data = response.data;
                        let amountBal = data.data.available;
                       /* var displayBal = new BigNumber(amountBal)
                            .dividedBy(Math.pow(10, 8))
                            .toString();*/
                        setBalanceNuls(amountBal)

                    })
                    .catch(function (error) {});

            });
        }
        getTokenBalance()
    },[])

    async function max(){

        setValueIn(new BigNumber(balanceNuls).dividedBy(Math.pow(10, 8))
            .toString())

    }


    return(
        <div style={{
            position:"fixed",
            top:"0vh",
            left:"0%",
            width:"100%",
            height:"100%",
            backgroundColor:"rgba(0,0,0,0.5)",
            display:(display) ? "block" : "none",
        }} onClick={(e) => {
            if(e.target === e.currentTarget)
                displayToggle(false);
        } } >
            <div className={""} style={{
                backgroundImage: "linear-gradient(180deg,#0c111c,#0f1421 14.87%,#10131a 29.77%,#19191b 50%)",
                borderRadius:"10px",
                position:"fixed",
                top:"29vh",
                left:"37.5%",
                width:"25%",
                minWidth:"280px",
                height:"360px",
                color:"white",
                padding:"10px",
                boxShadow: "0px 2px 8px -1px white",
                display: (display) ? "block" : "none",
                fontFamily: "Arimo"
            }} onClick={() =>{}}>
                <div >
                    <div style={{textAlign:"center", padding:"10px 0px 20px 0px"}}>
                        <h1>Invest</h1>
                    </div>
                    <div style={{display:"flex", justifyContent:"space-between", marginTop:"10px"}}>
                        <div>Balance:</div>
                        <div>{new BigNumber(balanceNuls)
                            .dividedBy(Math.pow(10, 8))
                            .toString() + "NULS"}</div>
                    </div>
                    <div style={{display:"flex", backgroundColor:"white", borderRadius:"8px", marginTop:"6px", padding:"0px 0px"}}>
                        <div style={{width:"calc(100% - 50px)",  borderRadius:"8px"}}>
                            <input id="investAmount" style={{padding:"10px",
                                border:"0px",
                                outline:"none",
                                width:"100%",
                                borderRadius:"4px",
                                fontSize:"16px"
                            }} type="number" value={valueIn} placeholder="Ex: 100 NULS" min="1"/>
                        </div>
                        <div style={{width:"50px"}}>
                            <button
                                onClick={() => max()}
                                style={{padding:"10px", border:"0px", fontWeight:"bold", cursor:"pointer", backgroundColor:"transparent"}}>Max</button>
                        </div>
                    </div>
                    <div style={{padding:"10px 0px"}}>
                        <div style={{display:"flex", justifyContent:"space-between", padding:"10px 0px"}}>
                            <div>
                                Total Amount of Tokens:
                            </div>
                            <div>
                                29 ORA
                            </div>
                        </div>
                        <div style={{display:"flex", justifyContent:"space-between", padding:"10px 0px"}}>
                            <div>
                                Already Raised:
                            </div>
                            <div>
                                2342 NULS
                            </div>
                        </div>
                        <div style={{display:"flex", justifyContent:"space-between", padding:"10px 0px"}}>
                            <div>
                                Already Holding:
                            </div>
                            <div>
                                29 ORA
                            </div>
                        </div>
                        <div style={{display:"flex", justifyContent:"space-between", padding:"5px 0px"}}>
                            <div>
                                Project:
                            </div>
                            <div>
                                29 ORA
                            </div>
                        </div>
                    </div>
                    <div style={{display:"flex",textAlign:"center"}}>
                        <button onClick={() => displayToggle(false)} style={{padding:"5px 10px", borderRadius:"5px", cursor:"pointer", width:"50%"}}>Cancel</button>
                        <button style={{padding:"8px 10px", borderRadius:"5px", cursor:"pointer", color:"white", width:"50%", backgroundColor:"rgb(50, 224, 141)", border:"0px"}}>Invest</button>
                    </div>
                </div>

            </div>
        </div>

    )
}