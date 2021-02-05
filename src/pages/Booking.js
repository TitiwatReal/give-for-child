import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { FaHome, FaMapMarkerAlt } from 'react-icons/fa';
import { BsFillPersonFill, BsCalendarFill } from 'react-icons/bs';
import { AiFillPhone } from 'react-icons/ai';
import Datetime from 'react-datetime';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Booking.css';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { setOptions } from 'filepond';

axios.defaults.baseURL = 'http://localhost:3001/';
const BANQUET = 'เลี้ยงอาหารเด็ก';
const REQUEST = 'จัดหาให้';
const BYMYSELF = 'นำมาเอง';

const Option = (value, name) => {
    return (
        <option key={value} value={value}>
            {name}
        </option>
    );
};
function Booking() {
    const history = useHistory();
    const [cat, setCat] = useState([]);
    const [option, setOption] = useState([]);
    const [foundationOps, setFoundationOps] = useState([]);
    const [catagoryOps, setCatagoryOps] = useState([]);
    const [optionOps, setOptionOps] = useState([]);

    const [foundationSelect, setFoundationSelect] = useState('');
    const [categorySelect, setCategorySelect] = useState('');
    const [optionSelect, setOptionSelect] = useState('');

    let name = '';
    let tel = '';
    let date = '';
    let location = '';
    let description = '';

    // เลี้ยงอาหาร
    let duration = '';
    let budget = 0;
    let file = null;
    // const [file, setFile] = useState(null);

    useEffect(() => {
        Initial();
    }, []);

    const Initial = async () => {
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

        try {
            await axios
                .get(`/foundation-catagory/`)
                .then(function (res) {
                    setCat(res.data);
                })
                .catch(function (err) {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }

        try {
            await axios
                .get(`/foundation-option/`)
                .then(function (res) {
                    setOption(res.data);
                })
                .catch(function (err) {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (foundationSelect != 0) {
            let ops = cat.map((v) => {
                if (v.foundation_name == foundationSelect) {
                    return Option(v.name, v.name);
                }
            });
            setCatagoryOps(ops);
            setOptionOps([]);
            setOptionSelect(null);
        }
    }, [foundationSelect]);

    useEffect(() => {
        let ops = option.map((v) => {
            if (v.fou_cat_name == categorySelect) {
                return Option(v.name, v.name);
            }
        });
        setOptionOps(ops);
    }, [categorySelect]);

    const FormDuration = () => {
        return (
            <Col sm>
                <Form.Group controlId='FormDuration'>
                    <Form.Label className=' text-lable '>
                        <img src='./resources/icon-show-option.png' style={{ width: 23 }} alt='' />
                        <span className='header-text'>ช่วงเวลา</span>
                    </Form.Label>
                    <Form.Control
                        required
                        as='select'
                        onChange={(e) => {
                            duration = e.target.value;
                            // setDuration(e.target.value);
                        }}
                        className='border-test'
                    >
                        <option>เลือก</option>
                        <option value='7:00 - 9:00'>7:00 - 9:00</option>
                        <option value='11:00 - 13:00'>11:00 - 13:00</option>
                        <option value='17:00 - 19:00'>17:00 - 19:00</option>
                    </Form.Control>
                </Form.Group>
            </Col>
        );
    };
    const FormBudget = () => {
        return (
            <Col sm>
                <Form.Group controlId='FormBudget'>
                    <Form.Label className=' text-lable '>
                        <img src='./resources/icon-show-option.png' style={{ width: 23 }} alt='' />
                        <span className='header-text'>งบประมาณ</span>
                    </Form.Label>
                    <Form.Control
                        required
                        type='number'
                        onChange={(e) => {
                            budget = e.target.value;
                        }}
                        placeholder='งบ'
                        className='border-test'
                    />
                </Form.Group>
            </Col>
        );
    };
    const FormSlip = () => {
        return (
            <Col sm>
                <Form.Group controlId='FormSlip'>
                    <Form.Label className=' text-lable '>
                        <img src='./resources/icon-show-option.png' style={{ width: 23 }} alt='' />
                        <span className='header-text'>สลิป</span>
                    </Form.Label>
                    <Form.File id='exampleFormControlFile1' onChange={onImgChange} />
                </Form.Group>
            </Col>
        );
    };

    const onImgChange = (e) => {
        // setFile();
        file = e.target.files[0];
    };

    const Confirm = () => {
        Swal.fire({
            title: 'ยืนยันการจอง',
            text: '',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#ccc',
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิก',
        }).then((result) => {
            if (result.isConfirmed) {
                ReserveActivity();
            }
        });
    };

    const ReserveActivity = async () => {
        if (
            !foundationSelect ||
            !categorySelect ||
            !optionSelect ||
            !name ||
            !tel ||
            !date ||
            !location ||
            !description
        ) {
            Swal.fire('', 'กรอกข้อมูลให้ครบ', 'warning');
            console.log(1);
            return;
        }

        let data = {
            member_id: localStorage.getItem('id'),
            foundation: foundationSelect,
            category: categorySelect,
            option: optionSelect,
            name: name,
            tel: tel,
            date: date,
            location: location,
            description: description,
        };

        if (BANQUET === categorySelect) {
            if (!duration) {
                Swal.fire('', 'กรอกข้อมูลให้ครบ', 'warning');
                return;
            }
            data = { ...data, ...{ duration: duration } };
            if (REQUEST === optionSelect) {
                if (!file || budget === 0) {
                    Swal.fire('', 'กรอกข้อมูลให้ครบ', 'warning');
                    return;
                }
                data = { ...data, ...{ budget: budget } };
            }
        }
        let form = new FormData();
        if (REQUEST === optionSelect) {
            form.append('file', file);
        }
        form.append('data', JSON.stringify(data));
        try {
            await axios
                .post('/booking/', form)
                .then((res) => {
                    if (res.status == 200) {
                        Swal.fire('', 'สำเร็จ', 'success');
                        history.push({
                            pathname: '/activity-list',
                            search: '?tab=booking',
                        });
                    }
                })
                .catch((err) => {
                    Swal.fire('', 'พลาด', 'error');
                });
        } catch (err) {
            Swal.fire('', 'พลาด', 'error');
        }
    };
    return (
        <>
            <Container className='all-font'>
                <br />

                <h3>จองกิจกรรม</h3>
                <br />

                <Form>
                    <Row>
                        <Col sm>
                            <Form.Group controlId='formBasicEmail'>
                                <Form.Label className=' text-lable '>
                                    <img src='./resources/icon-show-home.png' style={{ width: 23 }} alt='' />
                                    <span className='header-text'>เลือกมูลนิธิ</span>
                                </Form.Label>
                                <Form.Control
                                    required
                                    as='select'
                                    onChange={(e) => {
                                        setFoundationSelect(e.target.value);
                                        setCategorySelect(0);
                                        setOptionSelect(0);
                                    }}
                                    className='border-test'
                                >
                                    <option value={0}>เลือก</option>
                                    {foundationOps}
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col sm>
                            <Form.Group controlId='formBasicasdasd'>
                                <Form.Label className=' text-lable '>
                                    <img src='./resources/icon-show-option.png' style={{ width: 23 }} alt='' />
                                    <span className='header-text'>ประเภท</span>
                                </Form.Label>
                                <Form.Control
                                    required
                                    onChange={(e) => {
                                        setCategorySelect(e.target.value);
                                        setOptionSelect(0);
                                    }}
                                    as='select'
                                    className='border-test'
                                >
                                    <option>เลือก</option>
                                    {catagoryOps}
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col sm>
                            <Form.Group controlId='formBasicasdasdaa'>
                                <Form.Label className=' text-lable '>
                                    <img src='./resources/icon-show-option.png' style={{ width: 23 }} alt='' />
                                    <span className='header-text'>ตัวเลือก</span>
                                </Form.Label>
                                <Form.Control
                                    required
                                    as='select'
                                    onChange={(e) => {
                                        setOptionSelect(e.target.value);
                                    }}
                                    className='border-test'
                                >
                                    <option>เลือก</option>
                                    {optionOps}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        {optionSelect == REQUEST || optionSelect == BYMYSELF ? <FormDuration /> : null}
                        {optionSelect == REQUEST ? <FormBudget /> : null}
                        {optionSelect == REQUEST ? <FormSlip /> : null}
                    </Row>

                    <Row>
                        <Col sm>
                            <Form.Group controlId='name'>
                                <Form.Label className=' text-lable '>
                                    <img src='./resources/icon-show-user.png' style={{ width: 23 }} alt='' />
                                    <span className='header-text'>ชื่อผู้บริจาค</span>
                                </Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    onChange={(e) => {
                                        name = e.target.value;
                                    }}
                                    placeholder='กรอกชื่อนามสกุล'
                                    className='border-test'
                                />
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group controlId='tel'>
                                <Form.Label className=' text-lable '>
                                    <img src='./resources/icon-show-call.png' style={{ width: 23 }} alt='' />
                                    <span className='header-text'>เบอร์โทรศัพท์</span>
                                </Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    onChange={(e) => {
                                        tel = e.target.value;
                                    }}
                                    placeholder='กรอกเบอร์โทรศัพท์'
                                    className='border-test'
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm>
                            <Form.Group controlId='date'>
                                <Form.Label className=' text-lable '>
                                    <img src='./resources/icon-show-calenda.png' style={{ width: 23 }} alt='' />
                                    <span className='header-text'>วันที่</span>
                                </Form.Label>
                                <Form.Control
                                    required
                                    type='date'
                                    onChange={(e) => {
                                        date = e.target.value;
                                    }}
                                    className='border-test'
                                />
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group controlId='location'>
                                <Form.Label className=' text-lable '>
                                    <img src='./resources/icon-show.png' style={{ width: 23 }} alt='' />
                                    <span className='header-text'>สถานที่</span>
                                </Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    onChange={(e) => {
                                        location = e.target.value;
                                    }}
                                    placeholder='กรอกสถานที่'
                                    className='border-test'
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId='description'>
                        <Form.Label className=' text-lable '>
                            <img src='./resources/icon-show-info.png' style={{ width: 23 }} alt='' />
                            <span className='header-text'>รายละเอียด</span>
                        </Form.Label>
                        <Form.Control
                            required
                            type='text'
                            as='textarea'
                            rows={3}
                            placeholder='กรอกรายละเอียด'
                            className='border-test '
                            onChange={(e) => {
                                description = e.target.value;
                            }}
                        />
                    </Form.Group>
                </Form>
                <br />
                <Row xs={2} md={4} lg={6}>
                    <Col>
                        <Button className='buttonW' variant='info' onClick={Confirm}>
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
}

export default Booking;
