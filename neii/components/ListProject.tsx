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
import {LuExternalLink} from "react-icons/lu";
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
    account:string
}
export const ListProject : React.FC<Props>  = ({coin, account}) => {

    const [balanceNuls, setBalanceNuls] = useState()

    const ip1 = "https://api.nuls.io/";


    const [showModal, setShowModal] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [projectId, setProjectId] = useState(0);
    const [lockTime, setLockTime] = useState("0")

    const [balanceLockNuls, setBalanceLockNuls] = useState("0")
    const [perSold, setPerBal] = useState("0")

    useEffect(() =>{

        async function getTokenBalance() {

            const naboxInfo:any = await (window as unknown as NaboxWindow).nabox.createSession();
            console.log(naboxInfo)
            const address = naboxInfo[0];

            async function getUserBalance(account: string) {
                const data = {
                    contractAddress: coin.tokenAddr,
                    methodName: "getUserBalance",
                    methodDesc: "(Address addr) return BigInteger",
                    args: [account],
                };
                const res = await (window as unknown as NaboxWindow).nabox.invokeView(data);
                setBalanceLockNuls(res.result)
                return res.result;
            }

            getUserBalance(account)

            async function getProjectRaisePer() {
                const data = {
                    contractAddress: coin.raiseAddr,
                    methodName: "percentageSold",
                    methodDesc: "() return BigInteger",
                    args: [],
                };
                const res = await (window as unknown as NaboxWindow).nabox.invokeView(data);
                setPerBal(res.result)
                return res.result;
            }

            getProjectRaisePer()

            async function getUserLockerTime() {
                const data = {
                    contractAddress: coin.lockAddr,
                    methodName: "getUserLockTime",
                    methodDesc: "(Address addr) return BigInteger",
                    args: [account],
                };
                const res = await (window as unknown as NaboxWindow).nabox.invokeView(data);
                setLockTime(res.result)
                return res.result;
            }

            getUserLockerTime()


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


    async function withdraw(
    ) {
        const data = {
            from: account,
            value: 0,
            contractAddress: coin.lockAddr,
            methodName: "withdrawAfterLock",
            methodDesc:
                "() return void",
            args: [],
        };
        const res = await (window as unknown as NaboxWindow).nabox.contractCall(data);
        return res.toString();
    }




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
                            <button onClick={() => { setShowModal(true); setProjectId(1);}} style={{padding:"10px", cursor:"pointer", fontWeight:"bold", border:"0px", color:"white", backgroundColor:"rgb(50, 224, 141)", borderRadius:"4px"}}>Donate</button>
                        </div>
                        <div style={{padding:"0px 5px"}}>
                            <div style={{width:"80px", height:"20px", backgroundColor:"white", minHeight:"32px", borderRadius:"4px"}}><div style={{height:"100%",  borderRadius:"4px", width: new BigNumber(perSold).dividedBy(10000).toString() + "%", backgroundColor:"rgb(50, 224, 141)"}}></div></div>
                        </div>
                        <div>
                            {perSold}%
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
                        {balanceLockNuls.toString()} NULS
                    </div>
                </div>
                <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", padding:"10px"}}>
                    <div>

                    </div>
                    <div>
                        {(lockTime !== "0") ? lockTime : "-"}
                    </div>
                </div>
                <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", padding:"10px"}}>
                    <div>

                    </div>
                    <div>
                        <button
                            onClick={() => withdraw()}
                            style={{backgroundColor:"rgb(50, 224, 141)",
                            padding:"8px",
                            borderRadius:"4px",
                            color:"white",
                            border:"0px",
                            fontWeight:"bold",
                                cursor:"pointer"
                        }}>Withdraw Locked NULS</button>
                    </div>
                </div>
            </div>
            <div style={{display:(showMore) ? "block": "none"}}>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"10px"}}>
                    <div>
                        Total Supply
                    </div>
                    <div>

                            <span>1.000.000 {coin.symbol}</span>

                    </div>
                </div>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"10px"}}>
                    <div>
                        Open Source
                    </div>
                    <div>
                        <Link href={coin.github} target="_blank">
                            <div style={{display:"flex", alignItems:"center"}}>
                                <div style={{padding:"0px 4px"}}>
                                    <span style={{textDecoration:"underline"}}>Github Repository</span>
                                </div>
                                <div style={{marginTop:"5px"}}> <LuExternalLink /></div>
                            </div>

                        </Link>
                    </div>
                </div>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"10px"}}>
                    <div>
                        Telegram
                    </div>
                    <div>
                        <Link href={coin.telegram} target="_blank">
                            <div style={{display:"flex", alignItems:"center"}}>
                                <div style={{padding:"0px 4px"}}>
                                    <span style={{textDecoration:"underline"}}>{coin.projectName} Group</span>
                                </div>
                                <div style={{marginTop:"5px"}}> <LuExternalLink /></div>
                            </div>
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
                            {new BigNumber(descript.amount).toString()} NULS
                        </div>
                    </div>
                </>)}



            </div>
            <ModalInvest display={showModal} displayToggle={setShowModal} project={projectId} coin={coin}/>
        </>
    )
}