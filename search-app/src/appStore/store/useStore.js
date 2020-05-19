import { useContext, useEffect, useState } from 'react';
import { ReactReduxContect } from 'react-redux';

function useStore() {
    const { store } = useContext(ReactReduxContect);
    const { getState, dispatch, subscribe} = store;
    const [storeState, setStoreState] = useState(getState());

    // subscribe only once
  useEffect(() => subscribe(
    () => setStoreState(getState())
  , []))

  return [storeState, dispatch]
}