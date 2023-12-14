
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './pages/sing.tsx';
import ErrorPage from './error-pages.tsx';
import { Teams } from './pages/Teams.tsx';
import { Layout } from './components/Layout.tsx';
import { Projects } from './pages/Projets.tsx';
import { DashBoard } from './pages/Dashboard.tsx';
import { SuiviPersonnels } from './pages/suivi Personnels.tsx';
import { Kanban } from './pages/Kanban.tsx';
import { Finances } from './pages/finances.tsx';

const router =createBrowserRouter([
  {
    path: '/',
    element:   <Login/> ,
  },
  {
    path: '/',
    element: <Layout/>,
    errorElement: <ErrorPage />,
      children:[
       {
        path: 'Projets',
        element: <Projects/>,
      },
      {
        path: 'DashBoard',
        element: <DashBoard/>,

      },
      {
        path: 'Teams',
        element: <Teams/>,

      },
      {
        path: 'suivi_Personnels',
        element: <SuiviPersonnels/>,
        errorElement: <ErrorPage />,

      },
      {
        path: 'Kanban',
        element: <Kanban/>,
        errorElement: <ErrorPage />,

      },
      {
        path: 'finances',
        element: <Finances/>,
        errorElement: <ErrorPage />,

      },

    ]
  }
  
 
  
])

function App() {

  return (
    <> <RouterProvider router={router}/>
      
    </>
  )
}

export default App
