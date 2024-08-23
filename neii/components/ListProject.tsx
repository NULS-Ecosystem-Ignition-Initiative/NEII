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
    const [showMore, setShowMore] = useState(true);
    const [projectId, setProjectId] = useState(0);
    const [lockTime, setLockTime] = useState<any>("0")

    const [balanceLockNuls, setBalanceLockNuls] = useState("0")
    const [perSold, setPerBal] = useState("0")

    useEffect(() =>{

        async function getTokenBalance() {

            return new Promise((resolve, reject) => {
                BigNumber.config({ DECIMAL_PLACES: 8 });

                axios
                    .post(
                        ip1 + "api/accountledger/balance/" + account,
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

            async function getUserBalance(account: string) {
                const data = {
                    contractAddress: coin.lockAddr,
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
                console.log(res.result)
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




       // getTokenBalance()
    },[showModal])


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
                            <div style={{width:"60px", height:"20px", backgroundColor:"white", minHeight:"32px", borderRadius:"4px"}}><div style={{height:"100%",  borderRadius:"4px", width: new BigNumber(perSold).dividedBy(100).toString() + "%", backgroundColor:"rgb(50, 224, 141)"}}></div></div>
                        </div>
                        <div>
                            { new BigNumber(perSold).dividedBy(100).toString()}%
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
                                padding:"8px 8px",
                                marginLeft:"5px"
                            }}>
                                <div className={(showMore) ? styles.rotate :""} style={{display:"flex", alignItems:"center", }}>
                                    <IoIosArrowDropdownCircle />
                                </div>

                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.fadein} style={{display:(showMore) ? "block": "none"}}>
                <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", padding:"10px"}}>
                    <div>
                        NULS Locked:
                    </div>
                    <div>
                        { new BigNumber(balanceLockNuls).dividedBy(Math.pow(10,8)).toString()} NULS
                    </div>
                </div>
                <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", padding:"10px"}}>
                    <div>

                    </div>
                    <div>
                        {(lockTime !== "0") ?  new Date(lockTime * 1000).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "-"}
                    </div>
                </div>
                <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", padding:"10px"}}>
                    <div>

                    </div>
                    <div>
                        <button
                            onClick={() => withdraw()}
                            style={{
                            padding:"8px",
                            borderRadius:"4px",
                            border:"0px",
                            fontWeight:"bold",
                                cursor:"pointer"
                        }} disabled={true}>Withdraw Locked NULS</button>
                    </div>
                </div>
            </div>
            <div className={styles.fadein} style={{display:(showMore) ? "block": "none"}}>
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
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"10px"}}>
                    <div>
                        {coin.projectName} Whitepaper
                    </div>
                    <div>
                        <Link href={coin.telegram} target="_blank">
                            <div style={{display:"flex", alignItems:"center"}}>
                                <div style={{padding:"0px 4px"}}>
                                    <span style={{textDecoration:"underline"}}>Whitepaper</span>
                                </div>
                                <div style={{marginTop:"5px"}}> <LuExternalLink /></div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"10px"}}>
                    <div>
                        Token Address
                    </div>
                    <div>
                        <Link href={"https://nulscan.io/contracts/info?contractAddress=" + coin.tokenAddr} target="_blank">
                            <div style={{display:"flex", alignItems:"center"}}>
                                <div style={{padding:"0px 4px"}}>
                                    <span style={{textDecoration:"underline"}}>{coin.tokenAddr.substring(0,8) + "..."+ coin.tokenAddr.substring(coin.tokenAddr.length - 8)}</span>
                                </div>
                                <div style={{marginTop:"5px"}}> <LuExternalLink /></div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div  className={styles.fadein} style={{display:(showMore) ? "block" : "none"}}>
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