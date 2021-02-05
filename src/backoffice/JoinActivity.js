import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Form, InputGroup, FormControl, Button, Card, Pagination, Row } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import './css/ActivityBack.css';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001/';

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

    const updateRows = async () => {
        axios
            .get(`/join_activity/foundation/${localStorage.getItem('foundation')}`)
            .then((res) => {
                if (res.data) {
                    console.log(res.data.length);
                    setRowData(res.data.map((v) => setRow(v)));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const JoinActivitySuccess = async (id) => {
        axios
            .put(`/join_activity/success/${id}`)
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
                <td>{data.join_id}</td>
                <td>{data.activity_name}</td>
                <td>{data.member_name}</td>
                <td>{data.tel}</td>
                <td>{data.location}</td>
                <td>{DateThai(new Date(data.created_at))}</td>
                <td>
                    {data.is_success ? (
                        <Button variant='warning' disabled>
                            เรียบร้อย
                        </Button>
                    ) : (
                        <Button
                            variant='success'
                            onClick={() => {
                                JoinActivitySuccess(data.join_id);
                            }}
                        >
                            สำเร็จ
                        </Button>
                    )}
                </td>
                <td>
                    <Button variant='outline-danger'>
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
                    <Card.Title>ข้อมูลการเข้าร่วมกิจกรรม</Card.Title>

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
                                <th>ผู้เข้าร่วมมกิจกรรม</th>
                                <th>เบอร์โทรศัพท์</th>
                                <th>สถานที่</th>
                                <th>วันที่กดเข้าร่วม</th>
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
