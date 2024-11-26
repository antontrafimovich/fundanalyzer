import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default async function DataTable({ tickerId }: { tickerId: string }) {
  const response = await fetch(`http://localhost:4000/${tickerId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = (await response.json()) as Record<string, any>[];
  const columns = data.map((row) => row.year);

  const rawRows = data.reduce((acc, row) => {
    Object.keys(row).forEach((key) => {
      if (key === "year") return;

      acc[key] = acc[key] || [];
      acc[key].push(row[key]);
    });

    return acc;
  }, {} as Record<string, string[]>);

  const rows = Object.entries(rawRows).map(([key, value]) => [key, ...value]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead key="title">Title</TableHead>
          {columns.map((column) => {
            return (
              <TableHead className="w-[200px]" key={column}>
                {column}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row[0]}>
            {row.map((cell, index) => {
              return (
                <TableCell key={`${row[0]}_${index}`} className="font-medium">
                  {cell}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
