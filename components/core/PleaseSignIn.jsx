import useAuth from "@auth/context";
import { Layout } from "@components/core/Layout";
import { Box, Text } from "@chakra-ui/react";
import FlecheRetour from "../ui/ArrowBack";

export default function PleaseSignIn({
  children,
  permissions = ["USER"],
  //   empty,
}) {
  //   const { data, loading } = useQuery(CURRENT_USER_QUERY);
  const { isAuthenticated, user, loading } = useAuth();

  //   if (data && !data.me && empty) return null;

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) {
    return (
      <Layout>
        <p>Please, sign in before continuing.</p>
      </Layout>
    );
  }

  function hasPermission(user, permissionsNeeded) {
    const matchedPermissions = [];
    permissionsNeeded.forEach((element) => {
      if (element === user.roles) {
        matchedPermissions.push(element);
      }
    });
    // if page is for user return the children
    if (permissionsNeeded.includes("USER")) return false;
    // if page is for ADMIN or ROOT return the children
    if (matchedPermissions.length) return false;
    // else return the error
    return true;
  }

  //   if (hasPermission(user, permissions)) return null;

  if (hasPermission(user, permissions))
    return (
      <Layout>
        <Box
          h="69vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            alignItems="center"
            h="200px"
          >
            <Text fontSize="26px" fontWeight="bold">
              ATTENTION
            </Text>
            <Text fontSize="24px">
              Vous n'êtes pas autorisé à accéder à cette page
            </Text>
            <FlecheRetour></FlecheRetour>
          </Box>
        </Box>
      </Layout>
    );

  return children;
}
