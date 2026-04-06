import { getComponent } from '@/lib/componentMap'

interface SitecoreField {
    value: string | number | boolean
}

interface SitecoreComponent {
    uid?: string
    componentName: string
    fields: Record<string, SitecoreField>
}

interface PlaceholderProps {
    components: SitecoreComponent[]
}

export default function Placeholder({ components }: PlaceholderProps) {
    return (
        <>
            {components.map((item, index) => {
                const Component = getComponent(item.componentName)
                
                if (!Component) {
                    console.warn(`Component not found: ${item.componentName}`)
                    return null
                }
                
                return (
                    <Component 
                        key={item.uid || index} 
                        fields={item.fields}
                    />
                )
            })}
        </>
    )
}
