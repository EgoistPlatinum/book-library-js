import { AbstractView } from '../../common/view.js';
import { Header } from '../../components/header/header.js';
import onChange from 'on-change';
import { Search } from '../../components/search/search.js';
import { CardList } from '../../components/card-list/card-list.js';

export class FavoritesView extends AbstractView {
  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.setTitle('Мои книги');

    this.mainElement = document.createElement('main');
    this.headerInstance = new Header(this.appState);
  }

  destroy() {
    onChange.unsubscribe(this.appState);
  }

  appStateHook(path) {
    if (path === 'favorites') {
      this.render();
    }
  }

  render() {
    this.mainElement.innerHTML = '';

    this.mainElement.append(
      new CardList(this.appState, { list: this.appState.favorites }).render()
    );

    const oldMain = this.app.querySelector('main');
    if (oldMain && oldMain !== this.mainElement) {
      oldMain.remove();
    }

    if (!this.app.contains(this.mainElement)) {
      this.app.append(this.mainElement);
    }

    this.renderHeader();
  }

  renderHeader() {
    const oldHeader = this.app.querySelector('header');
    if (oldHeader) {
      oldHeader.remove();
    }

    const header = this.headerInstance.render();
    this.app.prepend(header);
  }
}
