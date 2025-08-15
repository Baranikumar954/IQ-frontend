import {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import DataContext from '../context/DataProvider';
export const PrivateRoute = ({ children }) => {
  const {user} = useContext(DataContext)

  return user.mail==='' ? <Navigate to="/login" /> :children;
};
