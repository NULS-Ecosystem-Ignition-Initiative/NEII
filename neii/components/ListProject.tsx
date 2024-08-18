import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import axios from "axios";
//import Image from "next/image";
import NaboxWindow from "../types/NaboxWindow";
import styles from "../styles/Home.module.css";
import {IoIosArrowDropdownCircle} from "react-icons/io";
//import styles from '../../styles/Creator/MyPage/MyPage.module.css'
import {ModalInvest} from "./ModalInvest";
import Link from "next/link";
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
    coin:any
}
export const ListProject : React.FC<Props>  = ({coin}) => {

    const [balanceNuls, setBalanceNuls] = useState()
    const [account, setAccount] = useState("")

    const ip1 = "https://api.nuls.io/";


    const [showModal, setShowModal] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [projectId, setProjectId] = useState(0);

    useEffect(() =>{

        async function getTokenBalance() {

            const naboxInfo:any = await (window as unknown as NaboxWindow).nabox.createSession();
            console.log(naboxInfo)
            const address = naboxInfo[0];
            setAccount(address)
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
       // getTokenBalance()
    },[])




    return(
        <>
            <hr/>
            <div className={styles.listProject}>
                <div>
                    NULS Oracles
                </div>
                <div>
                    {coin.maxROI}
                </div>
                <div>
                    {coin.poolAddr ? "--" : "-"}
                </div>
                <div style={{display:""}}>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <div>
                            <button onClick={() => { setShowModal(true); setProjectId(1);}} style={{padding:"10px", cursor:"pointer", fontWeight:"bold", border:"0px", color:"white", backgroundColor:"rgb(50, 224, 141)", borderRadius:"4px"}}>Invest</button>
                        </div>
                        <div style={{padding:"0px 5px"}}>
                            <div style={{width:"80px", height:"20px", backgroundColor:"white", minHeight:"32px", borderRadius:"4px"}}><div style={{height:"100%",  borderRadius:"4px", width:"20%", backgroundColor:"rgb(50, 224, 141)"}}></div></div>
                        </div>
                        <div>
                            20%
                        </div>
                        <div>
                            <button
                                onClick={() => setShowMore(!showMore)}
                                style={{
                                alignItems:"middle",
                                backgroundColor:"rgb(50, 224, 141)",
                                borderRadius:"4px",
                                color:"white",
                                cursor:"pointer",
                                fontSize:"16px",
                                padding:"6px 10px",
                                marginLeft:"5px"
                            }}>
                                <IoIosArrowDropdownCircle />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{display:(showMore) ? "block": "none"}}>
                <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", padding:"10px"}}>
                    <div>
                        NULS Locked:
                    </div>
                    <div>
                        <button style={{backgroundColor:"rgb(50, 224, 141)",
                            padding:"8px",
                            borderRadius:"4px",
                            color:"white",
                            border:"0px",
                            fontWeight:"bold"
                        }}>Withdraw Locked NULS</button>
                    </div>
                </div>
            </div>
            <div style={{display:(showMore) ? "block": "none"}}>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"10px"}}>
                    <div>
                        Open Source
                    </div>
                    <div>
                        <Link href={coin.github} target="_blank">
                            <span style={{textDecoration:"underline"}}>Github Repository</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div style={{display:(showMore) ? "block" : "none"}}>
                <div className={styles.listDescription} style={{fontWeight:"bold"}}>
                    <div>
                        Allocation Description
                    </div>
                    <div>
                        Amount
                    </div>
                </div>
                { coin.description?.map((descript:any) => <>
                    <div key={descript.name} className={styles.listDescription}>
                        <div>
                            {descript.name}
                        </div>
                        <div>
                            {descript.amount} NULS
                        </div>
                    </div>
                </>)}



            </div>
            <ModalInvest display={showModal} displayToggle={setShowModal} project={projectId} coin={coin}/>
        </>
    )
}