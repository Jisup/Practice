export default function SearchResult({ $app, initialState }) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "SearchResult";
  $app.appendChild(this.$target);

  this.data = initialData;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = this.data
      .map(
        (cat) => `
        <div class="item">
          <img src=${cat.url} alt=${cat.name} />
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
}
