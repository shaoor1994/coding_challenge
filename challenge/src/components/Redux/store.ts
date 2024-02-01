// store.ts
// import { createStore } from 'redux';
// import rootReducer from './rootReducer';

// const store = createStore(rootReducer);

// export default store;
// import { createStore } from 'redux';
// import { usersReducer, selectedGenderReducer } from './rootReducer';

// const store = createStore(rootReducer);

// store.ts
import { createStore } from 'redux';
import rootReducer from './rootReducer';

const store = createStore(rootReducer);

export default store;
