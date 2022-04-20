import LazyLoad from "../lib/LazyLoading.js";

export default function SearchResult({ $app, initialState }) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "SearchResult";
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
    LazyLoad();
  };

  this.render = () => {
    this.$target.innerHTML = this.state.data
      .map(
        (cat, index) => `
        <div class="item" data-index="${index}">
          <img class="lazy" data-src=${cat.url} alt=${cat.name} />
          <div>${cat.name}</div>
        </div>
        `
      )
      .join("");
  };

  this.onClick = onClick;

  this.$target.addEventListener("click", (e) => {
    const $searchItem = e.target.closest(".item");
    const { index } = $searchItem.dataset;
    this.onClick(this.state[index]);
  });

  this.render();
  LazyLoad();
}
