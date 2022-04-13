import SearchInput from "./components/SearchInput.js";
import SearchResult from "./components/SearchResult.js";
import ImageInfo from "./components/ImageInfo.js";

import { request } from "./api/api.js";

export default function App($app) {
  this.state = {
    visible: false,
    image: null,
    data: [],
  };

  const searchInput = new SearchInput({
    $app,
    onSearch: async (keyword) => {
      const searchData = await request("search", keyword);
      this.setState({
        ...this.state,
        data: searchData,
      });
    },
  });

  const searchResult = new SearchResult({
    $target,
    initialData: this.state.data,
    onClick: (image) => {
      this.setState({
        visible: true,
        image,
      });
    },
  });

  const imageInfo = new ImageInfo({
    $target,
    initialData: {
      visible: false,
      image: null,
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    searchResult.setState();
    imageInfo.setState();
  };
}
