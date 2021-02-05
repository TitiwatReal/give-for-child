import React, { useState } from 'react';
import { Container, Button, Card, Check, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './css/Donate.css';

const Donate = () => {
    const [readAlready, setReadAlready] = useState(true);
    const checkChange = (e) => {
        setReadAlready(!e.target.checked);
    };

    return (
        <Container className='all-font '>
            <Card style={{ marginTop: 20 }}>
                <Card.Img variant='top' src='./resources/banner1-3.jpg' />
                <Card.Body>
                    <Card.Title>การบริจาค</Card.Title>
                    <Card.Text>รายละเอียดและเงื่อนไขการบริจาค</Card.Text>
                    <Card.Text>
                        สิ่งที่รับบริจาค ข้าวสารอาหารแห้ง เครื่องอุปโภค - บริโภคทั่วไปในชีวิตประจำวัน
                        รวมทั้งอุปกรณ์การศึกษาและอุปกรณ์กีฬา เสื้อผ้า กระเป๋า รองเท้า สมุด
                        หนังสือเก่าเครื่องใช้ไฟฟ้าเก่าและเสียแล้ว
                        **ถ้าจำนวนสิ่งของน้อยทางมูลนิธิไม่สามารถเดินทางไปรับของ บริจาคได้**
                    </Card.Text>
                    <input id='checkFirm' type='checkbox' onChange={checkChange} />
                    <label for='checkFirm' style={{ paddingLeft: '10px' }}>
                        {' '}
                        อ่านเงื่อนไขเรียบร้อย
                    </label>
                    <Link style={{ width: '100%' }} to='/donate-form' variant='primary'>
                        <Link to='/donate-form'>
                            <Button style={{ width: '100%' }} variant='info' disabled={readAlready}>
                                กรอกฟอร์ม
                            </Button>
                        </Link>
                    </Link>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Donate;
