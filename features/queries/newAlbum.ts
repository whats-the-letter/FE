import { NewAlbumFormValues } from "./../hooks/useNewAlbumForm";
import { UseMutationOptions } from "@tanstack/react-query";

export const submitNewAlbumMutation = (
  option: UseMutationOptions<null, Error, NewAlbumFormValues>
): UseMutationOptions<null, Error, NewAlbumFormValues> => ({
    mutationKey: [ 'submit'],
    ...option,
});
