import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Table, Form, FormControl, Button, Card } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import './css/ActivityBack.css';
import axios from 'axios';
import moment from 'moment';

import Swal from 'sweetalert2';

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
            axios.delete(`/donation/${id}/`).then((res) => {
                Swal.fire({
                    title: 'ลบข้อมูลสำเร็จ!',
                    text: 'กด ok เพื่อดำเนินการต่อ',
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

const ActivityBack = () => {
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        updateRows();
    }, []);

    const updateRows = async () => {
        axios
            .get(`/donation/foundation/${localStorage.getItem('foundation')}`)
            .then((res) => {
                if (res.data) {
                    setRowData(res.data.map((v) => setRow(v)));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const DonateSuccess = async (id) => {
        axios
            .put(`/donation/success/${id}`)
            .then((res) => {
                if (res.status == 200) {
                    updateRows();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const setRow = (data) => {
        // ใส่ชื่อ column ทั้งหมดตาม table
        return (
            <tr>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.tel}</td>
                <td>{data.location}</td>
                {/* {moment(data.start_time).format('MMMM Do YYYY')} -{' '} */}

                <td>{DateThai(new Date(data.date_time))}</td>
                <td>
                    {data.is_success ? (
                        <Button variant='warning' disabled>
                            เรียบร้อย
                        </Button>
                    ) : (
                        <Button
                            variant='success'
                            onClick={() => {
                                DonateSuccess(data.id);
                            }}
                        >
                            สำเร็จ
                        </Button>
                    )}
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
                    <Card.Title>รับบริจาคสิ่งของ</Card.Title>

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
                                <th>ชื่อผู้บริจาค</th>
                                <th>เบอร์โทรศัพท์</th>
                                <th>สถานที่</th>
                                <th>วันและเวลา</th>
                                <th>ตัวเลือก</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>{rowData}</tbody>
                    </Table>
                </Card>
            </div>
        </div>
    );
};

export default ActivityBack;
