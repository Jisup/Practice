import Breadcrumb from './components/Breadcrumb.js';
import Nodes from './components/Nodes.js';
import ImageView from './components/ImageView.js';
import Loading from './components/Loading.js';

export default function App($app) {
  this.state = {
    depth: [],
    node: [],
  };

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: this.state.depth,
  });
  const nodes = new Nodes({
    $app,
    initialState: this.state.node,
  });
  const imageview = new ImageView({});
  const loading = new Loading({});

  this.setState = () => {
    breadcrumb(this.state.depth);
    nodes(this.state.node);
    imageview();
    loading();
  };

  const init = () => {};
  init();
}
