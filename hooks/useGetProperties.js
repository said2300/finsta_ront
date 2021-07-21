import useAuth from "@context/context";
import { getProperties } from "@services/properties";
import { useQuery } from "react-query";

export default function useGetProperties({ page }) {
  const { user } = useAuth();

  const results = useQuery(["mesBiens", user?.id, page], () =>
    getProperties(page)
  );

  return { ...results, mesBiens: results?.data?.data?.["hydra:member"] ?? [] };
}
