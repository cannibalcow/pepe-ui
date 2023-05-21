import { useEffect, useState } from 'react';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import { ReadyState } from 'react-use-websocket';
import { Message, Queue } from './lib/core';
import { Card, Timeline } from 'flowbite-react';
// FUCK YOU LINUX COPY PASTE




function App() {

  const [socketUrl] = useState("ws://localhost:8080");
  const [messageHistory, setMessageHistory] = useState<Queue<Message>>(new Queue<Message>(10));
  const [numMessages, setNumMessages] = useState(messageHistory.size());

  const { lastJsonMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastJsonMessage !== null) {
      messageHistory.enqueue(lastJsonMessage);
    }

  }, [lastJsonMessage, setMessageHistory]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];


  return (
    <>
      <div className="flex flex-row origin-center">
        <div className="basis-1/3">{connectionStatus}</div>
        <div className="basis-1/3 shadow-md h-screen p-4">
          <Card>
            <Timeline>
              {messageHistory.items().map((message, index) => (
                <Timeline.Item className={`${index >= numMessages ? 'opacity-100 fadeIn' : ''} pl-4`} key={index}>
                  < Timeline.Point />
                  <Timeline.Content>
                    <Timeline.Time>
                      {message.createddate}
                    </Timeline.Time>
                    <Timeline.Title>
                      {message.title} - {message.subcategory}
                    </Timeline.Title>
                    <Timeline.Body>
                      {message.description}
                    </Timeline.Body>
                  </Timeline.Content>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </div>
        <div className="basis-1/3"></div>
      </div >
    </>
  );

}

export default App;
