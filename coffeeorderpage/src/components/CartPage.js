export default function CartPage({ $app, initialState }) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "CartPage";
  $app.appendChild(this.$target);

  this.render = () => {};
}
