import { Avatar, AvatarFallback, AvatarImage } from "@travelese/ui/avatar";

interface Member {
  id: string;
  avatar_url?: string;
  full_name?: string;
}

interface BookingMembersProps {
  members: Member[];
}

export function BookingMembers({ members }: BookingMembersProps) {
  return (
    <div className="flex space-x-2">
      {members?.map((member) => (
        <div key={member.id} className="relative">
          <Avatar className="rounded-full w-5 h-5">
            <AvatarImage src={member?.avatar_url} />
            <AvatarFallback>
              <span className="text-xs">
                {member?.full_name?.charAt(0)?.toUpperCase()}
              </span>
            </AvatarFallback>
          </Avatar>
        </div>
      ))}
    </div>
  );
}
