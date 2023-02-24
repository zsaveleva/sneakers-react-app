import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Drawer } from './drawer';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { Orders } from './pages/Orders';
import { useAppDispatch } from './store/hooks/hooks';
import { fetchCartItems, fetchFavorites, fetchItems } from './store/asyncActions';

function App() {
  const dispatch = useAppDispatch()
  const [searchValue, setSearchValue] = useState<string>('');


  useEffect(() => {
    dispatch(fetchItems())
    dispatch(fetchFavorites())
    dispatch(fetchCartItems())
  }, [])

  const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }

  return (
    <div className='wrapper clear'>
      <Drawer />
      <Header />
      <Routes>
        <Route
          path={'/'}
          element={
            <Home
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
            />
          } />
        <Route
          path='/favorites'
          element={<Favorites />}
        />
        <Route
          path='/orders'
          element={<Orders />}
        />
      </Routes>
    </div>
  );
}

export default App;
