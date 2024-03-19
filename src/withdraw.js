import React, { useState } from 'react';
import { ref, update, get } from 'firebase/database';
import { database } from './firebase';
import { useUser } from './userContext';
import Card from 'react-bootstrap/Card';

const Withdraw = () => {
    const { user, updateBalance } = useUser();
    const [show, setShow] = useState(true);
    const [status, setStatus] = useState('');
    const [withdraw, setWithdraw] = useState('');

    const handleWithdraw = async () => {
        const withdrawAmount = parseFloat(withdraw);
        if (!withdraw || isNaN(withdrawAmount) || withdrawAmount <= 0) {
            setStatus('Error: Please enter a valid withdrawal amount.');
            setTimeout(() => setStatus(''), 3000);
            return;
        }

        if (!user || !user.uid) {
            setStatus('Error: No user logged in.');
            setTimeout(() => setStatus(''), 3000);
            return;
        }

        try {
            const userRef = ref(database, `users/${user.uid}`);
            
            // Fetch the current balance using get()
            const snapshot = await get(userRef);
            const userData = snapshot.val();
            const currentBalance = userData.balance || 0;

            if (withdrawAmount > currentBalance) {
                setStatus('Error: Withdrawal amount exceeds current balance.');
                setTimeout(() => setStatus(''), 3000);
                return;
            }

            const newBalance = currentBalance - withdrawAmount;

            // Update the balance in Firebase
            await update(userRef, { balance: newBalance });

            if(updateBalance) {
                updateBalance(newBalance);
            }

            setStatus('Withdrawal successful!');
            setShow(true);

        } catch (error) {
            console.error('Error updating user balance:', error);
            setStatus('Error: Failed to withdraw amount. Please try again later.');
            setTimeout(() => setStatus(''), 3000);
        }
    };

    const clearForm = () => {
        setWithdraw('');
    };

    return (
        <Card className='bg-secondary' style={{ width: '400px', marginLeft: '20px' }}>
            <Card.Body>
                <>
                    <Card.Title>Withdraw</Card.Title>
                    <hr style={{ margin: '10px 0' }} />
                    <div style={{ marginBottom: '10px' }}>
                        Current Balance: ${user && user.balance ? user.balance.toFixed(2) : '0.00'}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        Withdraw Amount
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter amount"
                            value={withdraw}
                            onChange={(e) => setWithdraw(e.currentTarget.value)}
                        />
                    </div>
                    {status && <div style={{ color: 'red' }}>{status}</div>}
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={handleWithdraw}
                        disabled={!withdraw || parseFloat(withdraw) <= 0}
                    >
                        Withdraw
                    </button>
                </>
            </Card.Body>
        </Card>
    );
};

export default Withdraw;
