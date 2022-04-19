import SearchInput from "./components/SearchInput.js";
import SearchError from "./components/SearchError.js";
import SearchKeyword from "./components/SearchKeyword.js";
import SearchResult from "./components/SearchResult.js";
import ImageInfo from "./components/ImageInfo.js";
import Loading from "./components/Loading.js";

import { request } from "./api/api.js";
import { getLocalStorage, setLocalStorage } from "./lib/LocalStorage.js";

export default function App($app) {
  this.state = {
    visible: false,
    loading: false,
    error: false,
    image: null,
    data: [],
    keyword: [],
  };

  const searchInput = new SearchInput({
    $app,
    onSearch: async (keyword) => {
      const searchData = await request("search", keyword);

      if (!searchData.data || !searchData.data.length) {
        this.setState({
          ...this.state,
          loading: false,
          data: [],
          error: true,
        });
        return;
      }

      setLocalStorage(searchData);

      var nextKeyword = [keyword, ...this.state.keyword];

      if (nextKeyword.length > 5) {
        nextKeyword = nextKeyword.slice(0, 5);
      }

      this.setState({
        ...this.state,
        data: searchData.data,
        keyword: nextKeyword,
        loading: false,
        error: false,
      });
    },
    onClick: async () => {
      const randomData = await request("random");

      setLocalStorage(randomData);

      this.setState({
        ...this.state,
        data: randomData.data,
      });
    },
  });

  const searchError = new SearchError({
    $app,
    initialState: this.state.error,
  });

  const searchKeyword = new SearchKeyword({
    $app,
    initalState: this.state.keyword,
    onClick: async (keyword) => {
      const keywordData = await request("search", keyword);

      setLocalStorage(keywordData);

      const nextKeyword = [
        keyword,
        ...this.state.keyword.filter((word) => word != keyword),
      ];

      this.setState({
        ...this.state,
        data: keywordData.data,
        keyword: nextKeyword,
        loading: false,
      });
    },
  });

  const searchResult = new SearchResult({
    $app,
    initialData: [],
    onClick: (image) => {
      this.setState({
        visible: true,
        image,
      });
    },
  });

  const imageInfo = new ImageInfo({
    $app,
    initialData: {
      visible: false,
      image: null,
    },
  });

  const loading = new Loading({
    $app,
    initialState: this.state.loading,
  });

  this.setState = (nextState) => {
    this.state = nextState;
    searchError.setState(this.state.error);
    searchResult.setState();
    imageInfo.setState();
    loading.setState(this.state.loading);
  };

  const init = () => {
    const storage = getLocalStorage();

    if (!storage || !storage.data || !storage.data.length) {
      return;
    }

    this.setState({
      ...this.state,
      data: storage.data,
    });
  };
  init();
}
