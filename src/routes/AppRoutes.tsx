import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';
// layouts
const MainLayout = lazy(() => import('@layouts/MainLayout/MainLayout'));
const AdminLayout = lazy(() => import('@layouts/AdminLayout/AdminLayout'));
const ProfileLayout = lazy(
  () => import('@layouts/ProfileLayout/ProfileLayout')
);
//pages
const Home = lazy(() => import('@pages/Home/Home'));
const Products = lazy(() => import('@pages/ProductsPage/ProductsPage'));
const ProductPage = lazy(() => import('@pages/ProductsPage/ProductPage'));
const CategoriesPage = lazy(
  () => import('@pages/CategoriesPage/CategoriesPage')
);
const BrandsPage = lazy(() => import('@pages/BrandPage/BrandPage'));
const AboutUs = lazy(() => import('@pages/AboutUs/AboutUs'));
const Login = lazy(() => import('@pages/Login/Login'));
const Profile = lazy(() => import('@pages/ProfilePage/ProfilePage'));
const Register = lazy(() => import('@pages/Register/Register'));
const Cart = lazy(() => import('@pages/CartPage/CartPage'));
const Wishlist = lazy(() => import('@pages/WishlistPage/WishlistPage'));
const AddressPage = lazy(() => import('@pages/AddressPage/AddressPage'));
const ForgotPasswordPage = lazy(
  () => import('@pages/ForgotPasswordPage/ForgotPasswordPage')
);
const VerifyCodePage = lazy(
  () => import('@pages/VerifyCodePage/VerifyCodePage')
);
const ResetPasswordPage = lazy(
  () => import('@pages/ResetPasswordPage/ResetPasswordPage')
);
//admin pages
const AllOrdersPage = lazy(
  () => import('@pages/Admin/AllOrdersPage/AllOrdersPage')
);
const AllProductsPage = lazy(
  () => import('@pages/Admin/AllProductsPage/AllProductsPage')
);
const AllBrandsPage = lazy(
  () => import('@pages/Admin/AllBrandsPage/AllBrandsPage')
);
const AllCategoriesPage = lazy(
  () => import('@pages/Admin/AllCategoriesPage/AllCategoriesPage')
);
const AllSubCategoriesPage = lazy(
  () => import('@pages/Admin/AllSubCategoriesPage/AllSubCategoriesPage')
);
const AllCouponsPage = lazy(
  () => import('@pages/Admin/AllCouponsPage/AllCouponsPage')
);

import Error from '@pages/Error/Error';
// component
import MySuspense from '@components/feedback/MySuspense/MySuspense';
import MainSuspense from '@components/feedback/MainSuspense/MainSuspense';
import {
  ProtectedRoutes,
  ProtectedAdminRoutes,
} from '@components/Auth/ProtectedRoutes';
import Order from '@pages/Order/Order';

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainSuspense>
        <MainLayout />
      </MainSuspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <MySuspense>
            <Home />
          </MySuspense>
        ),
      },
      {
        path: '/wishlist',
        element: (
          <MySuspense>
            <Wishlist />
          </MySuspense>
        ),
      },
      {
        path: '/cart',
        element: (
          <MySuspense>
            <Cart />
          </MySuspense>
        ),
      },
      {
        path: 'categories/products/:prefix',

        element: (
          <MySuspense>
            <Products />
          </MySuspense>
        ),
      },
      {
        path: 'products',
        element: (
          <MySuspense>
            <Products />
          </MySuspense>
        ),
      },
      {
        path: 'categories',
        element: (
          <MySuspense>
            <CategoriesPage />
          </MySuspense>
        ),
      },
      {
        path: 'brands',
        element: (
          <MySuspense>
            <BrandsPage />
          </MySuspense>
        ),
      },
      {
        path: '/product/:id',
        element: (
          <MySuspense>
            <ProductPage />
          </MySuspense>
        ),
      },
      {
        path: 'about-us',
        element: (
          <ProtectedRoutes>
            <MySuspense>
              <AboutUs />
            </MySuspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'auth',
        children: [
          {
            path: 'login',
            element: (
              <MySuspense>
                <Login />
              </MySuspense>
            ),
          },
          {
            path: 'register',
            element: (
              <MySuspense>
                <Register />
              </MySuspense>
            ),
          },
          {
            path: 'forgot-password',
            element: (
              <MySuspense>
                <ForgotPasswordPage />
              </MySuspense>
            ),
          },
          {
            path: 'verify-password',
            element: (
              <MySuspense>
                <VerifyCodePage />
              </MySuspense>
            ),
          },
          {
            path: 'reset-password',
            element: (
              <MySuspense>
                <ResetPasswordPage />
              </MySuspense>
            ),
          },
        ],
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoutes>
            <MySuspense>
              <ProfileLayout />
            </MySuspense>
          </ProtectedRoutes>
        ),
        children: [
          { index: true, element: <Profile /> },
          {
            path: 'orders',
            element: (
              <MySuspense>
                <Order />
              </MySuspense>
            ),
          },

          {
            path: 'address',
            element: (
              <MySuspense>
                <AddressPage />
              </MySuspense>
            ),
          },
        ],
      },
      {
        path: 'admin',
        element: (
          <ProtectedAdminRoutes>
            <MySuspense>
              <AdminLayout />
            </MySuspense>
          </ProtectedAdminRoutes>
        ),
        children: [
          {
            index: true,
            element: (
              <MySuspense>
                <AllOrdersPage />
              </MySuspense>
            ),
          },
          {
            path: 'all-products',
            element: (
              <MySuspense>
                <AllProductsPage />
              </MySuspense>
            ),
          },
          {
            path: 'all-categories',
            element: (
              <MySuspense>
                <AllCategoriesPage />
              </MySuspense>
            ),
          },
          {
            path: 'all-brands',
            element: (
              <MySuspense>
                <AllBrandsPage />
              </MySuspense>
            ),
          },
          {
            path: 'all-subCategories',
            element: (
              <MySuspense>
                <AllSubCategoriesPage />
              </MySuspense>
            ),
          },
          {
            path: 'all-coupons',
            element: (
              <MySuspense>
                <AllCouponsPage />
              </MySuspense>
            ),
          },
        ],
      },
    ],
  },
]);
const AppRoutes = () => {
  return <RouterProvider router={routes}></RouterProvider>;
};

export default AppRoutes;
