import { AbstractView } from '../../common/view.js';
import { Header } from '../../components/header/header.js';
import onChange from 'on-change';
import { Search } from '../../components/search/search.js';
import { CardList } from '../../components/card-list/card-list.js';

export class MainView extends AbstractView {
  state = {
    list: [],
    loading: false,
    searchQuery: undefined,
    offset: 0,
  };

  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.state = onChange(this.state, this.stateHook.bind(this));
    this.setTitle('Поиск книг');

    this.mainElement = document.createElement('main');
    this.headerInstance = new Header(this.appState);
  }

  appStateHook(path) {
    if (path === 'favorites') {
      console.log(path);
    }
  }

  async stateHook(path) {
    if (path === 'searchQuery') {
      this.state.loading = true;
      const data = await this.loadList(this.state.searchQuery, this.state.offset);
      this.state.loading = false;
      console.log(data);
      this.state.list = data.docs;
    }

    if (path === 'list' || path === 'loading') {
      this.render();
    }
  }

  async loadList(q, offset) {
    const res = await fetch(`https://openlibrary.org/search.json?q=${q}&offset=${offset}`);
    return res.json();
  }

  render() {
    this.mainElement.innerHTML = '';

    this.mainElement.append(new Search(this.state).render());
    this.mainElement.append(new CardList(this.appState, this.state).render());

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
