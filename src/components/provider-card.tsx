import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Provider {
    id: string;
    name: string;
    authType: 'api' | 'credentials';
    description: string;
    apiKey?: string;
    username?: string;
    password?: string;
}

interface ProviderCardProps {
    provider: Provider;
    onEdit: (provider: Provider) => void;
}

export function ProviderCard({ provider, onEdit }: ProviderCardProps) {
    const [isSecretVisible, setIsSecretVisible] = useState(false)

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <Card>
                <CardHeader>
                    <CardTitle>{provider.name}</CardTitle>
                    <CardDescription>{provider.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex  space-x-2">
                        <span className="font-medium">Authentication:</span>
                        {provider.authType === 'api' ? (
                            <span>
                                API Key: {isSecretVisible ? provider.apiKey : "••••••••••••"}
                                <button
                                    onClick={() => setIsSecretVisible(!isSecretVisible)}
                                    className="ml-2 text-gray-500 hover:text-gray-700"
                                >
                                    {isSecretVisible ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                                </button>
                            </span>
                        ) : (
                            <span>
                                Username: {provider.username?.substring(0, 3) + '•••••'}
                                <br />
                                Password:  ••••••••••••

                            </span>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => onEdit(provider)}>Edit</Button>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

