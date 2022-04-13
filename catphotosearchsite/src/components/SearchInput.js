export default function SearchInput({ $app, onSearch }) {
  this.$target = document.createElement("input");
  this.$target.className = "SearchInput";
  this.$target.placeholder = "고양이를 검색해보세요.|";
  $app.appendChild(this.$target);

  this.onSearch = onSearch;

  this.$target.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      this.onSearch(e.target.value);
    }
  });
}
