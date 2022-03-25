import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";
import ImageView from "./components/ImageView.js";
import Loading from "./components/Loading.js";

import { request } from "./api/api.js";

const cache = {};

export default function App($app) {
  this.state = {
    isRoot: false,
    isLoading: false,
    depth: [],
    nodes: [],
  };

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: this.state.depth,
    onClick: async (index) => {
      if (index === null) {
        //초기 설정된 root 노드 데이터 활용
        this.setState({
          ...this.state,
          isRoot: true,
          depth: [],
          nodes: cache.root,
        });
        return;
      }
      if (index === this.state.depth.length - 1) {
        return;
      }
      const indexState = { ...this.state };
      const indexDepth = indexState.depth.slice(0, index + 1);
      const indexNodeId = indexState.depth[index].id;

      //무조건 방문했으므로 cache 데이터 활용
      this.setState({
        ...indexState,
        depth: indexDepth,
        nodes: cache[indexNodeId],
      });
    },
  });
  const nodes = new Nodes({
    $app,
    initialState: [],
    onClick: async (node) => {
      console.log(node);
      try {
        if (node.type === "DIRECTORY") {
          //다음 디렉토리를 방문했는지 판별
          if (cache[node.id]) {
            //방문한 경우 cache 데이터 활용
            this.setState({
              ...this.state,
              isRoot: false,
              depth: [...this.state.depth, node],
              nodes: cache[node.id],
            });
          } else {
            //방문하지 않는경우 요청
            const nextNodes = await request(node.id);
            this.setState({
              ...this.state,
              isRoot: false,
              depth: [...this.state.depth, node],
              nodes: nextNodes,
            });
          }
        } else if (node.type === "FILE") {
          this.setState({
            ...this.state,
            imageFilePath: node.filePath,
          });
        }
      } catch (e) {
        throw new Error(e.message);
      }
    },
    onBackClick: async () => {
      const nextState = { ...this.state };
      nextState.depth.pop();
      const prevNodeId =
        nextState.depth.length === 0
          ? null
          : nextState.depth[nextState.depth.length - 1].id;
      if (prevNodeId === null) {
        this.setState({
          ...this.state,
          isRoot: true,
          //초기 설정된 root 노드 데이터 활용
          nodes: cache.root,
        });
      } else {
        this.setState({
          ...this.state,
          //이전 노드를 무조건 방문 했으므로 활용
          nodes: cache[prevNodeId],
        });
      }
    },
  });
  const imageview = new ImageView({
    $app,
    initialState: this.state.imageFilePath,
    onClick: () => {
      this.setState({
        ...this.state,
        imageFilePath: null,
      });
    },
  });
  const loading = new Loading({
    $app,
    initialState: this.isLoading,
  });

  this.setState = (nextState) => {
    this.state = nextState;
    breadcrumb.setState(this.state.depth);
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
    imageview.setState(this.state.imageFilePath);
    loading.setState(this.state.isLoading);
  };

  const init = async () => {
    const rootNodes = await request();
    this.setState({
      ...this.state,
      isRoot: true,
      nodes: rootNodes,
    });
    //root 노드 데이터 저장
    cache.root = rootNodes;
  };
  init();
}
