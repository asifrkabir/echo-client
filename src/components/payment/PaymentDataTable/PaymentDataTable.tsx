"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IPayment, IPost, IUser } from "@/types";

interface IProps {
  payments: IPayment[];
}

const PaymentDataTable = ({ payments }: IProps) => {
  console.log(payments);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Post</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment._id}>
              <TableCell>{(payment.user as IUser)?.name}</TableCell>
              <TableCell>{(payment.post as IPost)?.title}</TableCell>
              <TableCell>{payment?.amount}</TableCell>
              <TableCell>{payment?.status}</TableCell>
              <TableCell>
                {new Date(payment.createdAt!).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentDataTable;
