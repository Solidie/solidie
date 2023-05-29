import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';

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
        Cell: ({cell}) => {
          return <a className="underline cursor-pointer">{cell.getValue()}</a>
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
    <MaterialReactTable
      columns={columns}
      data={data}
      state={{ density: "compact" }}
      enableTopToolbar={false}
      muiBottomToolbarProps={{ className: " [&>*:nth-child(1)>*:nth-child(2)]:!bg-lightest-version [&>*:nth-child(1)>*:nth-child(2)]:!px-2 [&>*:nth-child(1)>*:nth-child(2)]:!rounded-xl !shadow-none !bg-transparent  " }}
      muiTableProps={{ className: "py-4 !border !border-white !bg-brand-white " }}
      muiTableBodyRowProps={{ className: " group " }}
      muiTableBodyCellProps={{
        className: "!border !text-tertiary group-hover:!bg-lightest-version/60 !bg-brand-white ",
      }}
      muiTableHeadCellProps={{
        className: " !text-tertiary !bg-transparent font-black ",
      }}
      muiTablePaperProps={{
        className:
          " px-2 !shadow-none !bg-transparent overflow-hidden [&>*:nth-child(1)]:!overflow-x-auto [&>*:nth-child(1)]:!bg-transparent [&>*:nth-child(1)]:!outline-white [&>*:nth-child(1)]:!outline [&>*:nth-child(1)]:!overflow-clip [&>*:nth-child(1)]:!rounded-lg",
      }}
      enableRowNumbers
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