import useAuth from "@context/context";
import { getPropertiesUser, getReservationProprio } from "@services/properties";
import { useQuery } from "react-query";

export default function useMesReservations() {
  const { user } = useAuth();

  const results = useQuery(["mesReservation", user?.id], () =>
    getReservationProprio()
  );

  return {
    ...results,
    mesReservations: results?.data?.["hydra:member"] ?? [],
  };
}
