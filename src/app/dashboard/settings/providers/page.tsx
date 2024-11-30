"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProviderCard } from "@/components/provider-card"
import { Textarea } from "@/components/ui/textarea"

interface Provider {
    id: string;
    name: string;
    authType: 'api' | 'credentials';
    description: string;
}

interface ProviderConfig {
    apiKey?: string;
    username?: string;
    password?: string;
}

const availableProviders: Provider[] = [
    {
        id: "1",
        name: "Deliworld",
        authType: "credentials",
        description: "Deliworld integration for order management"
    },
    {
        id: "2",
        name: "Shopify",
        authType: "api",
        description: "Shopify integration for e-commerce"
    }
]

const initialProviders: (Provider & ProviderConfig)[] = [
    {
        ...availableProviders[0],
        username: "deliworld_user",
        password: "********"
    }
]

export default function ProvidersSettingsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [providers, setProviders] = useState<(Provider & ProviderConfig)[]>(initialProviders)
    const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
    const [newProviderConfig, setNewProviderConfig] = useState<ProviderConfig>({})

    const handleAddProvider = () => {
        setSelectedProvider(null)
        setNewProviderConfig({})
        setIsModalOpen(true)
    }

    const handleEditProvider = (provider: Provider & ProviderConfig) => {
        setSelectedProvider(provider)
        setNewProviderConfig({
            apiKey: provider.apiKey,
            username: provider.username,
            password: provider.password
        })
        setIsModalOpen(true)
    }

    const handleSaveProvider = () => {
        if (selectedProvider) {
            setProviders(providers.map(p =>
                p.id === selectedProvider.id ? { ...p, ...newProviderConfig } : p
            ))
        } else {
            setProviders([...providers, { ...selectedProvider!, ...newProviderConfig }])
        }
        setIsModalOpen(false)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto py-10"
        >
            <Heading title="Providers Settings" description="Manage your provider integrations" />
            <div className="space-y-6 mt-6">
                <AnimatePresence>
                    {providers.map((provider) => (
                        <ProviderCard
                            key={provider.id}
                            provider={provider}
                            onEdit={handleEditProvider}
                        />
                    ))}
                </AnimatePresence>
                <Button onClick={handleAddProvider}>Add New Provider</Button>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{selectedProvider ? "Edit Provider" : "Add New Provider"}</DialogTitle>
                        <DialogDescription>
                            {selectedProvider ? "Edit the provider details below." : "Select a provider and enter the required details."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {!selectedProvider && (
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="provider" className="text-right">
                                    Provider
                                </Label>
                                <Select onValueChange={(value) => setSelectedProvider(availableProviders.find(p => p.id === value) || null)}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select a provider" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableProviders.map((provider) => (
                                            <SelectItem key={provider.id} value={provider.id}>
                                                {provider.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                        {selectedProvider && (
                            <>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        value={selectedProvider.name}
                                        className="col-span-3"
                                        disabled
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="description" className="text-right">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={selectedProvider.description}
                                        className="col-span-3"
                                        disabled
                                    />
                                </div>
                                {selectedProvider.authType === 'api' ? (
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="apiKey" className="text-right">
                                            API Key
                                        </Label>
                                        <Input
                                            id="apiKey"
                                            type="password"
                                            value={newProviderConfig.apiKey || ''}
                                            onChange={(e) => setNewProviderConfig({ ...newProviderConfig, apiKey: e.target.value })}
                                            className="col-span-3"
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="username" className="text-right">
                                                Username
                                            </Label>
                                            <Input
                                                id="username"
                                                value={newProviderConfig.username || ''}
                                                onChange={(e) => setNewProviderConfig({ ...newProviderConfig, username: e.target.value })}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="password" className="text-right">
                                                Password
                                            </Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                value={newProviderConfig.password || ''}
                                                onChange={(e) => setNewProviderConfig({ ...newProviderConfig, password: e.target.value })}
                                                className="col-span-3"
                                            />
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setIsModalOpen(false)} variant="outline">Cancel</Button>
                        <Button onClick={handleSaveProvider} disabled={!selectedProvider}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </motion.div>
    )
}

