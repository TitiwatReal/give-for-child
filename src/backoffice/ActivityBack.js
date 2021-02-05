import React, { useState, useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
import path from 'path';
import moment from 'moment';

import { Table, Form, InputGroup, FormControl, Button, Card, Pagination, Row } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import './css/ActivityBack.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import Activity from '../pages/Activity';

axios.defaults.baseURL = 'http://localhost:3001/';

const DateThai = (date) => {
    return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const cencelActivity = (id) => {
    Swal.fire({
        title: 'ลบรายการนี้หรือไม่',
        text: 'เมื่อรายการนี้ถูกลบ คุณจะไม่สามารถกู้คืนได้',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`/activity/${id}/`).then((res) => {
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    icon: 'success',
                    confirmButtonColor: 'Green',
                    confirmButtonText: 'Ok',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            });
        }
    });
};

// const edit = (id) => {
//   axios
//     .edit(`/activity/${id}/`)
//     .then((res) => {
//       if (res.status === 200) {
//         Swal.fire('', 'สำเร็จ', 'success');
//         // history.push('/activity-list');
//       } else {
//         Swal.fire('', 'ผิดพลาด', 'error');
//       }
//     })
//     .catch((err) => {
//       Swal.fire('', 'ผิดพลาดใหญ่่หลวง', 'error');
//     });
// };

const setRow = (data) => {
    // ใส่ชื่อ column ทั้งหมดตาม tabl
    console.log(__dirname);
    const pathDir = window.location.pathname + '../../../api/src/uploads';
    return (
        <tr>
            <td>{data.id}</td>
            <td>
                <img src={`../../resources/images/${data.image}`} alt='' style={{ width: '80px' }} />
            </td>
            <td>{data.name}</td>
            <td>{data.tel}</td>
            <td>{data.location}</td>
            <td>
                {DateThai(new Date(data.start_time))} - {DateThai(new Date(data.end_time))}
            </td>
            <td>{data.person_max}</td>
            <td>
                <Button variant='warning'>
                    <Link to={`/backend/activity-edit/${data.id}`} style={{ color: 'white' }}>
                        แก้ไข
                    </Link>
                </Button>
            </td>
            <td>
                <Button
                    onClick={() => {
                        cencelActivity(data.id);
                    }}
                    variant='outline-danger'
                >
                    <BsTrash />
                </Button>
            </td>
        </tr>
    );
};

class ActivityBack extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            data: [],
        };
        axios
            .get('/activities') // เปลี่ยน  path
            .then((res) => {
                if (res.data) {
                    console.log(res.data);
                    this.setState({ data: res.data });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        let rows;
        if (this.state.data) {
            rows = this.state.data.map((v) => setRow(v));
        }

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
                        <Card.Title>กิจกรรม</Card.Title>
                        <div>
                            <Button variant='primary'>
                                <Link to='/backend/create-activity' style={{ color: 'white' }}>
                                    สร้างกิจกรรม
                                </Link>
                            </Button>
                        </div>

                        <Form inline>
                            <label>Search</label>
                            <FormControl
                                type='text'
                                placeholder='Search'
                                className=' mr-sm-2'
                                style={{ marginLeft: '2%', marginTop: '1.5%' }}
                            />
                            {/* <Button type='submit'>Submit</Button> */}
                        </Form>

                        <Table striped hover style={{ marginTop: '1.5%' }}>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>รูปภาพ</th>
                                    <th>ชื่อกิจกรรม</th>
                                    <th>เบอร์โทรศัพท์</th>
                                    <th>สถานที่</th>
                                    <th>วันเริ่ม-จบกิจกรรม</th>
                                    <th>จำนวนคน</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>{rows}</tbody>
                        </Table>
                    </Card>
                </div>
            </div>
        );
    }
}

export default ActivityBack;
