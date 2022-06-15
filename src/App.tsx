import React, {useState, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import axios, { AxiosResponse } from "axios";

function App() {
    const [qrcode, setQrcode] = useState();
    const [simulatedQrcode, setSimulatedQrcode] = useState(false);

    const onClick = useCallback(() => {
      axios.get('http://localhost:4000/qrcode').then((response: AxiosResponse)=> {
        setQrcode(response.data);
      })
    }, [qrcode]);


    const simulatedFetch = useCallback(() => {
        setSimulatedQrcode(!simulatedQrcode);
    }, [simulatedQrcode])

    return (
        <div className="App">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    width: '100%',
                }}
            >
                {
                    !simulatedQrcode
                        ? <img src={logo} className="App-logo" alt="logo"/>
                        : <img
                            style={{
                            }}
                            src='https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg'
                            alt='code'
                        />
                }
                {
                    qrcode === undefined
                        ? <img src={logo} className="App-logo" alt="logo" />
                        : <img src ={`data:image/png;base64,${qrcode}`} alt="qrcode" />
                }
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '400px',
                    width: '100%',
                }}
            >
                <button
                    onClick={simulatedFetch}
                >
                    Simulate Generation
                </button>
                <button
                    onClick={onClick}
                >
                    Generate Code
                </button>
            </div>
        </div>
    );
}

export default App;
