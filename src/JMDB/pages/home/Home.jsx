import React, { useEffect } from 'react';


function Home() {
    useEffect(() => {
        const query = `
    mutation {
      createUser(input: {
        email: "test@example.com",
        username: "testUser",
        pass: "123456"
      }) {
        id
        username
        email
      }
    }
  `;

        fetch("http://localhost:8080/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query }),
        })
            .then(res => res.json())
            .then(data => console.log("✅ Yanıt:", data))
            .catch(err => console.error("❌ Hata:", err));
    }, []);

    return (
        <div>
            <h1>Home - Kayıt Testi</h1>
        </div>
    );
}

export default Home;
