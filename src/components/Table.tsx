/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ClockLoader } from 'react-spinners';
import { httpClient } from '@/app/services/httpClient';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ITableApp {
  dataTable: Array<Record<string, any>>;
  headersTable: Array<Record<string, any>>;
  actions: Array<{
    icon: React.ReactNode;
    onAction: (obj: Record<string, any>) => void;
  }>;
  loading: boolean;
  lastPage: number;
  paginationURL: string;
}

export default function TableApp({
  dataTable,
  lastPage,
  paginationURL,
  loading,
  actions,
  headersTable,
}: ITableApp) {
  const [getNewPageLoading, setGetNewPageLoading] = useState(false);
  const [currentPage, setCurentPage] = useState(1);
  const [dataTablePagination, setDatasTablePagination] = useState<
    Array<Record<string, any>>
  >([]);

  const columnHelper = createColumnHelper<Record<string, any>>();

  const columns = headersTable.map(head => {
    if (head.key === 'actions') {
      return columnHelper.accessor(head.key, {
        cell: info => (
          <div className="flex items-center justify-center">
            {actions.map((action, index) => (
              <div
                key={index}
                onClick={() => action.onAction(info.row.original)}
              >
                {action.icon}
              </div>
            ))}
          </div>
        ),
        header: head.label,
      });
    } else {
      return columnHelper.accessor(head.key, {
        cell: info => (
          <div className={head.className}>
            <span>{info.getValue()}</span>
          </div>
        ),
        header: head.label,
      });
    }
  });

  const table = useReactTable({
    data: dataTablePagination,
    columns,
    manualPagination: true,
    pageCount: 1,
    state: {
      pagination: {
        pageIndex: currentPage,
        pageSize: 15,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  async function handlePageChange(page: number) {
    setGetNewPageLoading(true);

    try {
      const { data } = await httpClient.get(`${paginationURL}=${page}`);

      setCurentPage(page);

      setDatasTablePagination(data.data);
    } catch {
      toast.error('Ops! Algo deu errado ao buscar novos dados.');
    } finally {
      setGetNewPageLoading(false);
    }
  }

  useEffect(() => {
    setDatasTablePagination(dataTable);
  }, [dataTable]);

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead
                  key={header.id}
                  className={cn(
                    'px-5 py-2 capitalize',
                    header.id === 'actions' && 'text-center',
                  )}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        {!loading && !getNewPageLoading && (
          <>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          'px-5 py-2',
                          cell.column.id === 'actions' && 'text-center',
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <tr className="">
                  <td></td>
                </tr>
              )}
            </TableBody>
          </>
        )}
      </Table>

      {!table.getRowModel().rows.length ? (
        <div className="text-gray-600 dark:text-white w-full flex items-center justify-center py-4">
          Sem dados!
        </div>
      ) : (
        ''
      )}

      {(loading || getNewPageLoading) && (
        <div className="w-full flex items-center justify-center mt-4 py-4">
          <ClockLoader color="#898989" size={30} />
        </div>
      )}

      {!loading && (
        <div className="flex w-full items-center justify-center mt-4 mb-2">
          <div className="flex items-center mb-4">
            <button
              onClick={async () => {
                await handlePageChange(currentPage - 1);
              }}
              disabled={currentPage === 1}
              className="text-sm flex items-center justify-center p-1 px-2 disabled:opacity-30 hover:bg-zinc-100 dark:hover:bg-opacity-90 dark:hover:bg-zinc-700 transition-all rounded-md"
            >
              <ChevronLeft size={17} /> Anterior
            </button>

            <span className="px-4 text-xs text-black dark:text-white">
              {currentPage} de {lastPage}
            </span>

            <button
              onClick={async () => {
                await handlePageChange(currentPage + 1);
              }}
              disabled={currentPage === lastPage}
              className="text-sm flex items-center justify-center p-1 px-2 disabled:opacity-30 hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:hover:bg-opacity-90 transition-all rounded-md"
            >
              Próximo
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
