import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Form, FormControl, Button, Card, Modal } from 'react-bootstrap';
import './css/ActivityBack.css';
import axios from 'axios';
import Swal from 'sweetalert2';

axios.defaults.baseURL = 'http://localhost:3001/';

const Foundation = () => {
    const [file, setFile] = useState(null);
    const [rowData, setRowData] = useState([]);
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        updateRows();
    }, []);

    const updateRows = async () => {
        try {
            await axios
                .get(`/foundation`)
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

    const setRow = (data) => {
        return (
            <tr>
                <td>{data.id}</td>
                <td>
                    <img src={`../resources/images/${data.img}`} style={{ width: '80px' }} />
                </td>
                <td>
                    <a href={data.url} target='_blank'>
                        {data.name}
                    </a>
                </td>
                <td>
                    <Link to={`/backend/foundation/${data.name}`}>
                        <button className='btn btn-info'>Catagory</button>
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
        if (!file || !name || !url) {
            Swal.fire('', 'กรอกข้อมูลให้ครบ', 'warning');
        }
        const data = {
            name: name,
            url: url,
        };
        let form = new FormData();
        form.append('file', file);
        form.append('data', JSON.stringify(data));
        try {
            await axios
                .post('/foundation/', form)
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
                        .delete(`/foundation/${id}`)
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

    const onImgChange = (e) => {
        setFile(e.target.files[0]);
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                <Card style={{ padding: '1.5rem' }}>
                    <Card.Title>มูลนิธิ</Card.Title>
                    <div>
                        <Button variant='primary' onClick={handleShow}>
                            เพิ่ม
                        </Button>
                    </div>

                    {/* <Form inline>
                        <label>Search</label>
                        <FormControl
                            type='text'
                            placeholder='Search'
                            className=' mr-sm-2'
                            style={{ marginLeft: '2%', marginTop: '1.5%' }}
                        />
                    </Form> */}

                    <Table striped hover style={{ marginTop: '1.5%' }}>
                        <thead>
                            <tr>
                                <th width='50'>ID</th>
                                <th width='100'>รูป</th>
                                <th width='400'>ชื่อ</th>
                                <th width='80'></th>
                                <th width='80'></th>
                            </tr>
                        </thead>
                        <tbody>{rowData.map((v) => setRow(v))}</tbody>
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
                    <Form.Group controlId='Form.url'>
                        <Form.Label>URL Link</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder=''
                            onChange={(e) => {
                                setUrl(e.target.value);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId='Image'>
                        <Form.Label>เลือกรูปภาพ</Form.Label>
                        <Form.Control type='file' onChange={onImgChange} />
                        {/* <input id='file-img' type='file' name='filepond'  required />
                  <div id='inputImage'></div> */}
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

export default Foundation;
