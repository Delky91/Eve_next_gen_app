// show the result of system search
import React from "react";
import { getSystemInfo } from "@/lib/actions/getSystemInfo";
import { Lang } from "@/lib/types/types";
import SystemResult from "@/components/systemResult/SystemResult";

const SystemResultPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: string; lang: Lang | undefined }>;
}) => {
  // search for the info of the system
  const { id, lang } = await searchParams;
  if (!id || !lang) return <div>No system found</div>;

  const data = await getSystemInfo(id, lang);

  return <SystemResult data={data} />;
};

export default SystemResultPage;
