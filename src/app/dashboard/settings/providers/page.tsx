"use client"
import { useState } from "react"
import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog"

const providers = [
    { name: "Provider 1", apiKey: "API_KEY_1" },
    { name: "Provider 2", apiKey: "API_KEY_2" },
]

export default function ProvidersSettingsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedProvider, setSelectedProvider] = useState("")
    const [apiKeyVisible, setApiKeyVisible] = useState(false)
    const [editProvider, setEditProvider] = useState(null)

    const handleAddProvider = () => {
        setSelectedProvider("")
        setEditProvider(null)
        setIsModalOpen(true)
    }

    const handleEditProvider = (provider: any) => {
        setSelectedProvider(provider.name)
        setEditProvider(provider)
        setIsModalOpen(true)
    }

    const handleSaveProvider = () => {
        // Save provider logic here
        setIsModalOpen(false)
    }

    return (
        <div className="container mx-auto py-10">
            <Heading title="Providers Settings" description="Add API keys for providers" />
            <div className="space-y-6">
                {providers.map((provider, index) => (
                    <div key={index} className="p-4 border border-gray-300 rounded-md shadow-sm flex justify-between items-center">
                        <div>
                            <span className="font-medium">{provider.name}</span>
                            <div className="flex items-center space-x-2">
                                <span>{apiKeyVisible ? provider.apiKey : "••••••••••••"}</span>
                                <button onClick={() => setApiKeyVisible(!apiKeyVisible)}>
                                </button>
                            </div>
                        </div>
                        <Button onClick={() => handleEditProvider(provider)}>Edit</Button>
                    </div>
                ))}
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={handleAddProvider}>Add New Provider</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editProvider ? "Edit Provider" : "Add New Provider"}</DialogTitle>
                            <DialogDescription>
                                <div className="mt-4">

                                    <Select onValueChange={setSelectedProvider}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a provider" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Provider 1">Provider 1</SelectItem>
                                            <SelectItem value="Provider 2">Provider 2</SelectItem>
                                        </SelectContent>
                                    </Select>


                                </div>
                                <div className="mt-4">
                                    <label htmlFor="api-key" className="block text-sm font-medium text-gray-700">
                                        API Key
                                    </label>
                                    <input
                                        type="text"
                                        name="api-key"
                                        id="api-key"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button onClick={handleSaveProvider}>Save</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}