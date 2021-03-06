import {LOGIN} from './constants.js';
import {sendReq,updateZoneSubscription, connectSocket} from './utils.js';

import zoneHandler from './zoneHandler.js';
import addSocket from './action_addSocket';
import clearError from './action_clearError';

function userLogin(userData) {
  return {
    type: LOGIN,
    payload: userData
  }
}

export default (user, reactNavigator, route) => {
  return (dispatch) => {
    sendReq('POST', route, user).then(function(res){
      let body = JSON.parse(res._bodyText);
      if(res.status === 200){
        function gotLocation(position){
          dispatch(clearError()); //Remove any login errors from store
          let userZone = zoneHandler.zoneCalculator(position.coords.latitude, position.coords.longitude);
          let estabZones = zoneHandler.getSurroundingZones(userZone);
          console.log('INITIAL USER ZONE:',userZone);
          console.log('INITIAL SUR ZONE:',estabZones);
          body.userZone = userZone;
          body.latitude = position.coords.latitude;
          body.longitude = position.coords.longitude;
          var socket = connectSocket();
          addSocket(dispatch, socket);//saves socket into state, adds listeners for ('New Establishments', 'voteAdded')
          dispatch(userLogin(body)); //save user info to user state
          socket.emit('Get Establishments',{userId: body.id, zones: estabZones});
          updateZoneSubscription(socket,[],estabZones); //joins zones
          reactNavigator.immediatelyResetRouteStack([{ name: 'Map' }]);//then redirect user to mapview
        };
        function logError(error) {
          console.log("Navigator 'getCurrentPosition' error:", error);
        };
        var geo_options = {
          enableHighAccuracy: true, 
          maximumAge        : 30000, 
          timeout           : 27000
        };
        navigator.geolocation.getCurrentPosition(position => gotLocation(position), logError, geo_options);
      } else {
        dispatch(userLogin(body)) //add error to user state
      }
    })
  }
}