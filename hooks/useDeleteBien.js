import { deletePropertiesId } from "@services/properties";
import { useMutation, useQueryClient } from "react-query";

export default function useDeleteBien({ options = {} }) {
  const queryClient = useQueryClient();
  return useMutation(({ id }) => deletePropertiesId(id), {
    ...options,
    onSettled: () => {
      console.log("ok");
      queryClient.invalidateQueries("mesBiens");
    },
  });
}
