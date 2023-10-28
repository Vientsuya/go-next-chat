'use client';
import { useState, useContext, useEffect } from 'react';
import ChatBody from '@/components/ChatBody';
import { WebsocketContext } from '@/components/WebsocketProvider';
import { AuthContext } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/app/constants';
import autosize from 'autosize';

export type Message = {
  content: string;
  client_id: string;
  room_id: string;
  username: string;
  type: 'received' | 'self';
};

export default function WebApp() {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [textareaValue, setTextareaValue] = useState<string>('');
  const [users, setUsers] = useState<Array<{ username: string }>>([]);
  const { connection } = useContext(WebsocketContext);
  const { user } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (connection === null) {
      router.push('/');
      return;
    }

    const roomId = connection.url.split('/')[5];

    async function getUsers() {
      try {
        const res = await fetch(`${API_URL}/ws/getClients/${roomId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        console.log('data: ' + JSON.stringify(data));
        setUsers(data);
      } catch (e) {
        console.error(e);
      }
    }

    getUsers();
  }, []);

  useEffect(() => {
    if (connection === null) {
      router.push('/');
      return;
    }

    connection.onmessage = (message) => {
      const msg: Message = JSON.parse(message.data);
      if (msg.content === 'A new user has joined the room') {
        setUsers([...users, { username: msg.username }]);
      }

      if (msg.content === 'user left the chat') {
        const deleteUser = users.filter((user) => user.username != msg.username);
        setUsers([...deleteUser]);
        setMessages([...messages, msg]);
        return;
      }

      user?.username === msg.username ? (msg.type = 'self') : (msg.type = 'received');
      setMessages([...messages, msg]);
    };

    connection.onclose = () => {};
    connection.onerror = () => {};
    connection.onopen = () => {};
  }, [textareaValue, messages, connection, users]);

  function sendMessage(textareaValue: string) {
    if (textareaValue === '') return;
    if (connection === null) {
      router.push('/');
      return;
    }

    connection.send(textareaValue);
    setTextareaValue('');
  }

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="p-8 px-16">
          <ChatBody data={messages} />
        </div>
        <div className="fixed bottom-0 mt-4 w-full">
          <div className="bg-grey-300 flex rounded-md px-4 py-2 md:mx-4 md:flex-row">
            <div className="mr-4 flex w-full rounded-md border border-blue-500">
              <textarea
                placeholder="type your message here"
                className="h-10 w-full rounded-md p-2 focus:outline-none"
                style={{ resize: 'none' }}
                onChange={(e) => setTextareaValue(e.target.value)}
              />
            </div>

            <div className="flex items-center">
              <button
                className="rounded-md bg-blue-500 p-2 text-white"
                onClick={() => sendMessage(textareaValue)}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
