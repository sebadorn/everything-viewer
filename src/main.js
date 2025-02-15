import './style/stackoverflow-dark.min.css';
import './style/main.scss';

import { MainView } from './ui/components/MainView.js';
import { Registry } from './plugins/Registry.js';


Registry.init();

const mainView = new MainView();
document.body.append( mainView.render() );
