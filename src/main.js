import './style/stackoverflow-dark.min.css';
import './style/main.scss';

import { MainView } from './ui/components/MainView.js';

const mainView = new MainView();
document.body.append( mainView.render() );
