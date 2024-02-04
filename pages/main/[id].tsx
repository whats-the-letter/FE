import Loading from "@/components/units/Loading";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { useRouter } from "next/router";
export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Main Page for User {}</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>

      <div>
      </div>
    </div>
  );
}
