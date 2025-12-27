import { AbstractView } from '../../common/view.js';

export class MainView extends AbstractView {
  constructor() {
    super();
    this.setTitle('Поиск книг');
  }

  render() {
    const main = document.createElement('main');
    main.innerHTML = 'Main';
    main.innerHTML = '';
    this.app.appendChild(main);
  }
}
