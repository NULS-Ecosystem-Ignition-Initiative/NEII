import { useEffect, useState } from "react";

//import Image from "next/image";
//import NaboxWindow from "../types/NaboxWindow";
import styles from "../styles/Home.module.css";
import {IoIosArrowDropdownCircle} from "react-icons/io";
//import styles from '../../styles/Creator/MyPage/MyPage.module.css'
import {ModalInvest} from "./ModalInvest";
import Link from "next/link";
import {FaWallet} from "react-icons/fa";
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
    account:string
}
export const Menu: React.FC<Props>  = ({account}) => {

    const [balanceNuls, setBalanceNuls] = useState()

    const ip1 = "https://api.nuls.io/";


    const [showModal, setShowModal] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [projectId, setProjectId] = useState(0);

    const [balanceLockNuls, setBalanceLockNuls] = useState("0")
    const [perSold, setPerBal] = useState("0")

    useEffect(() =>{
    },[])





    return(
        <>
            <div style={{color:"white", fontFamily:"Arimo", padding:"10px 0px 50px 0px", display:"flex",
                        justifyContent:"space-between", width:"100%"}}>
                <div></div>
                <div>
                    <Link href={"https://nulscan.io/address/info?address=" + account?.toString()} target="_blank">
                        <div style={{padding:"6px 10px", display:"flex", alignItems:"center", borderRadius:"4px",  backgroundColor:"rgb(50, 224, 141)" }}>

                           <div style={{padding:"2px 6px 2px 2px", marginTop:"2px"}}>
                               <FaWallet />
                           </div>
                            <div>
                                {account?.substring(0,8)+"..."+ account?.substring(account?.length - 8)}
                            </div>

                        </div>
                    </Link>


                </div>
            </div>
        </>
    )
}