import { DivComponent } from '../../common/div-component.js';
import './search.css';

export class Search extends DivComponent {
  constructor(state) {
    super();
    this.state = state;
  }

  search() {
    this.state.searchQuery = this.el.querySelector('.search__input').value;
  }

  render() {
    this.el.classList.add('search');
    this.el.innerHTML = `
      <div class="search__wrapper">
        <input class="search__input" 
               type="text" 
               value="${this.state.searchQuery ? this.state.searchQuery : ''}" 
               placeholder="Найти книгу или автора...."
        />
        <img src="/static/search.svg" alt="иконка поиска"/>
      </div>
      <button aria-label="кнопка искать"><img src="/static/search-white.svg" alt="иконка поиска"/></button>
    `;
    this.el.querySelector('button').addEventListener('click', this.search.bind(this));
    this.el.querySelector('.search__input').addEventListener('keydown', e => {
      if (e.code === 'Enter') {
        this.search();
      }
    });
    return this.el;
  }
}
