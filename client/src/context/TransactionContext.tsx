import React, { MouseEventHandler, useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export interface ITransactionContext {
    connectWallet?: MouseEventHandler<HTMLButtonElement> | undefined,
    connectedAccount: string,
    formData?: TransactionFormData,
    setFormData?: Function | undefined,
    handleChange: Function,
    sendTransaction: () => void,
    isLoading: boolean,
    transactions: any
}

export interface TransactionFormData {
    addressTo: string,
    amount: string,
    keyword: string,
    message: string
}

const initialState = ""
const defaultTransactionContext: ITransactionContext = {
    connectedAccount: initialState,
    sendTransaction: () => { },
    handleChange: () => { },
    transactions: [],
    isLoading: false
}

export const TransactionContext = React.createContext(defaultTransactionContext);

const { ethereum } = window as any;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)

    return transactionContract;
}

// const isMetamaskInstalledElseAlert = 

export const TransactionProvider = ({ children }: { children: any }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' })
    const [connectedAccount, setConnectedAccount] = useState(initialState)
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))
    const [transactions, setTransactions ] = useState([])

    const handleChange = (e: any, name: any) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

    const getAllTransactions = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            const transactionContract = getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions();

            const formattedTransactions = availableTransactions.map( (tx: any) =>({
                addressTo: tx.receiver,
                addressFrom: tx.receiver,
                message: tx.message,
                keyword: tx.keyword,
                amount: parseInt(tx.amount._hex) / (10 ** 18),
                timestamp: new Date(tx.timestamp.toNumber() * 1000).toLocaleString(),
            }))
            setTransactions(formattedTransactions)
        } catch (error) {
            console.log(error);
        }
    }

    const checkIfTransactionExists = async () => {
        try {
            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();
            window.localStorage.setItem("transactionCount", transactionCount)
        } catch (error) {
            console.log(error);
        }
    }
    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({ method: 'eth_accounts' })

            if (accounts.length) {
                setConnectedAccount(accounts[0]);
                console.log('Connected account ', accounts[0]);
                getAllTransactions();
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object")
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setConnectedAccount(accounts[0])
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object")
        }
    }

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");

            const { addressTo, amount, keyword, message } = formData as TransactionFormData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);
            console.log(connectedAccount);
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: connectedAccount,
                    to: addressTo,
                    gas: '0x5208', // hex value, which is around 21000 Gwei, which is 0.00021 eth
                    value: parsedAmount._hex  // conver to Gwei or hexa
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            setIsLoading(true);
            await transactionHash.wait();
            setIsLoading(false);
            console.log({ transactionHash });

            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber())
            getAllTransactions();

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object")
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionExists();
    }, [])

    return (
        <TransactionContext.Provider value={{ connectWallet, connectedAccount, formData, setFormData, handleChange, sendTransaction, transactions, isLoading }}>
            {children}
        </TransactionContext.Provider>
    )
}