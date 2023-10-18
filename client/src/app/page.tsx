'use client';
import {useState, useEffect} from 'react';
import {API_URL} from '@/app/constants';
import {v4 as uuidv4} from 'uuid';

export default function Home() {
  const [rooms, setRooms] = useState<{id: string; name: string}[]>([]);
  const [roomName, setRoomName] = useState('');

  async function getRooms() {
    try {
      const res = await fetch(`${API_URL}/ws/getRooms`, {
        method: 'GET',
      });

      const data = await res.json();
      if (res.ok) {
        setRooms(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();

    try {
      setRoomName('');
      const res = await fetch(`${API_URL}/ws/createRoom`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          id: uuidv4(),
          name: roomName,
        }),
      });

      if (res.ok) {
        getRooms();
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <>
      <div className="my-8 h-full w-full px-4 md:mx-32">
        <div className="mt-3 flex justify-center p-5">
          <input
            type="text"
            className="focus:border-blue rounded-md border border-gray-200 p-2 focus:outline-none"
            placeholder="room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button
            className="rounded-md border bg-blue-500 p-2 text-white md:ml-4"
            onClick={submitHandler}>
            create room
          </button>
        </div>
        <div className="mt-6">
          <div className="md mt-6 grid grid-cols-1 gap-4 md:grid-cols-5">
            {rooms.map((room, index) => (
              <div
                key={index}
                className="flex w-full items-center rounded-md border border-blue-500 p-4">
                <div className="w-full">
                  <div className="text-sm">Room {room.id}</div>
                  <div className="text-blue text-lg font-bold">{room.name}</div>
                </div>
                <div>
                  <button className="rounded-md bg-blue-500 px-4 py-1 text-white">
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
