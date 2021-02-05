import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { Container, Row, Tab, Tabs, Card, Button, CardDeck, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './css/ActivityList.css';
import './css/Activity.css';

import axios from 'axios';
import { BsFillPersonFill } from 'react-icons/bs';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ActivityList = () => {
    const [key, setKey] = useState('activity');
    const [activity, setActivity] = useState([]);
    const [donate, setDonate] = useState([]);
    const [booking, setBooking] = useState([]);

    let userId = localStorage.getItem('id');

    useEffect(() => {
        InitialData();
        setTimeout(() => {
            const query = window.location.search;
            const urlParams = new URLSearchParams(query);
            if (urlParams.get('tab')) {
                setKey(urlParams.get('tab'));
            }
        }, 100);
    }, []);

    const InitialData = async () => {
        await axios.get(`/activity/member/${userId || 0}`).then((res) => {
            setActivity(res.data);
        });
        await axios.get(`/donation/member/${userId || 0}`).then((res) => {
            setDonate(res.data);
        });
        await axios.get(`/booking/member/${userId || 0}`).then((res) => {
            setBooking(res.data);
        });
    };

    const cencelActivity = (path, id) => {
        Swal.fire({
            title: 'ยกเลิกกิจกรรมหรือไม่',
            text: 'คุณสามารถเลือกดูหน้ากิจกรรมได้',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ตกลง',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${path}${id}`).then((res) => {
                    if (res.status == 200) {
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your file has been deleted.',
                            icon: 'success',
                            confirmButtonColor: 'Green',
                            confirmButtonText: 'Ok',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                InitialData();
                            }
                        });
                    } else {
                        Swal.fire({
                            title: 'Fail!',
                            text: '',
                            icon: 'error',
                        });
                    }
                });
            }
        });
    };

    return (
        <>
            <Container className='all-font'>
                <br />
                <h3>รายการ</h3>
                <br />
                <div>
                    <Tabs
                        id='controlled-tab-example'
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className='nav-tabs-33'
                    >
                        <Tab eventKey='activity' title='กิจกรรม'>
                            <CardDeck>
                                {activity.map((data) => {
                                    return (
                                        <Card
                                            border='light'
                                            className='card shadow card-radin '
                                            style={{ marginTop: 20 }}
                                        >
                                            <div
                                                className='head-card'
                                                style={{
                                                    backgroundImage: `url('../resources/images/${data.image}')`,
                                                }}
                                            ></div>
                                            {/* <Card.Img variant='top' src= /> */}
                                            <Card.Body>
                                                <Card.Title style={{ fontSize: '22px' }}>{data.name}</Card.Title>
                                                <Card.Text
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        marginTop: '',
                                                    }}
                                                >
                                                    <div style={{ color: 'Gray' }}>
                                                        <p style={{ float: 'left' }}>วันที่เปิด/ปิดรับสมัคร : </p>
                                                        <p style={{ color: '#377780' }}>
                                                            {moment(data.start).format('D/MM/YY')} -{' '}
                                                            {moment(data.end).format('D/MM/YY')}
                                                        </p>
                                                    </div>
                                                </Card.Text>

                                                <Card.Text style={{ fontSize: '16px', fontWeight: '400' }}>
                                                    <div>
                                                        <p
                                                            style={{
                                                                float: 'left',
                                                                fontSize: '25px',
                                                                marginTop: -15,
                                                            }}
                                                        >
                                                            <BsFillPersonFill />
                                                        </p>
                                                        <p style={{ color: '#377780', paddingRight: 10 }}>
                                                            {' '}
                                                            คนเข้าร่วมกิจกรรม {data.person}/{data.person_max} คน
                                                        </p>
                                                    </div>
                                                </Card.Text>

                                                <Card.Text>
                                                    {data.description.substring(0, 80) +
                                                        (data.description.length > 40 ? '...' : '')}
                                                </Card.Text>

                                                <Button
                                                    className='font-button'
                                                    style={{
                                                        width: '100%',
                                                        backgroundColor: '#377780',
                                                        color: 'white',
                                                    }}
                                                    variant=''
                                                    onClick={() => {
                                                        cencelActivity('/activity/member/', data.id);
                                                    }}
                                                >
                                                    ยกเลิก
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    );
                                })}
                            </CardDeck>
                        </Tab>
                        <Tab eventKey='donate' title='การบริจาค'>
                            <CardDeck>
                                {donate.map((data) => {
                                    return (
                                        <Card
                                            border='light'
                                            className='card shadow card-radin '
                                            style={{ marginTop: 20 }}
                                        >
                                            {/* <Card.Img variant='top' src= /> */}
                                            <Card.Body>
                                                <Card.Title style={{ fontSize: '22px' }}>{data.foundation}</Card.Title>
                                                <Card.Text
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        marginTop: '',
                                                    }}
                                                >
                                                    <div style={{ color: 'Gray' }}>
                                                        <p style={{ float: 'left' }}>ผู้บริจาค : </p>
                                                        <p style={{ color: '#377780' }}>{data.name}</p>
                                                    </div>
                                                </Card.Text>
                                                <Card.Text
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        marginTop: '',
                                                    }}
                                                >
                                                    <div style={{ color: 'Gray' }}>
                                                        <p style={{ float: 'left' }}>เบอร์โทร : </p>
                                                        <p style={{ color: '#377780' }}>{data.tel}</p>
                                                    </div>
                                                </Card.Text>
                                                <Card.Text
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        marginTop: '',
                                                    }}
                                                >
                                                    <div style={{ color: 'Gray' }}>
                                                        <p style={{ float: 'left' }}>วัน - เวลา : </p>
                                                        <p style={{ color: '#377780' }}>
                                                            {moment(data.date_time).format('D/MM/YY')}
                                                        </p>
                                                    </div>
                                                </Card.Text>

                                                <Card.Text
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        marginTop: '',
                                                    }}
                                                >
                                                    <div style={{ color: 'Gray' }}>
                                                        <p style={{ float: 'left' }}>สถานที่ : </p>
                                                        <p style={{ color: '#377780' }}>{data.location}</p>
                                                    </div>
                                                </Card.Text>

                                                <Card.Text>
                                                    รายละเอียด :{' '}
                                                    {data.description.substring(0, 80) +
                                                        (data.description.length > 40 ? '...' : '')}
                                                </Card.Text>

                                                <Button
                                                    className='font-button'
                                                    style={{
                                                        width: '100%',
                                                        backgroundColor: '#377780',
                                                        color: 'white',
                                                    }}
                                                    variant=''
                                                    onClick={() => {
                                                        cencelActivity('/donation/', data.id);
                                                    }}
                                                >
                                                    ยกเลิก
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    );
                                })}
                            </CardDeck>
                        </Tab>
                        <Tab eventKey='booking' title='การจอง'>
                            <CardDeck>
                                {booking.map((data) => {
                                    return (
                                        <Card
                                            border='light'
                                            className='card shadow card-radin '
                                            style={{ marginTop: 20 }}
                                        >
                                            {/* <Card.Img variant='top' src= /> */}
                                            <Card.Body>
                                                <Card.Title style={{ fontSize: '22px' }}>{data.foundation}</Card.Title>
                                                <Card.Text
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        marginTop: '',
                                                    }}
                                                >
                                                    <div style={{ color: 'Gray' }}>
                                                        <p style={{ float: 'left' }}>ประเภท : </p>
                                                        <p style={{ color: '#377780' }}>{data.category}</p>
                                                    </div>
                                                </Card.Text>
                                                <Card.Text
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        marginTop: '',
                                                    }}
                                                >
                                                    <div style={{ color: 'Gray' }}>
                                                        <p style={{ float: 'left' }}>ตัวเลือก : </p>
                                                        <p style={{ color: '#377780' }}>{data.option}</p>
                                                    </div>
                                                </Card.Text>
                                                <Card.Text
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        marginTop: '',
                                                    }}
                                                >
                                                    <div style={{ color: 'Gray' }}>
                                                        <p style={{ float: 'left' }}>ชื่อผู้จอง : </p>
                                                        <p style={{ color: '#377780' }}>{data.name}</p>
                                                    </div>
                                                </Card.Text>
                                                <Card.Text
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        marginTop: '',
                                                    }}
                                                >
                                                    <div style={{ color: 'Gray' }}>
                                                        <p style={{ float: 'left' }}>เบอร์โทร : </p>
                                                        <p style={{ color: '#377780' }}>{data.tel}</p>
                                                    </div>
                                                </Card.Text>
                                                <Card.Text
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        marginTop: '',
                                                    }}
                                                >
                                                    <div style={{ color: 'Gray' }}>
                                                        <p style={{ float: 'left' }}>สถานที่ : </p>
                                                        <p style={{ color: '#377780' }}>{data.location}</p>
                                                    </div>
                                                </Card.Text>
                                                <Card.Text
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        marginTop: '',
                                                    }}
                                                >
                                                    <div style={{ color: 'Gray' }}>
                                                        <p style={{ float: 'left' }}>วันที่ : </p>
                                                        <p style={{ color: '#377780' }}>
                                                            {moment(data.date).format('D/MM/YY')}
                                                        </p>
                                                    </div>
                                                </Card.Text>

                                                <Card.Text>
                                                    รายละเอียด :
                                                    {data.description.substring(0, 80) +
                                                        (data.description.length > 40 ? '...' : '')}
                                                </Card.Text>

                                                <Button
                                                    className='font-button'
                                                    style={{
                                                        width: '100%',
                                                        backgroundColor: '#377780',
                                                        color: 'white',
                                                    }}
                                                    variant=''
                                                    onClick={() => {
                                                        cencelActivity('/booking/', data.id);
                                                    }}
                                                >
                                                    ยกเลิก
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    );
                                })}
                            </CardDeck>
                        </Tab>
                    </Tabs>
                </div>

                <div className='footer'>
                    <Row>
                        <Col style={{ textAlign: 'center' }}>
                            <Link to='/'>
                                <img src='./resources/logo.png' style={{ width: 105 }} alt='' />
                            </Link>
                        </Col>
                        <Col>
                            ที่ตั้ง : มหาวิทยาลัยศิลปากร เมืองทองธานี
                            <br />
                            เลขที่ 80 ถนนป๊อปปูล่า ต.บ้านใหม่ อำเภอปากเกร็ด จังหวัดนนทบุรี 11120
                            <br />
                            โทรศัพท์ : 093-165-4886
                            <br />
                            E-mail : give-for-child@gmail.com
                        </Col>
                        <Col style={{ marginLeft: '5%' }}>
                            <Link className='link-footer' to='/activity'>
                                กิจกรรม
                            </Link>
                            <br />
                            <Link className='link-footer' to='/booking'>
                                จองกิจกรรม
                            </Link>
                            <br />
                            <Link className='link-footer' to='/donate'>
                                การบริจาค
                            </Link>
                            <br />
                            <Link className='link-footer' to='/activity-list'>
                                รายการที่เข้าร่วม
                            </Link>
                            <br />
                            <Link className='link-footer' to='/profile'>
                                ผู้ใช้งาน
                            </Link>
                            <br />
                            <Link className='link-footer' to='/logout'>
                                ออกจากระบบ
                            </Link>
                            <br />
                        </Col>
                        <Col sm>
                            <Link to='/'>
                                <img src='./resources/facebook.png' style={{ width: 25 }} alt='' />
                            </Link>
                            <Link to='/'>
                                <img src='./resources/instagram.png' style={{ width: 25, marginLeft: '6%' }} alt='' />
                            </Link>
                            <Link to='/'>
                                <img src='./resources/twitter.png' style={{ width: 25, marginLeft: '6%' }} alt='' />
                            </Link>
                            <Link to='/'>
                                <img src='./resources/youtube.png' style={{ width: 25, marginLeft: '6%' }} alt='' />
                            </Link>
                        </Col>
                    </Row>
                    <div className='copy'>Copyright © 2021 All Rights Reserved | Give-for-chlid</div>
                </div>
            </Container>
        </>
    );
};

export default ActivityList;
