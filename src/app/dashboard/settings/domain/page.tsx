
import { Heading } from "@/components/ui/heading"

export const metadata = {
    title: 'Domain Settings | Remirage Shop Dashboard',
    description: 'Configure your domain settings.',
}

export default function DomainSettingsPage() {
    return (
        <div className="container mx-auto py-10">
            <Heading title="Domain Settings" description="Configure your own domain with DNS settings" />
            <form className="space-y-6">
                <div>
                    <label htmlFor="domain-name" className="block text-sm font-medium text-gray-700">
                        Domain Name
                    </label>
                    <input
                        type="text"
                        name="domain-name"
                        id="domain-name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="dns-settings" className="block text-sm font-medium text-gray-700">
                        DNS Settings
                    </label>
                    <textarea
                        name="dns-settings"
                        id="dns-settings"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Save Domain Settings
                    </button>
                </div>
            </form>
        </div>
    )
}