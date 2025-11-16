import './style/stackoverflow-dark.min.css';
import './style/main.scss';

import { MainView } from './ui/components/MainView.js';
import { Registry } from './plugins/Registry.js';
import { Language } from './ui/Language.js';


Registry.init();
await Language.load();

const mainView = new MainView();
document.body.append( mainView.render() );
