export const Heading = ({ title, description, children }: { title: string, description: string, children?: React.ReactNode }) => {
    return (
        <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-lg text-gray-700 mb-4">{description}</p>
            <div className="flex items-center space-x-4">
                {children}
            </div>
        </div>
    )
}