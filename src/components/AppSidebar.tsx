'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import {
    CreditCardIcon,
    FolderOpenIcon,
    HistoryIcon,
    KeyIcon,
    LogOutIcon,
    StarIcon
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { authClient } from '@/lib/auth-client'

const menuItems = [
    {
        title: "Main",
        items: [
            {
                icon: FolderOpenIcon,
                title: "Workflows",
                url: "/workflows"
            },

            {
                icon: KeyIcon,
                title: "Credentials",
                url: "/credentials"
            },

            {
                icon: HistoryIcon,
                title: "Executions",
                url: "/executions"
            },



        ]
    }
]
const AppSidebar = () => {

    const router = useRouter();
    const pathname = usePathname();
    return (
        <Sidebar collapsible='icon'>
            <SidebarHeader>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        className='gap-x-4 h-10 px-4'
                        asChild

                    >
                        <Link href={"/workflows"} prefetch>
                            <Image src={'/logo/logo.svg'} width={30} height={30} alt='Nodebase' />
                            <span className='font-semibold text-sm'>Nodebase</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarHeader>
            <SidebarContent>
                {
                    menuItems.map((group) => (
                        <SidebarGroup key={group.title}>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {
                                        group.items.map((item) => (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton
                                                    tooltip={item.title}
                                                    isActive={
                                                        item.url == "/" ? pathname == "/" : pathname.startsWith(item.url)
                                                    }
                                                    asChild
                                                    className='gap-x-4 h-10 px-4'

                                                >
                                                    <Link href={item.url} prefetch><item.icon className='size-4' /><span>{item.title}</span></Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))
                                    }
                                </SidebarMenu>
                            </SidebarGroupContent>

                        </SidebarGroup>
                    ))
                }
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        tooltip={"Upgrade to Pro"}
                        className='gap-x-4 h-10 px-4'
                        onClick={() => { }}
                    >
                        <StarIcon className='size-4' />
                        <span>Upgrade to pro</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        tooltip={"Billing Portal"}
                        className='gap-x-4 h-10 px-4'
                        onClick={() => { }}
                    >
                        <CreditCardIcon className='size-4' />
                        <span>Billing Portal</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        tooltip={"Logout"}
                        className='gap-x-4 h-10 px-4'
                        onClick={() => authClient.signOut({
                            fetchOptions: {
                                onSuccess: () => {
                                    router.push('/login')
                                }
                            }
                        })}
                    >
                        <LogOutIcon className='size-4' />
                        <span>Sign Out</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar;