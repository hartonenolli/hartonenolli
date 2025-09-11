import React, { useEffect, useState } from 'react';

const App = () => {
  const [messageFromBackend, setMessageFromBackend] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      const response = await fetch('/api/message');
      const data = await response.json();
      setMessageFromBackend(data.message);
    };

    fetchMessage();
  }, []);

  return (
    <div>
      <p>Hello world</p>
      <p>Message from backend: {messageFromBackend}</p>
    </div>
  );
};

export default App;