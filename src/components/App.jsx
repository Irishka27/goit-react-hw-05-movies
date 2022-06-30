import { Switch, Route } from 'react-router-dom';
import HomePage from "views/HomePage";
import AppBar from "./AppBar";


export default function App () {
  return(
    <>
    <AppBar />
    <Route path="/">
     <HomePage />
    </Route>
    </>
  )
}
