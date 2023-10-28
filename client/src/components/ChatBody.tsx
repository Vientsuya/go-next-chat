import { Message } from '@/app/webapp/page';

export default function ChatBody({ data }: { data: Array<Message> }) {
  return (
    <>
      {data.map((message: Message, index: number) => {
        if (message.type == 'self') {
          return (
            <div
              className="mt-2 flex w-full flex-col justify-end text-right"
              key={index}>
              <div className="text-sm">{message.username}</div>
              <div>
                <div className="mt-1 inline-block rounded-md bg-blue-500 px-4 py-1 text-white">{message.content}</div>
              </div>
            </div>
          );
        } else {
          return (
            <div
              className="mt-2"
              key={index}>
              <div className="text-sm">{message.username}</div>
              <div>
                <div className="text-dark-secondary mt-1 inline-block rounded-md bg-gray-300 px-4 py-1">
                  {message.content}
                </div>
              </div>
            </div>
          );
        }
      })}
    </>
  );
}
