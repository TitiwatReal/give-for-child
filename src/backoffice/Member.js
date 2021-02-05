import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Form, FormControl, Button, Card, Modal } from 'react-bootstrap';
import './css/ActivityBack.css';
import axios from 'axios';
import Swal from 'sweetalert2';
var urlExists = require('url-exists');

axios.defaults.baseURL = 'http://localhost:3001/';

const Member = () => {
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        updateRows();
    }, []);

    const updateRows = async () => {
        try {
            await axios
                .get(`/members`)
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
        // const [img, setImg] = useState('../resources/images/member-default.png');
        // urlExists(data.img, function (err, exists) {
        //     if (exists) {
        //         setImg(data.img);
        //     }
        // });
        return (
            <tr>
                <td>{data.id}</td>
                <td>
                    <img src={data.img} style={{ width: '80px' }} />
                </td>
                <td>{data.name}</td>
            </tr>
        );
    };

    // const Delete = (id) => {
    //     Swal.fire({
    //         title: 'ต้องการลบ ?',
    //         text: '',
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'ตกลง',
    //         cancelButtonText: 'ยกเลิก',
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             try {
    //                 axios
    //                     .delete(`/foundation/${id}`)
    //                     .then(function (res) {
    //                         Swal.fire('', res.data, 'success');
    //                         updateRows();
    //                     })
    //                     .catch(function (err) {
    //                         Swal.fire('', 'ผิดพลาด', 'error');
    //                     });
    //             } catch (err) {
    //                 console.log(err);
    //                 if (err.response.status === 500) {
    //                 } else {
    //                 }
    //             }
    //         }
    //     });
    // };

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
                    <Card.Title>รายชื่อผู้ใช้งาน</Card.Title>

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
                            </tr>
                        </thead>
                        <tbody>{rowData.map((v) => setRow(v))}</tbody>
                    </Table>
                </Card>
            </div>
        </div>
    );
};

export default Member;
