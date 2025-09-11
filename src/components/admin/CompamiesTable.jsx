import { Edit2, MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const navigate = useNavigate();
  const { companies, searchCompanyByText = "" } = useSelector(
    (store) => store.company
  ); // ✅ string default

  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    if (companies.length > 0) {
      const filteredCompany = companies.filter((company) => {
        if (!searchCompanyByText) return true;
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
      setFilterCompany(filteredCompany);
    } else {
      setFilterCompany([]);
    }
  }, [companies, searchCompanyByText]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                You haven't registered any company yet.
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar
                    style={{
                      width: "50px", // circle size chhota
                      height: "50px",
                      borderRadius: "50%", // perfect circle
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <AvatarImage
                      src={company.logo || "/images/default-logo.png"}
                      alt={company.name || "Company Logo"}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover", // fill circle while maintaining aspect ratio
                      }}
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name || "Unnamed Company"}</TableCell>
                <TableCell>
                  {new Date(company.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 px-4 py-3 w-20 rounded-md cursor-pointer bg-gradient-to-r from-blue-100 to-blue-200 hover:scale-105 transition-transform"
                      >
                        < Edit2 className="w-4 h-4 text-green-600"/>
                        <span className="w-4 h-4 text-red-600"> Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
