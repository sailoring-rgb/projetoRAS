// import '../../css/views/App.css';
import GamesListView from './GamesListView';
import { NavBar } from '../blocks/NavBar';
//import {NotificationList} from '../blocks/NotificationList';
import '../../css/index.scss';

export const App = ({game}) => {
  return (
    <main className='main-container'>
      <NavBar />
      <div className='main-content'>
        <GamesListView game={game} />
      </div>
    </main>
  );
}