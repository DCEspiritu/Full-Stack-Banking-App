import React, { useState, useEffect } from 'react';
import { database } from './firebase';
import { ref, get, child } from 'firebase/database';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

const AllData = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const dbRef = ref(database, 'users');
            try {
                const snapshot = await get(dbRef);
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const usersArray = Object.keys(data).map((key) => ({
                        ...data[key],
                        uid: key,
                    }));
                    setUserData(usersArray);
                } else {
                    console.log("No data available");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Card className='bg-secondary' style={{ marginLeft: '20px', marginRight: '20px' }}>
            <Card.Header className='text-white'>All Data</Card.Header>
            <Card.Body className='bg-light'>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((user, index) => (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>${user.balance.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default AllData;
