import { handleBien } from "@services/properties";
import { useMutation, useQueryClient } from "react-query";

export default function useValidBien(options = {}) {
  const queryClient = useQueryClient();
  return useMutation(({ id, status }) => handleBien(id, status), {
    ...options,
    onSettled: () => queryClient.invalidateQueries("mesBiens"),
  });
}
