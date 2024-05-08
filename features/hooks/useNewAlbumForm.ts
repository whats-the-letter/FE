import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const NewAlbumSchema = z.object({
  albumBackground: z.string(),
  albumCover: z.string(),
  albumId: z.number(),
  albumPhrases: z.string(),
  fromName: z.string().min(1).max(6),
  toName: z.string().min(1).max(6),
  letter: z.string().min(1).max(300),
  musicId: z.string(),
});

export type NewAlbumFormValues = z.infer<typeof NewAlbumSchema>;

const useNewAlbumForm = () => {
  return useForm<NewAlbumFormValues>({
    defaultValues: {
      albumBackground: "",
      albumCover: "",
      albumId: 0,
      albumPhrases: "",
      fromName: "",
      toName: "",
      letter: "",
      musicId: "",
    },
    resolver: zodResolver(NewAlbumSchema),
  });
};

export default useNewAlbumForm;
