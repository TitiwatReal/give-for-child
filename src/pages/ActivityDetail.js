import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { Container, Col, Row, Tab, Tabs, Card, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

import axios from 'axios';
import { BsArrowLeftShort } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Activity.css';
import { Link } from 'react-router-dom';

const ThaiDate = (date) => {
    return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const joinActivity = async (activity_id) => {
    const data = {
        activity_id: activity_id,
        member_id: localStorage.getItem('id'),
    };
    try {
        axios
            .post('/join-activity', data)
            .then(function (res) {
                Swal.fire('', res.data, 'success');
                console.log(res.data);
            })
            .catch(function (err) {
                Swal.fire('', 'พลาด', 'error');
            });
    } catch (err) {
        console.log(err);
        if (err.response.status === 500) {
            Swal.fire('', 'พลาด', 'error');
        } else {
            Swal.fire('', 'พลาด', 'error');
        }
    }
};

const ActivityDetail = (props) => {
    const [activity, setActivity] = useState({});
    useEffect(() => {
        try {
            axios
                .get(`/activity/${props.match.params.id}}`)
                .then(function (res) {
                    setActivity(res.data);
                })
                .catch(function (err) {});
        } catch (err) {
            console.log(err);
            if (err.response.status === 500) {
            } else {
            }
        }
    }, []);
    return (
        <Container className='all-font'>
            <br />

            <Row>
                <Col md={4}>
                    <Link to='/activity'>
                        <Row style={{ paddingLeft: '16px' }}>
                            <BsArrowLeftShort size={28} color={'#000000'} />

                            <div className='text-back'>ย้อนกลับ </div>
                        </Row>
                    </Link>
                </Col>
                <Col md={{ span: 4, offset: 4 }}>
                    <h2 style={{ textAlign: 'right' }}>รายละเอียด</h2>
                </Col>
            </Row>

            <div className='nav-tabs-50'>
                <Row>
                    <Col sm={8}>
                        <Card border='light' className='card shadow' style={{ marginTop: 20 }}>
                            <div
                                className='detail-card'
                                style={{
                                    backgroundImage: `url('../resources/images/${activity.image}')`,
                                }}
                            ></div>
                            <Card.Body>
                                <Card.Title style={{ fontSize: '22px' }}>{activity.name}</Card.Title>

                                {/* <Card.Text
                  style={{ fontSize: '14px', fontWeight: '400', marginTop: '' }}
                >
                  <div style={{ color: 'Gray' }}>
                    <p style={{ float: 'left' }}>วันที่เปิด/ปิดรับสมัคร : </p>
                    <p style={{ color: '#377780' }}>
                      {moment(start).format('D/MM/YY')} -{' '}
                      {moment(end).format('D/MM/YY')}
                    </p>
                  </div>
                </Card.Text> */}

                                <Card.Text style={{ fontSize: '14px', fontWeight: '400' }}>
                                    {ThaiDate(new Date(activity.start_time))} - {ThaiDate(new Date(activity.end_time))}
                                </Card.Text>

                                <Card.Text>{activity.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col sm={4}>
                        <Card border='light' className='card shadow' style={{ marginTop: 20 }}>
                            <Card.Body>
                                {/* <Card.Text style={{ fontSize: '16px', fontWeight: '400' }}>
                  <div>
                    <p
                      style={{
                        float: 'left',
                        fontSize: '25px',
                        marginTop: -14,
                      }}
                    >
                      <BsFillPersonFill />
                    </p>
                    <p style={{ color: '#377780', paddingRight: 10 }}>
                      {' '}
                      คนเข้าร่วมกิจกรรม {activity.person}/{activity.person_max}{' '}
                      คน
                    </p>
                  </div>
                </Card.Text> */}

                                <Row style={{ paddingLeft: '16px' }}>
                                    <img
                                        src={process.env.PUBLIC_URL + '/resources/icon-show.png'}
                                        style={{ width: 25 }}
                                        alt=''
                                    />

                                    <div className='text-detail'>สถานที่ :</div>

                                    <div className='data-detail'>{activity.location}</div>
                                </Row>

                                <Row style={{ paddingLeft: '16px', marginTop: '5px' }}>
                                    <img
                                        src={process.env.PUBLIC_URL + '/resources/icon-show-call.png'}
                                        style={{ width: 25 }}
                                        alt=''
                                    />

                                    <div className='text-detail'>ติดต่อ :</div>

                                    <div className='data-detail'>{activity.tel}</div>
                                </Row>

                                <Row style={{ paddingLeft: '16px', marginTop: '5px' }}>
                                    <img
                                        src={process.env.PUBLIC_URL + '/resources/icon-show-home.png'}
                                        style={{ width: 25 }}
                                        alt=''
                                    />

                                    <div className='text-detail'>ผู้จัดกิจกรรม :</div>

                                    <div className='data-detail'>{activity.foundation}</div>
                                </Row>

                                <Row style={{ paddingLeft: '16px', marginTop: '5px' }}>
                                    <img
                                        src={process.env.PUBLIC_URL + '/resources/icon-show-calenda.png'}
                                        style={{ width: 25 }}
                                        alt=''
                                    />

                                    <div className='text-detail'>วันที่จัดกิจกรรม :</div>

                                    <div className='data-detail'>{ThaiDate(new Date(activity.start_time))}</div>
                                </Row>

                                <Row style={{ paddingLeft: '16px', marginTop: '5px' }}>
                                    <img
                                        src={process.env.PUBLIC_URL + '/resources/icon-show-user.png'}
                                        style={{ width: 25 }}
                                        alt=''
                                    />

                                    <div className='text-detail'>คนเข้าร่วมกิจกรรม :</div>

                                    <div className='data-detail'>
                                        {activity.person}/{activity.person_max} คน
                                    </div>
                                </Row>
                                <br />
                                <Row>
                                    <Col>
                                        <Button
                                            style={{
                                                width: '100%',
                                                backgroundColor: '#377780',
                                                color: 'white',
                                            }}
                                            variant=''
                                            onClick={() => {
                                                joinActivity(activity.id);
                                            }}
                                        >
                                            เข้าร่วมกิจกรรม
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <div className='footer'>
                    <Row>
                        <Col style={{ textAlign: 'center' }}>
                            <Link to='/'>
                                <img
                                    src={process.env.PUBLIC_URL + '/resources/logo.png'}
                                    style={{ width: 105 }}
                                    alt=''
                                />
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
                                <img
                                    src={process.env.PUBLIC_URL + '/resources/facebook.png'}
                                    style={{ width: 25 }}
                                    alt=''
                                />
                            </Link>
                            <Link to='/'>
                                <img
                                    src={process.env.PUBLIC_URL + '/resources/instagram.png'}
                                    style={{ width: 25, marginLeft: '6%' }}
                                    alt=''
                                />
                            </Link>
                            <Link to='/'>
                                <img
                                    src={process.env.PUBLIC_URL + '/resources/twitter.png'}
                                    style={{ width: 25, marginLeft: '6%' }}
                                    alt=''
                                />
                            </Link>
                            <Link to='/'>
                                <img
                                    src={process.env.PUBLIC_URL + '/resources/youtube.png'}
                                    style={{ width: 25, marginLeft: '6%' }}
                                    alt=''
                                />
                            </Link>
                        </Col>
                    </Row>
                    <div className='copy'>Copyright © 2021 All Rights Reserved | Give-for-chlid</div>
                </div>
            </div>
        </Container>
    );
};

export default ActivityDetail;
