'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
    const [items, setItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const fetchItems = async () => {
        try {
            const res = await fetch('/api/items', { method: 'GET' });
            const data = await res.json();
            setItems(data);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    const addItem = async () => {
        try {
            const res = await fetch('/api/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newItemName, email: "newItemEmail", password: "newItemPassword" }),
            });

            if (!res.ok) {
                const errorText = await res.json();
                console.error('Failed to add item:', res.status, errorText);
                return;
            }
            const data = await res.json(); // Only parse if res.ok
            console.log('Item added:', data);
            setNewItemName('');
            fetchItems();
        } catch (err) {
            console.error('Error adding item:', err);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div>
            <input type="text" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} />
            <button onClick={addItem}>Add Item</button>
            <h1>Items:</h1>
            <ul>
                {items.map((item: any) => (
                    <li key={item._id}>{item.name} {item.email} {item.password}</li>
                ))}
            </ul>
        </div>
    );
}