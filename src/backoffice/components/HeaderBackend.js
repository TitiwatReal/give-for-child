import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillPersonFill, BsPeopleCircle } from 'react-icons/bs';
import axios from 'axios';

import '../css/HeaderBackend.css';

const HeaderBackend = () => {
    axios.defaults.baseURL = 'http://localhost:3001';
    return (
        <div
            className='all-font'
            style={{
                width: '300px',
                height: '100vh',
                backgroundColor: '#2C2C2C',
                float: 'left',
            }}
        >
            <div style={{ width: '18%', paddingTop: '5%', margin: '0 auto' }} className='text-center'>
                <img src='/resources/logo.png'></img>
            </div>
            <div>
                <p
                    style={{
                        color: 'white',
                        textAlign: 'center',
                        fontFamily: 'mitr',
                        paddingTop: '10px',
                    }}
                >
                    Give for child
                </p>
            </div>
            <div
                style={{
                    marginLeft: '8%',
                    marginTop: '15%',
                    color: 'white',
                    fontFamily: 'mitr',
                    fontSize: '15px',
                }}
            >
                <h4>{localStorage.getItem('foundation')}</h4>
            </div>

            <div style={{ width: '100%', height: '40px' }}>
                <div style={{ marginLeft: '8%', paddingTop: '2%', color: 'white' }}>
                    <Link to='/backend/member' style={{ color: 'white' }}>
                        <BsPeopleCircle className={'title'} />
                        ผู้ใช้งาน
                    </Link>
                </div>
            </div>
            <div style={{ width: '100%', height: '40px' }}>
                <div style={{ marginLeft: '8%', paddingTop: '2%', color: 'white' }}>
                    <Link to='/backend/activity-back' style={{ color: 'white' }}>
                        <BsPeopleCircle className={'title'} />
                        กิจกรรม
                    </Link>
                </div>
            </div>

            <div className='button-link' style={{ width: '100%', height: '40px' }}>
                <div style={{ marginLeft: '8%', paddingTop: '2%', color: 'white' }}>
                    <Link to='/backend/join-back' style={{ color: 'white' }}>
                        <BsPeopleCircle className={'title'} />
                        เข้าร่วมกิจกรรม
                    </Link>
                </div>
            </div>

            <div style={{ width: '100%', height: '40px', backgroundColor: '#2C2C2C' }}>
                <div style={{ marginLeft: '8%', paddingTop: '2%', color: 'white' }}>
                    <Link to='/backend/booking-back' style={{ color: 'white' }}>
                        <BsPeopleCircle className={'title'} />
                        การจอง
                    </Link>
                </div>
            </div>

            <div style={{ width: '100%', height: '40px', backgroundColor: '#2C2C2C' }}>
                <div style={{ marginLeft: '8%', paddingTop: '2%', color: 'white' }}>
                    <Link to='/backend/donate-back' style={{ color: 'white' }}>
                        <BsPeopleCircle className={'title'} />
                        การบริจาค
                    </Link>
                </div>
            </div>

            {/* <div style={{ width: '100%', height: '40px', backgroundColor: '#2C2C2C' }}>
                <div style={{ marginLeft: '8%', paddingTop: '2%', color: 'white' }}>
                    <Link to='/backend/create-foundation' style={{ color: 'white' }}>
                        <BsPeopleCircle className={'title'} />
                        สร้างมูลนิธิ
                    </Link>
                </div>
            </div> */}
            {/* <div style={{ width: '100%', height: '40px', backgroundColor: '#2C2C2C' }}>
                <div style={{ marginLeft: '8%', paddingTop: '2%', color: 'white' }}>
                    <Link to='/backend/create-admin' style={{ color: 'white' }}>
                        <BsPeopleCircle className={'title'} />
                        สร้างผู้ใช้งานมูลนิธิ
                    </Link>
                </div>
            </div> */}

            <div style={{ width: '100%', height: '40px', backgroundColor: '#2C2C2C' }}>
                <div style={{ marginLeft: '8%', paddingTop: '2%', color: 'white' }}>
                    <Link to='/backend/foundation' style={{ color: 'white' }}>
                        <BsPeopleCircle className={'title'} />
                        มูลนิธิ
                    </Link>
                </div>
            </div>
            <div style={{ width: '100%', height: '40px', backgroundColor: '#2C2C2C' }}>
                <div style={{ marginLeft: '8%', paddingTop: '2%', color: 'white' }}>
                    <Link to='/backend/logout' style={{ color: 'white' }}>
                        <BsPeopleCircle className={'title'} />
                        ออกจากระบบ
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeaderBackend;
