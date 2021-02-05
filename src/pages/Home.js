import React from 'react';
import { Container, Carousel, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

import './css/Home.css';
import Footer from '../components/Footer';

function Home() {
    return (
        <div className='all-font'>
            <div className='banner-test'>
                <Carousel>
                    <Carousel.Item>
                        <img className='d-block w-100' src='./resources/banner-home1.jpg' alt='First slide' />
                        <Carousel.Caption>
                            <h1>“มอบน้ำใจจากคุณ ช่วยชีวิตพวกเขาตอนนี้”</h1>
                            <p>สิ่งของและเงินทุกบาทของท่านจะถูกบริจาคไปให้กับบ้านเด็กกำพร้า</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className='d-block w-100' src='./resources/banner-home1.jpg' alt='Third slide' />

                        <Carousel.Caption>
                            <h1>"ปัจจุบันมีเด็กกำพร้า ที่เติบโตในสังคมไทยมากกว่า 800,000 คน"</h1>
                            <p>สิ่งของและเงินทุกบาทของท่านจะถูกบริจาคไปให้กับบ้านเด็กกำพร้า</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className='d-block w-100' src='./resources/banner-home1.jpg' alt='Third slide' />

                        <Carousel.Caption>
                            <h1>มอบรัก มอบ ”ชีวิตใหม่” ให้พวกเขา</h1>
                            <p>สิ่งของและเงินทุกบาทของท่านจะถูกบริจาคไปให้กับบ้านเด็กกำพร้า</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>

            <Container>
                <div style={{ textAlign: 'center', marginTop: '6%' }}>
                    <h3>แนะนำเว็บแอปพลิเคชัน</h3>
                    <p>
                        วันนี้เด็กๆ หลายคนคงเตรียมตัวออกไปร่วมกิจกรรมงานวันเด็กแห่งชาติประจำปีกันอย่างคึกคัก
                        <br />
                        แต่ก็มีเด็กอีกกลุ่มหนึ่ง ที่อาจจะไม่ได้ไปร่วมงานเหล่านี้ นั่นคือ เด็กที่ถูกผู้ปกครองทอดทิ้ง
                        ซึ่งจากสถิติปัจจุบันพบว่า เด็กที่ถูกทอดทิ้งพุ่งสูงขึ้นทุกปี...
                    </p>
                </div>
                <Row>
                    <Col sm style={{ textAlign: 'center' }}>
                        <div className='icon'>
                            <img src='./resources/charity1.png' alt='' />
                        </div>
                        <div>
                            <h3>Give for child</h3>
                            <p>
                                Web application ที่เป็นการเชื่อมต่อ <br />
                                การทำความดี
                            </p>
                        </div>
                    </Col>
                    <Col sm style={{ textAlign: 'center' }}>
                        <div className='icon'>
                            <img src='./resources/charity3.png' alt='' />
                        </div>
                        <div>
                            <h3>งานอาสา</h3>
                            <p>
                                เลือกใช้เวลากับงานอาสาที่ตรงใจหรือ
                                <br />
                                จองเลี้ยงอาหารเด็กที่สอดคล้องกับเวลาของคุณ
                            </p>
                        </div>
                    </Col>
                    <Col sm style={{ textAlign: 'center' }}>
                        <div className='icon'>
                            <img src='./resources/charity2.png' alt='' />
                        </div>
                        <div>
                            <h3>ร่วมสนับสนุนกับเรา</h3>
                            <p>
                                ช่องทางในการเชื่อมต่อการทำความดีคุณสามารถเข้าร่วมกิจกรรมต่างๆเพื่อพัฒนาสังคมกับเราได้โดยการบริจาคหรือเข้าร่วมกิจกรรมต่างๆ
                            </p>
                        </div>
                    </Col>
                </Row>

                <div className='group-menu'>
                    <Row>
                        <Col sm>
                            <Link to='/'>
                                <img className='main-menu' src='./resources/found3.png' alt='' />
                            </Link>
                            <Link to='/'>
                                <img className='main-menu' src='./resources/found4.png' alt='' />
                            </Link>
                        </Col>
                        <Col sm>
                            <Link to='/'>
                                <img className='main-menu' src='./resources/found5.png' alt='' />
                            </Link>
                            <Link to='/'>
                                <img className='main-menu' src='./resources/found6.png' alt='' />
                            </Link>
                        </Col>
                    </Row>
                </div>
                <Footer />
            </Container>
        </div>
    );
}

export default Home;
