import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function MemberProfile() {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const data = location.state || {};
  const initials = (data.firstName?.[0] || "?") + (data.lastName?.[0] || "");
  const membershipId = data.membershipId || "BJ345635789";

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
          <div className="rounded-lg bg-rose-100 h-28 flex items-center justify-center mb-4">
            <span className="text-3xl font-semibold text-rose-700">{initials}</span>
          </div>
          <div className="text-sm mb-3">Status <span className="ml-2 px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">Active</span></div>
          <div className="text-sm mb-4">Membership ID No: <span className="font-medium ml-2">{membershipId}</span></div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Attachment</span>
              <span className="text-muted-foreground">+</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Assigned Role</span>
              <span className="text-muted-foreground">+</span>
            </div>
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
              <p className="text-[12px] mb-1">Full name</p>
              <Input value={`${data.firstName || ""} ${data.lastName || ""}`.trim()} readOnly className="bg-muted/30" />
            </div>
            <div>
              <p className="text-[12px] mb-1">Email</p>
              <Input value={data.email || ""} readOnly className="bg-muted/30" />
            </div>
            <div>
              <p className="text-[12px] mb-1">Username</p>
              <Input value={data.username || ""} readOnly className="bg-muted/30" />
            </div>
            <div>
              <p className="text-[12px] mb-1">Phone number</p>
              <Input value={data.phone || ""} readOnly className="bg-muted/30" />
            </div>
            <div>
              <p className="text-[12px] mb-1">Country</p>
              <Input value={data.country || "Nigeria"} readOnly className="bg-muted/30" />
            </div>
            <div>
              <p className="text-[12px] mb-1">State</p>
              <Input value={data.state || "Lagos State"} readOnly className="bg-muted/30" />
            </div>
            <div className="md:col-span-2">
              <p className="text-[12px] mb-1">Comment</p>
              <Textarea readOnly className="bg-muted/30" placeholder="Write your comment here" defaultValue={data.comment || ""} />
            </div>
          </div>

          <div className="mt-6">
            <Button className="w-48 bg-[#1DD3B0] hover:bg-[#12b89a] text-white" onClick={() => navigate('/members')}>Add Member</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}


