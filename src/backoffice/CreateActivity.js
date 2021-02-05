import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link, useHistory } from 'react-router-dom';
import { Table, Form, InputGroup, FormControl, Button, Card, Pagination, Row, Col } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import axios from 'axios';

const ActivityBack = () => {
    const history = useHistory();
    const [file_img, setFile_img] = useState(null);
    // useEffect(() => {
    //   console.log(file_img.files.file[0]);
    // }, [file_img]);
    const [formData, setFormData] = useState({
        name: '',
        tel: '',
        start_time: '',
        end_time: '',
        person_max: 0,
        location: '',
        description: '',
        admin_id: localStorage.getItem('admin_id'),
        foundation: localStorage.getItem('foundation'),
    });

    const onImgChange = (e) => {
        setFile_img(e.target.files[0]);
    };
    const onSubmit = async () => {
        if (
            !formData.name ||
            !formData.tel ||
            !formData.start_time ||
            !formData.end_time ||
            !formData.person_max ||
            !formData.location ||
            !formData.description ||
            !file_img
        ) {
            Swal.fire('', 'กรุณากรอกข้อมูลให้ครบ', 'warning');
            return;
        }
        if (formData.end_time < formData.start_time) {
            Swal.fire('', 'ลงเวลาเริ่มไม่ถูกต้อง', 'warning');
            return;
        }

        var form = new FormData();
        form.append('body', JSON.stringify(formData));
        form.append('file', file_img);
        await axios
            .post('/activity', form)
            .then((res) => {
                if (res.status === 200) {
                    Swal.fire('', 'สำเร็จ', 'success');
                    history.push('/backend/activity-back');
                } else {
                    Swal.fire('', 'ผิดพลาด', 'error');
                }
            })
            .catch((err) => {
                Swal.fire('', 'ไม่สามารถเพิ่มข้อมูลได้ในขณะนี้', 'error');
            });
    };

    return (
        <div
            style={{
                width: 'calc(100%-300px;)',
                height: '100vh',
                overflow: 'scroll',
            }}
        >
            <div className='all-font' style={{ padding: '3rem' }}>
                <Card style={{ padding: '1.5rem' }}>
                    <div>
                        <Button variant='danger'>
                            <Link to='/backend/activity-back' style={{ color: 'white' }}>
                                กลับ
                            </Link>
                        </Button>
                    </div>
                    <Card.Title style={{ marginTop: '2%' }}>สร้างกิจกรรม</Card.Title>
                    <Form>
                        <Form.Row>
                            <Col>
                                <Form.Group controlId='inputImage1'>
                                    <Form.Label>เลือกรูปภาพ</Form.Label>
                                    <Form.Control type='file' onChange={onImgChange} />
                                    {/* <input id='file-img' type='file' name='filepond'  required />
                  <div id='inputImage'></div> */}
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Group controlId='exampleForm.ControlInput1'>
                                            <Form.Label>ชื่อกิจกรรม</Form.Label>
                                            <Form.Control
                                                type='none'
                                                onChange={(e) => {
                                                    setFormData({ ...formData, ...{ name: e.target.value } });
                                                }}
                                                placeholder='กรอกชื่อกิจกรรม'
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId='exampleForm.ControlInput2'>
                                            <Form.Label>เบอร์โทรศัพท์</Form.Label>
                                            <Form.Control
                                                type='number'
                                                onChange={(e) => {
                                                    setFormData({ ...formData, ...{ tel: e.target.value } });
                                                }}
                                                placeholder='กรอกเบอร์โทรศัพท์'
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Form.Group controlId='exampleForm.ControlInput3'>
                                            <Form.Label>วันที่และเวลาจบกิจกรรม</Form.Label>
                                            <Form.Control
                                                type='datetime-local'
                                                onChange={(e) => {
                                                    setFormData({ ...formData, ...{ start_time: e.target.value } });
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId='exampleForm.ControlInput4'>
                                            <Form.Label>วันที่และเวลาจบกิจกรรม</Form.Label>
                                            <Form.Control
                                                type='datetime-local'
                                                onChange={(e) => {
                                                    setFormData({ ...formData, ...{ end_time: e.target.value } });
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId='exampleForm.ControlInput5'>
                                            <Form.Label>จำนวนคน</Form.Label>
                                            <Form.Control
                                                type='number'
                                                onChange={(e) => {
                                                    setFormData({ ...formData, ...{ person_max: e.target.value } });
                                                }}
                                                placeholder='กรอกจำนวนคน'
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Form.Group controlId='exampleForm.ControlInput6'>
                                            <Form.Label>สถานที่</Form.Label>
                                            <Form.Control
                                                type='none'
                                                onChange={(e) => {
                                                    setFormData({ ...formData, ...{ location: e.target.value } });
                                                }}
                                                placeholder='กรอกสถานที่'
                                            />
                                        </Form.Group>
                                        <Form.Group controlId='exampleForm.ControlInput7'>
                                            <Form.Label>รายละเอียดกิจกรรม</Form.Label>
                                            <Form.Control
                                                type='none'
                                                onChange={(e) => {
                                                    setFormData({ ...formData, ...{ description: e.target.value } });
                                                }}
                                                placeholder='กรอกรายละเอียดกิจกรรม'
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Button onClick={onSubmit} variant='info' style={{ width: '200px' }}>
                                            ยืนยัน
                                        </Button>
                                    </Col>
                                    <Col></Col>
                                    <Col></Col>
                                </Row>
                            </Col>
                        </Form.Row>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default ActivityBack;
