import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CloudflareAccessUser } from "@/lib/cloudflare-access";
import { LogOut, User } from "lucide-react";

export function UserNav({
	user,
	logoutUrl,
}: {
	user: CloudflareAccessUser;
	logoutUrl: string;
}) {
	const initials = user.email
		.split("@")[0]
		.slice(0, 2)
		.toUpperCase();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-8 w-8">
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end">
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">{user.email}</p>
						<p className="text-xs leading-none text-muted-foreground">
							{user.userId}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<a href="/profile" className="flex items-center">
						<User className="mr-2 h-4 w-4" />
						Profile
					</a>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<a href={logoutUrl} className="flex items-center">
						<LogOut className="mr-2 h-4 w-4" />
						Log out
					</a>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
