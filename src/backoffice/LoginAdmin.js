// import React from 'react';
import React from 'react';
import './css/LoginAdmin.css';
import axios from 'axios';
import { Jumbotron, Container, Row, Col, Button } from 'react-bootstrap';

import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

axios.defaults.baseURL = 'http://localhost:3001/';

const LoginAdmin = () => {
    const history = useHistory();
    let data = {
        username: '',
        password: '',
    };

    const OnLogin = async () => {
        if (!data.username || !data.password) {
            Swal.fire('', 'กรุณากรอกข้อมูลให้ครบ', 'warning');
            return;
        }
        await axios
            .post(`/admin/login`, data)
            .then((res) => {
                const data = res.data;
                if (data) {
                    localStorage.setItem('admin_id', data.id);
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('foundation', data.foundation);
                    window.location.replace('/backend/member');
                } else {
                    Swal.fire('', 'รหัสผ่านไม่ถูกต้อง', 'warning');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Container style={{ marginTop: '5%' }}>
            <Row>
                <Col></Col>
                <Col xs={6}>
                    <Jumbotron>
                        {/* <form> */}
                        <h3 style={{ textAlign: 'center' }}>Log in</h3>

                        <div className='form-group'>
                            <label>Username</label>
                            <input
                                type='text'
                                onChange={(e) => {
                                    data.username = e.target.value;
                                }}
                                className='form-control'
                                placeholder='username'
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label>Password</label>
                            <input
                                type='password'
                                onChange={(e) => {
                                    data.password = e.target.value;
                                }}
                                className='form-control'
                                placeholder='password'
                                required
                            />
                        </div>
                        <Button className='btn btn-dark btn-lg btn-block' onClick={OnLogin}>
                            เข้าสู่ระบบ
                        </Button>
                        {/* <p className='forgot-password register-admin'>
                            หากยังไม่มีบัญชี
                            <a href='/backend/adminregister' style={{ paddingLeft: '15px' }}>
                                สมัครสมาชิก
                            </a>
                        </p>
                        <p className='forgot-password text-right'>
                            <a href='#'>ลืมรหัสผ่าน</a>
                        </p> */}
                        {/* </form> */}
                    </Jumbotron>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
};

export default LoginAdmin;
