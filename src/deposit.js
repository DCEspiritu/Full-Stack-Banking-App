import React, { useState } from 'react';
import { ref, update, get } from 'firebase/database';
import { database } from './firebase';
import { useUser } from './userContext';
import Card from 'react-bootstrap/Card';

const Deposit = () => {
    const { user, updateBalance } = useUser();
    const [show, setShow] = useState(true);
    const [status, setStatus] = useState('');
    const [deposit, setDeposit] = useState('');

    const handleDeposit = async () => {
        const depositAmount = parseFloat(deposit);
        if (!deposit || isNaN(depositAmount) || depositAmount <= 0) {
            setStatus('Error: Please enter a valid deposit amount.');
            setTimeout(() => setStatus(''), 3000);
            return;
        }

        if (!user || !user.uid) {
            setStatus('Error: No user logged in.');
            setTimeout(() => setStatus(''), 3000);
            return;
        }

        const userRef = ref(database, `users/${user.uid}`);

        try {
            // Fetch the current balance using get()
            const snapshot = await get(userRef);
            const userData = snapshot.val();
            const currentBalance = userData.balance || 0;
            const newBalance = currentBalance + depositAmount;

            // Update the balance in Firebase
            await update(userRef, { balance: newBalance });

            // Update the local state with the new balance if you have such a function in your context
            if(updateBalance) {
                updateBalance(newBalance);
            }

            setStatus('Deposit successful!');
            setShow(true);

        } catch (error) {
            console.error('Error depositing amount:', error);
            setStatus('Error: Failed to deposit amount. Please try again later.');
            setTimeout(() => setStatus(''), 3000);
        }
    };

    return (
        <Card className='bg-secondary' style={{ width: '400px', marginLeft: '20px' }}>
            <Card.Body>
                <>
                    <Card.Title>Deposit</Card.Title>
                    <hr style={{ margin: '10px 0' }} />
                    <div style={{ marginBottom: '10px' }}>
                        Current Balance: ${user && user.balance ? user.balance.toFixed(2) : '0.00'}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        Deposit Amount
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter amount"
                            value={deposit}
                            onChange={(e) => setDeposit(e.currentTarget.value)}
                        />
                    </div>
                    {status && <div style={{ color: 'red' }}>{status}</div>}
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={handleDeposit}
                        disabled={!deposit || parseFloat(deposit) <= 0}
                    >
                        Deposit
                    </button>
                </>
            </Card.Body>
        </Card>
    );
};

export default Deposit;
