"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRound, MapPin, LockKeyhole, LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";

const links = [
  {
    title: "accountDetails",
    href: "/account/details",
    icon: UserRound,
  },
  {
    title: "myAddresses",
    href: "/account/addresses",
    icon: MapPin,
  },
  {
    title: "changePassword",
    href: "/account/change-password",
    icon: LockKeyhole,
  },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  const { t } = useTranslation();
  return (
    <Sidebar collapsible="none" className="border-r bg-background">
      <SidebarHeader className="px-5 pt-8 pb-5 gap-0">
        <h2 className="text-lg font-bold text-[#333]"> {t("accountSidebar.title")}</h2>
        <p className="text-sm text-[#666]">{t("accountSidebar.description")}</p>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {links.map(({ title, href, icon: Icon }) => {
              const active = pathname === href;

              return (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    asChild
                    isActive={active}
                    className="h-11 rounded-lg px-3  data-[active=true]:text-[#ff4b12] data-[active=true]:font-semibold"
                  >
                    <Link href={href}>
                      <Icon className="size-5" />
                      <span>{t(`accountSidebar.${title}`)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="text-red-500 hover:bg-red-50 hover:text-red-600"
              onClick={() => {
                // هنربط تسجيل الخروج بعدين
              }}
            >
              <LogOut className="size-5" />
              <span>Log Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
