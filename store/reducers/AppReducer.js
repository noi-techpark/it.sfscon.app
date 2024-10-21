import {
  SET_THEME,
  GET_CONFERENCE_SUCCESS,
  GET_CONFERENCE_FAIL,
  SET_SELECTED_DAY,
  SET_SELECTED_TRACKS,
  GET_MY_SCHEDULE_SUCCESS,
  TOGGLE_MY_SCHEDULE,
  SET_RATING_SUCCESS,
  SET_SESSION_MEASUREMENT,
  RESET_TRACKS_AND_DAY,
  SET_UPDATE_DATA_COUNTER,
  GET_RATING_SUCCESS,
  TOGGLE_TAB_BAR_VISIBILITY,
  SET_APP_OFFLINE_MODE,
} from "../constants/AppConstants";

const initialState = {
  force: 0,
  offlineMode: false,
  language: "en",
  tabBarVisibility: "show",
  updateDataCounter: 0,
  theme: "light",
  db: null,
  error: {},
  sessionRates: [],
  loader: false,
  selectedDay: null,
  selectedTracks: [],
  mySchedules: [],
  scheduleToggled: 0,
  rating: {},
  measurements: [],
};

export default AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };

    case GET_CONFERENCE_SUCCESS:
      const days = action.payload.conference?.idx?.days || [];
      const selectedDayFromStore = state.selectedDay;
      const findIdx = days.indexOf(selectedDayFromStore);
      const selectedDay = findIdx > -1 ? days[findIdx] : days[0];

      return {
        ...state,
        force: state.force + 1,
        db: action.payload,
        selectedDay: selectedDay,
        lastTimeUpdated: action.payload.last_updated,
      };

    case GET_CONFERENCE_FAIL:
      return {
        ...state,
      };

    case SET_UPDATE_DATA_COUNTER:
      return {
        ...state,
        updateDataCounter: state.updateDataCounter + 1,
      };

    case SET_SELECTED_DAY:
      return {
        ...state,
        selectedDay: action.payload,
      };

    case SET_SELECTED_TRACKS:
      return {
        ...state,
        selectedTracks: action.payload,
      };

    case GET_MY_SCHEDULE_SUCCESS:
      return {
        ...state,
        mySchedules: action.payload,
      };

    case TOGGLE_MY_SCHEDULE:
      return {
        ...state,
        scheduleToggled: state.scheduleToggled + 1,
      };

    case GET_RATING_SUCCESS:
      const { my_rate } = action.payload;

      return {
        ...state,
        myRate: my_rate,
      };

    case SET_RATING_SUCCESS:
      const { avg, nr, sessionId } = action.payload;
      const database = JSON.parse(JSON.stringify(state.db));
      Object.keys(database?.conference?.db?.sessions).forEach((id) => {
        const session = database?.conference?.db?.sessions[id];
        if (id === sessionId) {
          session.rating = [avg, nr];
        }
        return session;
      });

      return {
        ...state,
        ratingAdded: state.ratingAdded + 1,
        db: database,
        myRate: action?.payload?.my_rate,
      };

    case SET_SESSION_MEASUREMENT:
      return {
        ...state,
        measurements: action.payload,
      };

    case RESET_TRACKS_AND_DAY:
      const defaultDay = state.db?.conference?.idx.days[0];
      return {
        ...state,
        selectedTracks: [],
        selectedDay: defaultDay,
        questions: [],
        questionAdded: 0,
        questionLiked: 0,
      };

    case TOGGLE_TAB_BAR_VISIBILITY:
      return {
        ...state,
        tabBarVisibility: action.payload,
      };

    case SET_APP_OFFLINE_MODE:
      return {
        ...state,
        offlineMode: true,
      };

    default:
      return state;
  }
};
