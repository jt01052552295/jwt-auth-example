import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Nav from "../components/Nav";
import Form from "../components/Form";

import { userService } from "../services";

import { useRecoilValue } from "recoil";
// import { lengthState, userJwtState } from "../selectors/name";

export default function Home() {
  const router = useRouter();
  const [users, setUsers] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // run auth check on initial load
    authCheck(router.asPath);

    // set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);
    // run auth check on route change
    router.events.on("routeChangeComplete", authCheck);

    userService.getAll().then((x) => setUsers(x));

    if (userService.userValue) {
      console.log("userService.userValue", userService.userValue);
      // const user = users.find((u) => u.id === userService.userValue.id);
      // console.log(user);
    }

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ["/login"];
    const path = url.split("?")[0];
    if (!userService.userValue && !publicPaths.includes(path)) {
      setAuthorized(false);
      // router.push({
      //     pathname: '/login',
      //     query: { returnUrl: router.asPath }
      // });
    } else {
      setAuthorized(true);
    }
  }

  return (
    <div>
      <Head>
        <title>JWT Authentication Example</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="app-container bg-light">
        <Nav auth={authorized} />
        <div className="container pt-4 pb-4">
          {!authorized && <Form />}
          {authorized && users && (
            <ul>
              {users.map((user) => {
                if (user.id === userService.userValue.id) {
                  return (
                    <li key={user.id}>
                      {user.firstName} {user.lastName}
                    </li>
                  );
                }
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  return {
    props: {
      token: req.cookies.OursiteJWT ?? "",
    },
  };
};
