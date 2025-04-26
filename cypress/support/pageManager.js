import { homePage } from "../pages/homePage";
import { createAccountPage } from "../pages/createAccountPage";
import { myAccountPage } from "../pages/myAccountPage";
import { loginPage } from "../pages/loginPage";
import { productsPage } from "../pages/productsPage";
import { shippingDetailsPages } from "../pages/shippingDetailsPages";
import { myOrdersPage } from "../pages/myOrdersPage";
import { myWishListPage } from "../pages/myWishListPage";

export class pageManager {
  getHomePage() {
    return new homePage();
  }

  getCreateAccountPage() {
    return new createAccountPage();
  }

  getMyAccountPage() {
    return new myAccountPage();
  }

  getLoginPage() {
    return new loginPage();
  }

  getProductsPage() {
    return new productsPage();
  }

  getShippingDetailsPages() {
    return new shippingDetailsPages();
  }

  getMyOrdersPage() {
    return new myOrdersPage();
  }

  getMyWishListPage() {
    return new myWishListPage();
  }
}
