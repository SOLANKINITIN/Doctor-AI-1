import ReducerFactory from "./reducerFactory";
import { createAction } from "redux-actions";

const PREFIX = "@DOCTOR_AI";

const getActionName = name => `${PREFIX}/${name}`;

const getDataAction = (name) => {
  return {
    reset: createAction(getActionName(`${name}_RESET`)),
    init: createAction(getActionName(`${name}_INIT`)),
    failed: createAction(getActionName(`${name}_FAILED`)),
    success: createAction(getActionName(`${name}_SUCCESS`))
  }
}

export const hospitalListingAction = getDataAction('HOSPITAL_LISTING');
export const hospitalDetailAction = getDataAction('HOSPITAL_DETAIL');

const addDataAction = (action, key) => {
  return (reducerFactory) => {
    reducerFactory.add(action.reset, (state) => {
      return {
        ...state,
        [key]: {
          initialized: false,
          loading: true,
          error: null,
          data: null,
        }
      }
    })
    reducerFactory.add(action.init, (state) => {
      return {
        ...state,
        [key]: {
          initialized: true,
          loading: true,
          error: null,
          data: null,
        }
      }
    })
    reducerFactory.add(action.failed, (state, action) => {
      return {
        ...state,
        [key]: {
          initialized: true,
          loading: false,
          error: action.payload,
          data: null,
        }
      }
    })
    reducerFactory.add(action.success, (state, action) => {
      return {
        ...state,
        [key]: {
          initialized: true,
          loading: false,
          error: null,
          data: action.payload,
        }
      }
    })
  }
}

const initialState = {
  hospitals: {
    initialized: false,
    loading: false,
    error: null,
    data: null,
  },
  hospitalDetail:{
    initialized: false,
    loading: false,
    error: null,
    data: null,
  },
};
const reducer = new ReducerFactory(initialState)
  .addCustom(addDataAction(hospitalListingAction, 'hospitals'))
  .addCustom(addDataAction(hospitalDetailAction, 'hospitalDetail'))
  .toReducer();

export default reducer;
