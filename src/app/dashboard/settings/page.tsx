import { Heading } from "@/components/ui/heading"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Icons } from "@/components/icons"

export const metadata = {
    title: 'Settings | Remirage Shop Dashboard',
    description: 'Manage your Remirage Shop settings.',
}

export default function SettingsPage() {
    return (
        <div className="container mx-auto py-10">
            <Heading title="Settings" description="Manage your account settings" />
            <div className="space-y-6">
                <Link href="/dashboard/settings/security" legacyBehavior>
                    <Card className="flex items-center p-4 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100">
                        <Icons.shieldCheck className="h-6 w-6 text-gray-500 mr-4" />
                        <span>Security Settings</span>
                    </Card>
                </Link>
                <Link href="/dashboard/settings/providers" legacyBehavior>
                    <Card className="flex items-center p-4 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100">
                        <Icons.key className="h-6 w-6 text-gray-500 mr-4" />
                        <span>Providers Settings</span>
                    </Card>
                </Link>
                <Link href="/dashboard/settings/domain" legacyBehavior>
                    <Card className="flex items-center p-4 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100">
                        <Icons.globe className="h-6 w-6 text-gray-500 mr-4" />
                        <span>Domain Settings</span>
                    </Card>
                </Link>
            </div>
        </div>
    )
}

