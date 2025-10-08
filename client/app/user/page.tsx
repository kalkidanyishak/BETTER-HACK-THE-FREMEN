'use client';

import { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client'; // Adjust path
import {
  MoreHorizontal,
  PlusCircle,
  ShieldCheck,
  Check,
  ChevronsUpDown,
  X,
  UserX,
  Trash2,
  Edit,
  UserPlus,
  Ban,
} from 'lucide-react';
import { Toaster, toast } from 'sonner';

// Import shadcn/ui components
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button'; // Assuming buttonVariants is exported
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils'; // Make sure you have this utility from shadcn

// --- TYPE DEFINITIONS ---
interface User {
  id: string;
  name: string;
  email: string;
  role: string | null;
  banned: boolean;
}

interface Role {
  id: RoleId;
  label: string;
  permissions: Permissions;
}

interface Permissions {
  [resource: string]: string[];
}

const INITIAL_ROLES = [
  { id: 'user' as const, label: 'User', permissions: { project: ['read'], user: [] } },
  { id: 'admin' as const, label: 'Admin', permissions: { project: ['create', 'read', 'update', 'delete'], user: ['create', 'list', 'set-role', 'ban', 'delete'] } },
  { id: 'editor' as const, label: 'Editor', permissions: { project: ['create', 'read', 'update'], user: [] } },
  { id: 'viewer' as const, label: 'Viewer', permissions: { project: ['read'], user: [] } },
] as const;

type RoleId = string

const COMMON_RESOURCES = ['project', 'user'] as const;
type Resource = typeof COMMON_RESOURCES[number];
const COMMON_ACTIONS = ['create', 'read', 'update', 'delete'] as const;
type Action = typeof COMMON_ACTIONS[number];

// --- HELPER FUNCTIONS ---
const parseRoles = (roleString: string | null | undefined, roles: Role[]): RoleId[] =>
  (roleString || '').split(',').map(r => r.trim() as RoleId).filter(r => roles.some(ar => ar.id === r));
const formatRoles = (roles: RoleId[]): string => roles.join(',');

// --- MAIN COMPONENT ---
export default function UserManagementPage() {
  // State management
  const [roles, setRoles] = useState<Role[]>(INITIAL_ROLES);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openPermissionsDialog, setOpenPermissionsDialog] = useState(false);
  const [openCreateRoleDialog, setOpenCreateRoleDialog] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [editRoles, setEditRoles] = useState<RoleId[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', roles: [] as RoleId[] });
  const [newRoleForm, setNewRoleForm] = useState({ id: '', label: '', permissions: {} as Permissions });
  
  // --- DATA FETCHING ---
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await authClient.admin.listUsers({
        query: { limit: 50, sortBy: 'name', sortDirection: 'asc' },
      });
      if (error) throw new Error(error.message);
      setUsers(data?.users || []);
    } catch (err: any) {
      toast.error('Failed to fetch users', { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Reset new role form when opening dialog
  const handleOpenCreateRoleDialog = () => {
    setNewRoleForm({ id: '', label: '', permissions: {} });
    setOpenCreateRoleDialog(true);
  };

  // --- API HANDLERS ---
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const promise = authClient.admin.createUser({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      role: formatRoles(formData.roles),
    });
    
    toast.promise(promise, {
      loading: 'Creating user...',
      success: (res) => {
        if (res.error) throw new Error(res.error.message);
        setOpenCreateDialog(false);
        setFormData({ name: '', email: '', password: '', roles: [] });
        fetchUsers();
        return 'User created successfully!';
      },
      error: (err) => `Failed to create user: ${err.message}`,
    });
  };

  const handleUpdateRoles = async (userId: string, newRoles: RoleId[]) => {
    const promise = authClient.admin.setRole({ userId, role: formatRoles(newRoles) });

    toast.promise(promise, {
      loading: 'Updating roles...',
      success: (res) => {
        if (res.error) throw new Error(res.error.message);
        setUserToEdit(null);
        setEditRoles([]);
        fetchUsers();
        return 'Roles updated successfully!';
      },
      error: (err) => `Failed to update roles: ${err.message}`,
    });
  };

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleForm.id || !newRoleForm.label) {
      toast.error('Role ID and Label are required');
      return;
    }
    if (roles.some(r => r.id === newRoleForm.id)) {
      toast.error('Role ID already exists');
      return;
    }
    const newRole: Role = {
      id: newRoleForm.id as RoleId,
      label: newRoleForm.label,
      permissions: newRoleForm.permissions,
    };
    setRoles([...roles, newRole]);
    setOpenCreateRoleDialog(false);
    toast.success('Custom role created successfully!');
  };

  const handleDeleteUser = async (userId: string) => {
    const promise = authClient.admin.removeUser({ userId });

    toast.promise(promise, {
      loading: 'Deleting user...',
      success: (res) => {
        if (res.error) throw new Error(res.error.message);
        setUserToDelete(null);
        fetchUsers();
        return 'User deleted successfully!';
      },
      error: (err) => `Failed to delete user: ${err.message}`,
    });
  };

  const handleBanUser = async (user: User) => {
    const action = user.banned ? 'unbanUser' : 'banUser';
    const params = user.banned ? { userId: user.id } : { userId: user.id, banReason: 'Admin action' };
    // @ts-ignore - Dynamically calling method
    const promise = authClient.admin[action](params);

    toast.promise(promise, {
      loading: user.banned ? 'Unbanning user...' : 'Banning user...',
      success: (res) => {
        if (res.error) throw new Error(res.error.message);
        fetchUsers();
        return `User ${user.banned ? 'unbanned' : 'banned'} successfully!`;
      },
      error: (err) => `Failed to update ban status: ${err.message}`,
    });
  };

  const RoleMultiSelect = ({ selected, setSelected }: { selected: RoleId[]; setSelected: (roles: RoleId[]) => void;}) => {
    const [open, setOpen] = useState(false);

    const toggleRole = (roleId: RoleId) => {
      setSelected(
        selected.includes(roleId)
          ? selected.filter((r) => r !== roleId)
          : [...selected, roleId]
      );
    };

    return (
      <>
        <div className="flex flex-wrap gap-1 mb-2">
          {selected.map((roleId) => {
            const role = roles.find(r => r.id === roleId);
            return (
              <Badge variant="secondary" key={roleId}>
                {role?.label || roleId}
                <button 
                  type="button"
                  onClick={() => toggleRole(roleId)} 
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between"
            >
              {selected.length > 0 ? `${selected.length} role(s) selected` : "Select roles..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search roles..." />
              <CommandList>
                <CommandEmpty>No roles found.</CommandEmpty>
                <CommandGroup>
                  {roles.map((role) => (
                    <CommandItem
                      key={role.id}
                      value={role.id}
                      onSelect={() => {
                        toggleRole(role.id);
                        setOpen(true); // Keep popover open on select for multi
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selected.includes(role.id) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {role.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </>
    );
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="container mx-auto p-4 md:p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>User Management</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setOpenPermissionsDialog(true)}>
                <ShieldCheck className="mr-2 h-4 w-4" />
                Role Permissions
              </Button>
              <Button onClick={() => setOpenCreateDialog(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create User
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-6 w-48" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                      <TableCell className="text-center"><Skeleton className="h-6 w-16 mx-auto" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : users.length > 0 ? (
                  users.map((user) => {
                    const userRoles = parseRoles(user.role, roles);
                    return (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {userRoles.length > 0 ? userRoles.map(roleId => {
                              const role = roles.find(r => r.id === roleId);
                              return <Badge key={roleId} variant="secondary">{role?.label || roleId}</Badge>;
                            }) : <span className="text-sm text-muted-foreground">No roles</span>}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {user.banned ? (
                            <Badge variant="destructive">Banned</Badge>
                          ) : (
                            <Badge variant="outline">Active</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => {
                                setUserToEdit(user);
                                setEditRoles(parseRoles(user.role, roles));
                              }}>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit Roles</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleBanUser(user)}>
                                {user.banned ? <UserPlus className="mr-2 h-4 w-4" /> : <Ban className="mr-2 h-4 w-4" />}
                                <span>{user.banned ? 'Unban' : 'Ban'} User</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600" onClick={() => setUserToDelete(user)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete User</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Create User Dialog */}
      <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new user to the system.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateUser}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">Password</Label>
                <Input id="password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Roles</Label>
                <div className="col-span-3">
                  <RoleMultiSelect 
                    selected={formData.roles}
                    setSelected={(roles) => setFormData({ ...formData, roles })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
              <Button type="submit">Create User</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Roles Dialog */}
      <Dialog open={!!userToEdit} onOpenChange={(open) => {
        if (!open) {
          setUserToEdit(null);
          setEditRoles([]);
        }
      }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Roles for {userToEdit?.name}</DialogTitle>
            <DialogDescription>Select the roles for this user.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <RoleMultiSelect 
              selected={editRoles}
              setSelected={setEditRoles}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setUserToEdit(null);
              setEditRoles([]);
            }}>Cancel</Button>
            <Button onClick={() => userToEdit && handleUpdateRoles(userToEdit.id, editRoles)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!userToDelete} onOpenChange={(open) => !open && setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user <span className="font-semibold">{userToDelete?.name}</span> and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={buttonVariants({ variant: 'destructive' })}
              onClick={() => userToDelete && handleDeleteUser(userToDelete.id)}
            >
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Permissions Viewer Dialog */}
      <Dialog open={openPermissionsDialog} onOpenChange={setOpenPermissionsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Role Permissions</DialogTitle>
            <DialogDescription>
              These are defined in your code. To add or manage permissions, update your access control setup.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mb-4">
            <Button type="button" variant="outline" onClick={handleOpenCreateRoleDialog}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Custom Role
            </Button>
          </div>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto p-1">
            {roles.map(role => (
              <Card key={role.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{role.label} <Badge variant="outline" className="ml-2">{role.id}</Badge></CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(role.permissions).map(([resource, actions]) => (
                      <div key={resource} className="flex items-start">
                        <strong className="capitalize w-24 flex-shrink-0">{resource}:</strong>
                        <div className="flex flex-wrap gap-2">
                          {(actions as string[]).length > 0 ? (
                            (actions as string[]).map(action => <Badge key={action} variant="secondary">{action}</Badge>)
                          ) : <span className="text-sm text-muted-foreground">No permissions</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setOpenPermissionsDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Custom Role Dialog */}
      <Dialog open={openCreateRoleDialog} onOpenChange={setOpenCreateRoleDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Custom Role</DialogTitle>
            <DialogDescription>Define a new role with custom permissions for common resources.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateRole}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="roleId" className="text-right">Role ID</Label>
                <Input 
                  id="roleId" 
                  value={newRoleForm.id} 
                  onChange={(e) => setNewRoleForm({ ...newRoleForm, id: e.target.value })} 
                  className="col-span-3" 
                  required 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="roleLabel" className="text-right">Label</Label>
                <Input 
                  id="roleLabel" 
                  value={newRoleForm.label} 
                  onChange={(e) => setNewRoleForm({ ...newRoleForm, label: e.target.value })} 
                  className="col-span-3" 
                  required 
                />
              </div>
              {COMMON_RESOURCES.map(resource => (
                <div key={resource} className="space-y-2">
                  <Label className="font-medium">{resource.charAt(0).toUpperCase() + resource.slice(1)} Permissions</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {COMMON_ACTIONS.map(action => (
                      <div key={action} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${resource}-${action}`}
                          checked={(newRoleForm.permissions[resource] || []).includes(action)}
                          onCheckedChange={(checked) => {
                            const currentActions = newRoleForm.permissions[resource] || [];
                            const updatedActions = checked 
                              ? [...currentActions, action] 
                              : currentActions.filter(a => a !== action);
                            setNewRoleForm({
                              ...newRoleForm,
                              permissions: {
                                ...newRoleForm.permissions,
                                [resource]: updatedActions,
                              },
                            });
                          }}
                        />
                        <Label htmlFor={`${resource}-${action}`} className="text-sm capitalize">
                          {action}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                setOpenCreateRoleDialog(false);
                setNewRoleForm({ id: '', label: '', permissions: {} });
              }}>Cancel</Button>
              <Button type="submit">Create Role</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
