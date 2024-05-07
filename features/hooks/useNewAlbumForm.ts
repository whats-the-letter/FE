import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const NewAlbumSchema = z.object({
  albumBackground: z.string(),
  albumCover: z.string(),
  albumId: z.number(),
  albumPhrases: z.string(),
  fromName: z.string(),
  letter: z.string(),
  musicId: z.string(),

  toName: z.string(),
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
      letter: "",
      musicId: "m",
    },
    resolver: zodResolver(NewAlbumSchema),
  });
};

export default useNewAlbumForm;
