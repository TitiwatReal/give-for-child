import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Row, Button, Card, Form, Modal } from 'react-bootstrap';
import './css/ActivityBack.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BsArrowLeftShort } from 'react-icons/bs';

axios.defaults.baseURL = 'http://localhost:3001/';

const Catagory = (props) => {
    const [rowData, setRowData] = useState([]);
    const [name, setName] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        updateRows();
    }, []);

    const updateRows = async () => {
        try {
            await axios
                .get(`/foundation-catagory/${props.match.params.name}`)
                .then(function (res) {
                    if (res.data) {
                        setRowData(res.data);
                    }
                })
                .catch(function (err) {});
        } catch (err) {
            console.log(err);
            if (err.response.status === 500) {
            } else {
            }
        }
    };

    const setRow = (foundation, data) => {
        //   console.log(__dirname);
        //   const pathDir = window.location.pathname + '../../../api/src/uploads';
        return (
            <tr>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>
                    <Link to={`/backend/foundation/${foundation}/${data.name}`}>
                        <button className='btn btn-info'>Option</button>
                    </Link>
                </td>
                <td>
                    <Button
                        className='btn btn-danger'
                        onClick={() => {
                            Delete(data.id);
                        }}
                    >
                        ลบ
                    </Button>
                </td>
            </tr>
        );
    };

    const onSubmit = async () => {
        if (!name) {
            Swal.fire('', 'กรอกข้อมูลให้ครบ', 'warning');
        }
        const data = {
            name: name,
            foundation_name: props.match.params.name,
        };
        try {
            await axios
                .post('/foundation-catagory/', data)
                .then((res) => {
                    if (res.status == 200) {
                        Swal.fire('', 'สำเร็จ', 'success');
                        handleClose();
                        updateRows();
                    }
                })
                .catch((err) => {
                    Swal.fire('', 'พลาด', 'error');
                });
        } catch (err) {
            Swal.fire('', 'พลาด', 'error');
        }
    };
    const Delete = (id) => {
        Swal.fire({
            title: 'ต้องการลบ ?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิก',
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios
                        .delete(`/foundation-catagory/${id}`)
                        .then(function (res) {
                            Swal.fire('', res.data, 'success');
                            updateRows();
                        })
                        .catch(function (err) {
                            Swal.fire('', 'ผิดพลาด', 'error');
                        });
                } catch (err) {
                    console.log(err);
                    if (err.response.status === 500) {
                    } else {
                    }
                }
            }
        });
    };

    return (
        <div
            className='all-font'
            style={{
                width: 'calc(100%-300px;)',
                height: '100vh',
                overflow: 'scroll',
            }}
        >
            <div style={{ padding: '3rem' }}>
                <Link to='/backend/foundation'>
                    <Row style={{ paddingLeft: '16px' }}>
                        <BsArrowLeftShort size={28} color={'#000000'} />
                        <div className='text-back'>ย้อนกลับ </div>
                    </Row>
                </Link>
                <Card style={{ padding: '1.5rem' }}>
                    <Card.Title>ประเภท</Card.Title>
                    <div>
                        <Button variant='primary' onClick={handleShow}>
                            เพิ่ม
                        </Button>
                    </div>

                    <Table striped hover style={{ marginTop: '1.5%' }}>
                        <thead>
                            <tr>
                                <th width='50'>ID</th>
                                <th width='500'>ชื่อ</th>
                                <th width='50'></th>
                                <th width='50'></th>
                            </tr>
                        </thead>
                        <tbody>{rowData.map((v) => setRow(props.match.params.name, v))}</tbody>
                    </Table>
                </Card>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>เพิ่ม</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId='Form.name'>
                        <Form.Label>ชื่อ</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder=''
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Button onClick={onSubmit} variant='info' style={{ width: '200px' }}>
                            ยืนยัน
                        </Button>
                    </Form.Group>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Catagory;
