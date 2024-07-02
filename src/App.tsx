/* eslint-disable react/react-in-jsx-scope */
import './App.css'
import Header from './components/Header'
import Router from './routes/Router'

function App(): JSX.Element {

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <>
      <Header />
      <div className="mainWrapper">
        <Router />
      </div>
    </>
  )

}
export default App
