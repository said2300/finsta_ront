import useAuth from "@context/context";
import { getPropertiesUser } from "@services/properties";
import { useQuery } from "react-query";

export default function useMesBiens() {
  const { user } = useAuth();

  const results = useQuery(["mesBiens", user?.id], () =>
    getPropertiesUser(user?.id)
  );

  return { ...results, mesBiens: results?.data?.data["hydra:member"] ?? [] };
}
