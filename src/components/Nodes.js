export default function Nodes({ $app, initialState }) {
  this.state = initialState;
  this.$target = document.createElement('div');
  this.$target.className = 'Nodes';
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state.node) {
      this.state.node.map((node, index) => {
        const iconPath = node.type === 'DIRECTORY' ? './assets/directory.png' : './assets/file.png';
        this.$target.innerHTML = `
        <div class="Node">
          <img src="${iconPath}" />
          <div>${node.name}</div>
        </div>
      `;
      });
    }
  };

  this.render();
}
