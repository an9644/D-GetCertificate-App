import React from 'react'
import{
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import Home from './Pages/Home';
import Issue from './Pages/Issue';
import View from './Pages/View';

  const App = () => {
    const router=createBrowserRouter(createRoutesFromElements(
      <>
        <Route path="/" element={<Home/>} />
        <Route path="/issue" element={<Issue/>} />
        <Route path="/view" element={<View/>} />
      </>
  ))
  return (
    <RouterProvider router={router}/>
  )
}
export default App