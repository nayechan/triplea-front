import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { BroadcastChannel } from 'broadcast-channel';

const routeChannel = new BroadcastChannel('route-channel');
const RouteTextContext = createContext();

export const RouteTextProvider = ({ children }) => {
  const [routeText, setRouteText] = useState('');
  const [isReady, setIsReady] = useState(false);
  const tabId = Math.random().toString(36);
  const onReady = useRef(null);

  // Function to update route text
  const updateRouteText = (text, tabId) => {
    setRouteText(text);
    routeChannel.postMessage({ type: "text", value: text, tabId: tabId });
    // Broadcast the updated text
  }

  // Function to set onReady from outside
  const setOnReady = (callback) => {
    onReady.current = callback;
  };

  // Listen for incoming messages
  useEffect(() => {
    const informReady = () => {
      setIsReady(true);
      routeChannel.postMessage({ type: "informReady", value: true, tabId: tabId });
    }

    const handleMessage = (event) => {
      if (event.type === "text") {
        console.log(tabId+"/"+event.tabId);
        // Log the received data
        if(tabId === event.tabId)
        {
          console.log("Received message:", event.value);
          setRouteText(event.value);
        }
      } else if (event.type === "informReady") {
        console.log("Ready complete");
        setIsReady(event.value);
        if (onReady.current) onReady.current(event.tabId); // Call onReady if it is defined
      }
    };

    routeChannel.addEventListener('message', handleMessage);
    informReady(true);

    return () => {
      routeChannel.removeEventListener('message', handleMessage);
      // Clean up
    };
  }, []); // Add onReady to the dependency array

  return (
    <RouteTextContext.Provider value={{ routeText, updateRouteText, setOnReady }}>
      {children}
    </RouteTextContext.Provider>
  );
}

export const useRouteTextContext = () => useContext(RouteTextContext);
