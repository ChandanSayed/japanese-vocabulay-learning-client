import { GET, PUT } from "@/utils/use-api";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function ManageUsers() {
  const userDetails = useSelector(state => state.userData.value);
  const [users, setUsers] = useState([]);

  async function handleUserRole(id, role) {
    const res = await PUT(`/auth/update-user?id=${id}`, { userType: role });
    if (res.data.message) {
      Swal.fire({
        title: "Good job!",
        text: "User Role Updated!",
        icon: "success",
      });
      getAllUsers();
    } else {
      Swal.fire({
        title: "Sorry!",
        text: "Something went wrong!",
        icon: "error",
      });
    }
  }

  async function getAllUsers() {
    const res = await GET("/auth/all-users");
    setUsers(res.data);
  }
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <Table>
        <TableCaption>A list of registered users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="w-44 text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">
                <img src={user.image} alt={user.name} className="size-20 rounded-full" />
              </TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.userType}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.email !== userDetails.email && (
                  <div className="inline-flex gap-2">
                    {user.userType === "user" ? (
                      <Button onClick={() => handleUserRole(user._id, "admin")}>
                        Promote to Admin
                      </Button>
                    ) : (
                      <Button onClick={() => handleUserRole(user._id, "user")}>
                        Demote to User
                      </Button>
                    )}
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
