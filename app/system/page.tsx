// show the result of system search

import React from "react";
import { getSystemInfo } from "@/lib/actions/getSystemInfo";
import { Lang } from "@/lib/types/types";
import SystemResult from "@/components/systemResult/SystemResult";

const SystemResultPage = async ({
  searchParams,
}: {
  searchParams: { id: string; lang: Lang | undefined };
}) => {
  // search for the info of the system
  const { id, lang } = await searchParams;
  if (!id || !lang) return <div>No system found</div>;

  const data = await getSystemInfo(id, lang);

  return (
    <div>
      <SystemResult data={data} />
    </div>
  );
};

export default SystemResultPage;

/* Example output:
* {
  systemId: 30000142,
  systemName: 'Jita',
  securityStatus: 0.945913,
  planets: [
    { planetId: 40009077, planetType: [Object], materials: [Array] },
    { planetId: 40009078, planetType: [Object], materials: [Array] },
    { planetId: 40009080, planetType: [Object], materials: [Array] },
    { planetId: 40009082, planetType: [Object], materials: [Array] },
    { planetId: 40009098, planetType: [Object], materials: [Array] },
    { planetId: 40009116, planetType: [Object], materials: [Array] },
    { planetId: 40009119, planetType: [Object], materials: [Array] },
    { planetId: 40009123, planetType: [Object], materials: [Array] }
  ]
}
*  */
