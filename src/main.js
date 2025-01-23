import './css/screen.css';
import './css/stackoverflow-dark.min.css';
import './css/views.css';

import { MainView } from './ui/components/MainView.js';

const mainView = new MainView();
document.body.append( mainView.render() );
