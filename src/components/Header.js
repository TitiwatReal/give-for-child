import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/css/Header.css';
import '../pages/css/style.css';

const GetLinkAuth = (data) => {
    if (localStorage.getItem('id')) {
        return <Nav.Link href={data.path}>{data.name}</Nav.Link>;
    } else {
        return '';
    }
};

const LinkNoneAuth = (data) => {
    if (!localStorage.getItem('id') || localStorage.getItem('id') === '') {
        return <Nav.Link href={data.path}>{data.name}</Nav.Link>;
    } else {
        return '';
    }
};

const Header = () => {
    return (
        <Navbar className='all-font' bg='light' expand='sm' sticky='top'>
            <Container>
                <Navbar.Brand>
                    <Link to='/'>
                        <img src='./resources/logo.png' style={{ width: 60, height: 60 }} />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto' style={{ textAlign: 'center' }}>
                        <GetLinkAuth path='/activity' name='กิจกรรม' />
                        <GetLinkAuth path='/booking' name='จองกิจกรรม' />
                        <GetLinkAuth path='/donate' name='การบริจาค' />
                        <GetLinkAuth path='/activity-list' name='รายการที่เข้าร่วม' />
                        <GetLinkAuth path='/profile' name='ผู้ใช้งาน' />
                        <GetLinkAuth path='/logout' name='ออกจากระบบ' />

                        <LinkNoneAuth path='login' name='เข้าสู่ระบบ' />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
