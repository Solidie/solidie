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
      muiTopToolbarProps={{ className: "!bg-lightest-version" }}
      muiBottomToolbarProps={{ className: "!bg-lightest-version" }}
      muiTableBodyCellProps={{ className: "!text-tertiary !bg-lightest-version " }}
      muiTableHeadCellProps={{ className: "!text-tertiary !bg-lightest-version font-black " }}
      muiTablePaperProps={{ className: " !shadow-none !rounded-2xl !bg-lightest-version overflow-hidden px-6 pt-4" }}
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