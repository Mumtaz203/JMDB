import React from 'react';
import Header from './JMDB/components/Header'; // header'ı ekliyoruz

function App() {
    return (
        <div>
            <Header />
            {/* Sayfa içeriği burada olacak */}
            <main style={{ padding: '2rem' }}>
                <h2>Welcome to JMDB!</h2>
            </main>
        </div>
    );
}

export default App;
