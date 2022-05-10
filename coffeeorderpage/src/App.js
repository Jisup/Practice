import { request } from "./api/api.js";

export default function App($app) {
  this.router = (data, unused, url) => {
    history.pushState(data, unused, url);
    this.init();
  };
  this.init = async () => {
    $app.innerHTML = "";

    const routeComponent = router();

    let componentData = [];

    switch (routeComponent.path) {
      case "/web/":
        componentData = await request();
        break;
      case "/web/products":
        break;
      case "/web/cart":
        break;
    }

    new routerData.route.component({
      $app,
      initialState: productData,
      onClick: (data, unused, url) => {
        this.router(data, unused, url);
      },
    }).render();
  };
  this.init();
}
