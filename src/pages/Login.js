import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LineLogin } from 'reactjs-line-login';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'reactjs-line-login/dist/index.css';

function Login() {
    axios.defaults.baseURL = 'http://localhost:3001/';
    const history = useHistory();

    const [payload, setPayload] = useState(null);
    const [idToken, setIdToken] = useState(null);

    const LINE_LOGIN_CHANNEL_ID = 1655298880;
    const LINE_LOGIN_CHANNEL_SECRET = '055d4867b89e964d48dc1874c2da427f';
    const LINE_LOGIN_CALLBACK_URL = 'http://localhost:3000/login';

    function onGetAccount(account) {
        if (!account.sub || !account.picture || !account.name) return;

        const data = {
            sub_line_id: account.sub,
            img: account.picture,
            name: account.name,
        };
        Login(data);
    }

    async function Login(data) {
        try {
            axios
                .post('/login', data)
                .then((res) => {
                    localStorage.setItem('imgProfile', data.img);
                    localStorage.setItem('id', res.data.id);
                    localStorage.setItem('name', res.data.name);
                    localStorage.setItem('img', res.data.img);
                    Swal.fire('', 'ยินดีต้อนรับ', 'success');
                })
                .catch((err) => {
                    Swal.fire('', 'ไม่สามารถเข้าสู่ระบบได้', 'error');
                });
        } catch (err) {
            console.log(err);
            if (err.response.status === 500) {
                console.log(err.response);
            } else {
                console.log('unknow');
            }
        }
        setTimeout(() => {
            history.push('/');
        }, 1000);
    }

    return (
        <div>
            <LineLogin
                clientID={LINE_LOGIN_CHANNEL_ID}
                clientSecret={LINE_LOGIN_CHANNEL_SECRET}
                state='b41c8fd15b895f0fc28bfwb9d7da89054d931e7s'
                nonce='d78a51235f6ee189e831q9c68523cfa336917ada'
                redirectURI={LINE_LOGIN_CALLBACK_URL}
                scope='profile openid email'
                setPayload={setPayload}
                setIdToken={setIdToken}
            />
            {payload && idToken ? (
                onGetAccount(idToken)
            ) : (
                // console.log("payload", payload, "idToken", idToken)
                <></>
            )}
        </div>
    );
}

export default Login;
