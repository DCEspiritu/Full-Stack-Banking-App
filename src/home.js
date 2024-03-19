import React from 'react';
import Card from 'react-bootstrap/Card';

const Home = () => {
  return(
      <Card className='bg-secondary' style={{ width: '400px', marginLeft: '20px' }}>
          <Card.Header className='text-white'>GoodBank Landing Page</Card.Header>
          <Card.Body className='bg-light'>
            <Card.Title>Welcome to the bank!</Card.Title>
            <Card.Text>Your money is NOW safe with us.</Card.Text>
            <img src="/bank.png" className="img-fluid" alt="Resonsive image"/>
          </Card.Body>
      </Card>
  );
}

export default Home;