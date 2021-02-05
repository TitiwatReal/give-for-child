import React, { useState, useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Form, InputGroup, FormControl, Button, Card, Pagination, Row } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import './css/ActivityBack.css';
import axios from 'axios';
import Swal from 'sweetalert2';

axios.defaults.baseURL = 'http://localhost:3001/';

const cencelActivity = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`/booking/${id}/`).then((res) => {
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

const DateThai = (date) => {
    return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const ActivityBack = () => {
    const [rowData, setRowData] = useState([]);
    useEffect(() => {
        updateRows();
    }, []);

    const BookingSuccess = async (id) => {
        axios
            .put(`/booking/success/${id}`)
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
                <td>{data.booking_id}</td>
                <td>{data.booking_name}</td>
                <td>{data.member_name}</td>
                <td>{data.tel}</td>
                <td>{data.location}</td>
                <td>{DateThai(new Date(data.date))}</td>
                <td>
                    {data.is_success ? (
                        <Button variant='warning' disabled>
                            เรียบร้อย
                        </Button>
                    ) : (
                        <Button
                            variant='success'
                            onClick={() => {
                                BookingSuccess(data.booking_id);
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
                        variant='none'
                        style={{ backgroundColor: 'red' }}
                    >
                        <BsTrash style={{ color: 'white' }} />
                    </Button>
                </td>
            </tr>
        );
    };
    const updateRows = async () => {
        axios
            .get(`/booking/foundation/${localStorage.getItem('foundation')}`) // เปลี่ยน  path
            .then((res) => {
                if (res.data) {
                    setRowData(res.data.map((v) => setRow(v)));
                }
            })
            .catch((err) => {
                console.log(err);
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
                <Card style={{ padding: '1.5rem' }}>
                    <Card.Title>การจอง</Card.Title>
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
                                <th>ชื่อกิจกรรม</th>
                                <th>ชื่อผู้จอง</th>
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
