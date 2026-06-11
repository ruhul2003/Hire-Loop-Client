

import { LayoutSideContentLeft, Bell, Briefcase, Envelope, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export function DashboardSideBar() {
    const navItems = [
        { icon: House, href:"/dashboard/recruiter", label: "Home" },
        { icon: Magnifier, href:"/dashboard/recruiter/jobs", label: "Jobs" },
        { icon: Bell, href:"/dashboard/recruiter/jobs/new", label: "Create a Job" },
        { icon: Briefcase, href:"/dashboard/recruiter/company", label: "Company Profile" },
        // { icon: Envelope, label: "Messages" },
        // { icon: Person, label: "Profile" },
        // { icon: Gear, label: "Settings" },
    ];

    const navContent = <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
            <Link
                key={item.label}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                href={item.href}

            >
                <item.icon className="size-5 text-muted" />
                {item.label}
            </Link>
        ))}
    </nav>

    return (
        <>

        <aside className="hidden shrink-0 lg:block w-64 p-4 border-r">
            {navContent}
        </aside>
            <Drawer>
                <Button className="lg:hidden" variant="secondary">
                    <LayoutSideContentLeft />
                    Sidebar
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>

        </>
    );
}