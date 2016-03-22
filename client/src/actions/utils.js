//functions that send post req to server w/ user info
import io from 'socket.io-client/socket.io';
import zoneHandler from './zoneHandler.js';

const SERVER_URL = 'http://localhost:3000';

export function sendReq (type,route,body){ 
  const url = `${SERVER_URL}${route}`;
  const headers = { 'Content-Type': 'application/json'};
  const options = {headers,type}

  return fetch(url, options)
};

//Connect socket
export function connectSocket(){
  return io.connect(SERVER_ADDRESS, { jsonp: false });
};

export function updateZoneSubscription(socket, oldZones, newZones){
  //socket.leave(oldZones);
  //socket.join(newZones);
};