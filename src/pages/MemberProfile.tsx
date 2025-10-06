import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MemberFormDialog } from "@/components/MemberFormDialog";

export default function MemberProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [memberData, setMemberData] = useState<any>({});

  // Load member data from localStorage on component mount
  useEffect(() => {
    if (id) {
      const members = JSON.parse(localStorage.getItem('members') || '[]');
      const member = members.find((m: any) => m.id === id);
      if (member) {
        setMemberData(member);
      } else if (location.state) {
        // Fallback to location state if member not found in localStorage
        setMemberData(location.state);
      }
    } else if (location.state) {
      setMemberData(location.state);
    }
  }, [id, location.state]);

  // Function to handle edit submission
  const handleEditSubmit = (formData: any) => {
    // The form submission is handled by MemberFormDialog which updates localStorage
    // We just need to update the local state
    setMemberData(prev => ({
      ...prev,
      ...formData
    }));
    setIsEditDialogOpen(false);
  };

  const data = memberData;

  const initials = (data.firstName?.[0] || "?") + (data.lastName?.[0] || "");
  const membershipId = data.membershipId || `ID-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="space-y-4">
      <div className="text-xs text-muted-foreground">Core Management &gt; Members &gt; <span className="text-foreground">Profile Details</span></div>

      <div className="flex items-center justify-end">
        <Button variant="outline" className="mr-2">Download</Button>
        <Button className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Active</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4">
        {/* Left summary */}
        <Card className="p-4">
          <div className="flex flex-col items-center justify-center mb-4">
            <Avatar className="h-32 w-32 mb-2">
              {data.profileImage ? (
                <AvatarImage src={data.profileImage} alt={`${data.firstName} ${data.lastName}`} />
              ) : (
                <div className="h-full w-full bg-rose-100 flex items-center justify-center">
                  <span className="text-3xl font-semibold text-rose-700">{initials}</span>
                </div>
              )}
            </Avatar>
            <h2 className="text-lg font-semibold">{data.firstName} {data.lastName}</h2>
            <p className="text-sm text-muted-foreground">{data.role || 'Member'}</p>
          </div>
          <div className="space-y-3 text-sm mb-4">
            <div className="flex justify-between">
              <span>Status</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-xs">Active</span>
            </div>
            <div className="flex justify-between">
              <span>Member ID</span>
              <span className="font-medium">{membershipId}</span>
            </div>
            {data.occupation && (
              <div className="flex justify-between">
                <span>Occupation</span>
                <span className="text-muted-foreground">{data.occupation}</span>
              </div>
            )}
            {data.gender && (
              <div className="flex justify-between">
                <span>Gender</span>
                <span className="text-muted-foreground">{data.gender}</span>
              </div>
            )}
            {data.country && (
              <div className="flex justify-between">
                <span>Country</span>
                <span className="text-muted-foreground">{data.country}</span>
              </div>
            )}
            {data.state && (
              <div className="flex justify-between">
                <span>State</span>
                <span className="text-muted-foreground">{data.state}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Member Since</span>
              <span className="text-muted-foreground">{formatDate() || 'N/A'}</span>
            </div>
          </div>
          <div className="space-y-3 text-sm mt-6">
            <Button variant="outline" className="w-full flex justify-between items-center">
              <span>View Documents</span>
              <span>+</span>
            </Button>
            <Button variant="outline" className="w-full flex justify-between items-center">
              <span>Manage Role</span>
              <span>+</span>
            </Button>
          </div>
        </Card>

        {/* Right content */}
        <Card className="p-4">
          <div className="flex items-center gap-6 border-b pb-3 mb-4">
            <button className="relative text-sm font-medium after:absolute after:-bottom-[10px] after:left-0 after:h-[2px] after:w-12 after:bg-[#3C1642]">Profile Setting</button>
            <button className="text-sm text-muted-foreground">Role & Permission</button>
            <button className="text-sm text-muted-foreground">Other Information</button>
            <button className="text-sm text-muted-foreground">Loan Records</button>
            <button className="text-sm text-muted-foreground">Transaction Records</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">First Name</p>
              <Input value={data.firstName || ""} readOnly className="bg-muted/30" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Last Name</p>
              <Input value={data.lastName || ""} readOnly className="bg-muted/30" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Email Address</p>
              <Input value={data.email || ""} readOnly className="bg-muted/30" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Phone Number</p>
              <Input value={data.phone || "Not provided"} readOnly className="bg-muted/30" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Role</p>
              <Input value={data.role || "Member"} readOnly className="bg-muted/30" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Occupation</p>
              <Input value={data.occupation || "Not specified"} readOnly className="bg-muted/30" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Gender</p>
              <Input value={data.gender ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1) : "Not specified"} readOnly className="bg-muted/30" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Country</p>
              <Input value={data.country || "Not specified"} readOnly className="bg-muted/30" />
            </div>
            <div className="md:col-span-2">
              <p className="text-xs font-medium text-muted-foreground mb-1">State/Province</p>
              <Input value={data.state || "Not specified"} readOnly className="bg-muted/30" />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button variant="outline" onClick={() => navigate('/members')}>
              Back to Members
            </Button>
            <Button 
              className="bg-[#1DD3B0] hover:bg-[#12b89a] text-white"
              onClick={() => setIsEditDialogOpen(true)}
            >
              Edit Profile
            </Button>
          </div>
        </Card>
      </div>
      
      {/* Edit Profile Dialog */}
      <MemberFormDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        memberData={data}
        isEdit={true}
        onSubmit={handleEditSubmit}
      />
    </div>
  );
}


