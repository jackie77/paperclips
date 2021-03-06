import { ADD_VOTE, REPLACE_ESTABS } from '../actions/constants';

const INITIAL_STATE = {
  establishments: null, //{estId:{id, name, ...}}
  allTraits: null, //{estId: {1:{lp,lt,hp,ht,up,ut},2:{},...},...}
  userComboScore: null //{estId: {hist, live, user}}
};

export default function (state = {}, action) {
  //action.payload is {estId, votes, userVotes, allTraits, userComboScore};
  switch (action.type) {
    case ADD_VOTE:
      var newState = Object.assign({},state);
      var estId = action.payload.estId;
      var newVotesArr = action.payload.votes;
      var newUserVotesArr = action.payload.userVotes;
      var newAllTraitsScores = action.payload.allTraits;
      var newUserComboScore = action.payload.userComboScore;

      if(newState.establishments[estId]){
        console.log('VOTES FOR ASIAN BOX:',newState.establishments[estId].Votes.length);
        newState.establishments[estId].Votes = newState.establishments[estId].Votes.concat(newVotesArr);
        newState.establishments[estId].userVotes = newState.establishments[estId].userVotes.concat(newUserVotesArr);
        newState.allTraits[estId] = newAllTraitsScores;
        newState.userComboScore[estId] = newUserComboScore;
      }
      return newState;
    case REPLACE_ESTABS:
      return action.payload;
    default:
      return state;
  }
}

