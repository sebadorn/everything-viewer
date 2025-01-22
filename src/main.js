import { MainView } from './ui/components/MainView.js';

import './css/screen.css';
import './css/views.css';


const mainView = new MainView();
document.body.append( mainView.render() );
