import React, { Component, useState } from 'react';
import './css/LoginAdmin.css';
import { Row, Container, Col, Jumbotron, Button } from 'react-bootstrap';

import Swal from 'sweetalert2';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import './css/CreateAdmin.css';

const CreateFoundation = () => {
  const history = useHistory();
  const [name, setname] = useState('');
  const [url, setUrl] = useState('');
  const [img, setImg] = useState(null);

  const onChangeImg = (e) => {
    setImg(e.target.files[0]);
  };

  const onSubmit = async () => {
    const data = {
      name: name,
      url: url,
    };
    let form = new FormData();
    form.append('file', img);
    form.append('data', JSON.stringify(data));
    try {
      await axios
        .post('/foundation/', form)
        .then((res) => {
          if (res.status == 200) {
            Swal.fire('', 'สำเร็จ', 'success');
            setTimeout(() => {
              history.push('/backend');
            }, 1500);
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
    <Container className='all-font' style={{ marginTop: '5%' }}>
      <Row>
        <Col></Col>
        <Col xs={6}>
          <Jumbotron>
            <h3>สร้างมูลนิธิ</h3>

            <div className='form-group'>
              <label>ชื่อ</label>
              <input
                type='text'
                className='form-control'
                placeholder='ชื่อ'
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
            </div>

            <div className='form-group'>
              <label>Url เว็บ</label>
              <input
                type='text'
                className='form-control'
                placeholder='www.web.com'
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
              />
            </div>

            <div className='form-group'>
              <label>รูปภาพ</label>
              <input
                type='file'
                className='form-control'
                onChange={onChangeImg}
              />
            </div>

            <Button className='buttonW' variant='info' onClick={onSubmit}>
              ยืนยัน
            </Button>
          </Jumbotron>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default CreateFoundation;
