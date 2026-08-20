import Table from "./Table";

type User = {
  id: number;
  name: string;
  email: string;
  status: string;
  activity: string;
};

const users: User[] = [
  {
    id: 1,
    name: "Ayesha Khan",
    email: "ayesha@example.com",
    status: "Active",
    activity: "Logged in",
  },
  {
    id: 2,
    name: "Sara Ahmed",
    email: "sara@example.com",
    status: "Active",
    activity: "Updated profile",
  },
  {
    id: 3,
    name: "Hina Malik",
    email: "hina@example.com",
    status: "Inactive",
    activity: "Logged out",
  },
  {
    id: 4,
    name: "Maham Ali",
    email: "maham@example.com",
    status: "Active",
    activity: "New account",
  },
  {
    id: 5,
    name: "Zara Noor",
    email: "zara@example.com",
    status: "Active",
    activity: "Changed settings",
  },
];

function UserTable() {
  const columns: {
    key: keyof User;
    label: string;
  }[] = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "activity",
      label: "Recent Activity",
    },
  ];

  return (
    <Table
      columns={columns}
      data={users}
      getRowKey={(user) => user.id}
    />
  );
}

export default UserTable;