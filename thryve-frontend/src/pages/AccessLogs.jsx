import { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Pencil, Trash } from 'lucide-react';
import { toast } from 'sonner';

const AccessLogs = () => {
  const [logs, setLogs] = useState([
    { id: '1001', username: 'planTito69', dateTime: '2025/04/20 - 04:15 p.m.', activity: 'Delete a user' },
    { id: '1002', username: 'admin123', dateTime: '2025/03/30 - 04:15 p.m.', activity: 'Add a user' },
    { id: '1003', username: 'planTito69', dateTime: '2025/04/20 - 07:15 p.m.', activity: 'Login' },
    { id: '1004', username: 'admin123', dateTime: '2025/04/20 - 04:15 p.m.', activity: 'Login' },
    { id: '1005', username: 'planTito69', dateTime: '2025/04/20 - 12:15 p.m.', activity: 'Logout' },
    { id: '1006', username: 'admin123', dateTime: '2025/04/20 - 04:15 p.m.', activity: 'Login' },
    { id: '1007', username: 'planTito69', dateTime: '2024/12/29 - 11:15 p.m.', activity: 'Login' },
    { id: '1008', username: 'MasterPM88', dateTime: '2024/04/27 - 12:15 p.m.', activity: 'Upload picture' },
  ]);

  const handleDelete = (id) => {
    setLogs(logs.filter(log => log.id !== id));
    toast.success('Log entry deleted successfully');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Access Logs</h1>
      
      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">User ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Date/Time</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">{log.id}</TableCell>
                <TableCell>{log.username}</TableCell>
                <TableCell>{log.dateTime}</TableCell>
                <TableCell>{log.activity}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-1 text-gray-500 hover:text-primary">
                      <Pencil size={18} />
                    </button>
                    <button 
                      className="p-1 text-gray-500 hover:text-red-600"
                      onClick={() => handleDelete(log.id)}
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AccessLogs;