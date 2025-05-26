import { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil, Trash } from 'lucide-react';
import { toast } from 'sonner';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: '1001', role: 'Plant Owner', name: 'Dan Pol E. Dewao', username: 'planTito69' },
    { id: '1002', role: 'Plant Specialist', name: 'Carl Justine Villanueva', username: 'admin123' },
    { id: '1003', role: 'Plant Owner', name: 'Dan Pol E. Dewao', username: 'planTito69' },
    { id: '1004', role: 'IT Admin', name: 'Carl Justine Villanueva', username: 'admin123' },
  ]);

  const [newUser, setNewUser] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!newUser.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!newUser.username.trim()) newErrors.username = 'Username is required';
    if (!newUser.password) newErrors.password = 'Password is required';
    if (newUser.password !== newUser.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!newUser.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddUser = () => {
    if (!validateForm()) return;
    
    const newId = `${parseInt(users[users.length - 1].id) + 1}`;
    
    setUsers([...users, {
      id: newId,
      role: 'Plant Owner', // Default role
      name: newUser.fullName,
      username: newUser.username
    }]);
    
    // Reset form
    setNewUser({
      fullName: '',
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
    });
    
    toast.success('New admin account created successfully');
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
    toast.success('User deleted successfully');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      
      {/* User Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">User ID</TableHead>
              <TableHead>User Role</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-1 text-gray-500 hover:text-primary">
                      <Pencil size={18} />
                    </button>
                    <button 
                      className="p-1 text-gray-500 hover:text-red-600"
                      onClick={() => handleDelete(user.id)}
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
      
      {/* Create Admin Account Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Create Admin Account</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input 
              id="fullName"
              name="fullName"
              value={newUser.fullName}
              onChange={handleInputChange}
              className={errors.fullName ? "border-red-500" : ""}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password"
              name="password"
              type="password"
              value={newUser.password}
              onChange={handleInputChange}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          
          <div>
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username"
              name="username"
              value={newUser.username}
              onChange={handleInputChange}
              className={errors.username ? "border-red-500" : ""}
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>
          
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input 
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={newUser.confirmPassword}
              onChange={handleInputChange}
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
          
          <div className="md:col-span-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              name="email"
              type="email"
              value={newUser.email}
              onChange={handleInputChange}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>
        
        <div className="mt-6">
          <Button onClick={handleAddUser} className="bg-primary hover:bg-primary/90 text-white">Add</Button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;