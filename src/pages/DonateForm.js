import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { FaHome, FaMapMarkerAlt } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';

import { BsFillPersonFill, BsCalendarFill, BsFillInfoCircleFill } from 'react-icons/bs';
import { AiFillPhone } from 'react-icons/ai';
import Datetime from 'react-datetime';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/DonateForm.css';
import Swal from 'sweetalert2';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001/';

const Option = (value, name) => {
    return (
        <option key={value} value={value}>
            {name}
        </option>
    );
};
function DonateForm() {
    const history = useHistory();

    const [foundationOps, setFoundationOps] = useState([]);
    let name = '';
    let foundation = '';
    let tel = '';
    let date_time = '';
    let location = '';
    let description = '';

    useEffect(() => {
        getFoundation();
    }, []);

    const getFoundation = async () => {
        try {
            await axios
                .get(`/foundation/`)
                .then(function (res) {
                    let ops = res.data.map((v) => {
                        return Option(v.name, v.name);
                    });
                    setFoundationOps(ops);
                })
                .catch(function (err) {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    };

    const onSubmit = async () => {
        localStorage.getItem('');
        if (!name || !foundation || !tel || !date_time || !location || !description) {
            Swal.fire('', 'กรุณากรอกข้อมูลให้ครบ', 'error');
            return;
        }
        const data = {
            member_id: localStorage.getItem('id'),
            name: name,
            tel: tel,
            foundation: foundation,
            date_time: date_time,
            location: location,
            description: description,
        };
        var formData = new FormData();
        formData.append('body', JSON.stringify(data));

        await axios
            .post('/donation', formData)
            .then((res) => {
                if (res.status === 200) {
                    Swal.fire('', 'สำเร็จ', 'success');
                    history.push('/activity-list');
                } else {
                    Swal.fire('', 'ผิดพลาด', 'error');
                }
            })
            .catch((err) => {
                Swal.fire('', 'ผิดพลาดใหญ่่หลวง', 'error');
            });
    };

    return (
        <>
            <Container className='all-font'>
                <br />
                <h3>การบริจาค</h3>
                <br />

                <Form>
                    <Row>
                        <Col sm>
                            <Form.Group controlId='formBasicEmail'>
                                <Form.Label className='text-lable'>
                                    <img src='./resources/icon-show-home.png' style={{ width: 23 }} alt='' />
                                    <span className='header-text'>เลือกมูลนิธิ</span>
                                </Form.Label>
                                <Form.Control
                                    className='border-test'
                                    as='select'
                                    onChange={(e) => {
                                        foundation = e.target.value;
                                    }}
                                >
                                    <option>เลือก</option>
                                    {foundationOps}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group controlId='name1'>
                                <Form.Label className='text-lable'>
                                    <img src='./resources/icon-show-user.png' style={{ width: 23 }} alt='' />
                                    <span className='header-text'>ชื่อผู้บริจาค</span>
                                </Form.Label>
                                <Form.Control
                                    className='border-test'
                                    type='none'
                                    onChange={(e) => {
                                        name = e.target.value;
                                    }}
                                    placeholder='กรอกชื่อนามสกุล'
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId='tel1'>
                                <Form.Label className='text-lable'>
                                    <img src='./resources/icon-show-call.png' style={{ width: 23 }} alt='' />
                                    <span className='header-text'>เบอร์โทรศัพท์</span>
                                </Form.Label>
                                <Form.Control
                                    className='border-test'
                                    type='none'
                                    onChange={(e) => {
                                        tel = e.target.value;
                                    }}
                                    placeholder='กรอกเบอร์โทรศัพท์'
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='tel'>
                                <Form.Label className='text-lable'>
                                    <img src='./resources/icon-show-calenda.png' style={{ width: 23 }} alt='' />
                                    <span className='header-text'>เลือกวันส่งของ</span>
                                </Form.Label>
                                <Form.Control
                                    className='border-test'
                                    type='datetime-local'
                                    onChange={(e) => {
                                        date_time = e.target.value;
                                    }}
                                    placeholder='เวลา'
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId='state1'>
                        <Form.Label className='text-lable'>
                            <img src='./resources/icon-show.png' style={{ width: 23 }} alt='' />

                            <span className='header-text'>สถานที่</span>
                        </Form.Label>
                        <Form.Control
                            className='border-test'
                            type='none'
                            onChange={(e) => {
                                location = e.target.value;
                            }}
                            placeholder='กรอกสถานที่'
                        />
                    </Form.Group>

                    <Form.Group controlId='description1'>
                        <Form.Label className='text-lable'>
                            <img src='./resources/icon-show-info.png' style={{ width: 23 }} alt='' />
                            <span className='header-text'>รายละเอียด</span>
                        </Form.Label>
                        <Form.Control
                            className='border-test'
                            as='textarea'
                            rows={3}
                            type='none'
                            onChange={(e) => {
                                description = e.target.value;
                            }}
                            placeholder='กรอกรายละเอียด'
                        />
                    </Form.Group>
                </Form>
                <br />

                <Row xs={2} md={4} lg={6}>
                    <Col>
                        <Button className='buttonW' onClick={onSubmit} variant='info'>
                            ยืนยัน
                        </Button>
                    </Col>
                    <Col>
                        <Button className='buttonB' variant='info'>
                            กลับ
                        </Button>
                    </Col>
                </Row>

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
                                <img src='./resources/facebook.png' style={{ width: 23 }} alt='' />
                            </Link>
                            <Link to='/'>
                                <img src='./resources/instagram.png' style={{ width: 23, marginLeft: '6%' }} alt='' />
                            </Link>
                            <Link to='/'>
                                <img src='./resources/twitter.png' style={{ width: 23, marginLeft: '6%' }} alt='' />
                            </Link>
                            <Link to='/'>
                                <img src='./resources/youtube.png' style={{ width: 25, marginLeft: '6%' }} alt='' />
                            </Link>
                        </Col>
                    </Row>
                    <div className='copy'>Copyright © 2021 All Rights Reserved | Give-for-chlid</div>
                </div>
            </Container>

            {/* <ConfirmModal show={modalShow} onHide={() => setModalShow(false)} /> */}
        </>
    );
}

// function ConfirmModal(props) {
//   return (
//     <Modal
//       {...props}
//       size='lg'
//       aria-labelledby='contained-modal-title-vcenter'
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title
//           style={{ textAlign: 'center' }}
//           id='contained-modal-title-vcenter'
//         >
//           ยืนยันข้อมูล
//         </Modal.Title>
//       </Modal.Header>
//       <Row style={{ padding: 20 }}>
//         <Col md={5} xs={5}>
//           <Button
//             onClick={props.onHide}
//             style={{ width: '100%' }}
//             variant='secondary'
//           >
//             ยกเลิก
//           </Button>
//         </Col>
//         <Col md={{ span: 5, offset: 2 }} xs={{ span: 5, offset: 2 }}>
//           <Button style={{ width: '100%' }} variant='primary'>
//             ยืนยัน
//           </Button>
//         </Col>
//       </Row>
//     </Modal>
//   );
//

export default DonateForm;
