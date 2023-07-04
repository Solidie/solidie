import React, { useMemo } from 'react';
import {DataTable} from "../../../ui/table/data-table.jsx";

export const ReleaseManagementTable = () => {
  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: 'version',
        header: 'Version',
      },
      {
        accessorKey: 'releaseData',
        header: 'Release Date',
      },
      {
        accessorKey: 'download',
        header: 'Download',
        cell: ({row}) => {
          return <a className="underline cursor-pointer">{row.getValue("download")}</a>
        }
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'stage',
        header: 'Stage',
      },
    ],
    [],
    //end
  );

  return (
    <DataTable
      data={data}
      columns={columns}
      enableToolbar={false}
    />
  );
};


export default ReleaseManagementTable

export const data = [
    {
      version: 'v2.4.0',
      releaseData: '01-20-2021, EST 02:23pm',
      download: 'Click',
      status: 'Unpublished',
      stage: 'Stable',
    },
    {
      version: 'v2.4.0',
      releaseData: '01-20-2021, EST 02:23pm',
      download: 'Click',
      status: 'Unpublished',
      stage: 'Stable',
    },
    {
      version: 'v2.4.0',
      releaseData: '01-20-2021, EST 02:23pm',
      download: 'Click',
      status: 'Published',
      stage: 'Stable',
    },
    {
      version: 'v2.4.0',
      releaseData: '01-20-2021, EST 02:23pm',
      download: 'Click',
      status: 'Unpublished',
      stage: 'Stable',
    },
    {
      version: 'v2.4.0',
      releaseData: '01-20-2021, EST 02:23pm',
      download: 'Click',
      status: 'Published',
      stage: 'Stable',
    },
  ];