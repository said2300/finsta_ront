import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import Simple from "./NavbarTest";
import Router from "next/router";
import NProgress from "nprogress";
import Head from "next/head";
Router.onRouteChangeStart = (url) => {
  console.log(url);
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

export const Layout = ({ children }) => (
  <>
    <Head>
      <title>AtypikHouse</title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
      ></link>
    </Head>
    <Simple />

    <div>{children}</div>
    <Footer />
  </>
);
